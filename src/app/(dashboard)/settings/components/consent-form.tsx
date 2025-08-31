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
import { useState } from "react";
import { useRouter } from "next/navigation";
import API_ROUTES from "@/lib/routes";

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

  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = (values: FormValues) => {
    setIsDisabled(true);
    router.replace(
      process.env.NEXT_PUBLIC_BACKEND_URL! +
        API_ROUTES.BANK_ACCOUNT.CREATE_CONSENT +
        values.mobileNumber.toString().trim()
    );
  };

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
              <Button variant="primary" type="submit" disabled={isDisabled}>
                Connect
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default ConsentCreationForm;
