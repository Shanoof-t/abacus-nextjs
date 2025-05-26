"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useConsentCreationStore } from "@/store/bank-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useCreateConsent } from "@/hooks/use-bank";
import { useRouter } from "next/navigation";

const consentCreationSchema = z.object({
  mobileNumber: z
    .string()
    .nonempty({ message: "Mobile number Required" })
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Mobile number must contain only digits",
    }),
});

type FormValues = z.infer<typeof consentCreationSchema>;

const ConsentCreationForm = () => {
  const { isOpen, onClose } = useConsentCreationStore();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(consentCreationSchema),
    defaultValues: {
      mobileNumber: "",
    },
  });

  const [enabled, setEnabled] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const { data, isSuccess, isLoading, error } = useCreateConsent({
    enabled,
    mobileNumber,
  });

  const handleSubmit = (values: FormValues) => {
    setMobileNumber(values.mobileNumber.toString());
    setEnabled(true);
  };

  useEffect(() => {
    if (isSuccess && data) {
      const { url } = data.data;
      onClose();
      router.replace(url);
    }
  }, [isSuccess, data, router, onClose]);

  useEffect(() => {
    if (error) {
      form.setError("mobileNumber", {
        type: "server",
        message: error.message || "Something wrong happened",
      });
      setEnabled(false);
    }
  }, [error]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Form {...form}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect with Bank Account</DialogTitle>
            <DialogDescription>
              To track your expenses effectively, we need your consent to fetch
              bank transactions. Transactions will be fetched automatically
              every day at 12 AM. Your data is secure and used only for expense
              tracking.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="mobileNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter mobile number"
                      className="items-center placeholder-shown:text-gray-500 rounded-[.50rem] w-full justify-start transition"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-5">
              {isLoading ? (
                <Button variant="primary">Loading...</Button>
              ) : (
                <Button variant="primary" type="submit">
                  Connect
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default ConsentCreationForm;
