"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { useTransactionRescheduleStore } from "@/store/notification-store";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRescheduleRecurringTransaction } from "@/hooks/use-notification";


export const rescheduleTransactionSchema = z.object({
  date: z.date({ message: "Pick a reschedule date" }),
});

const RescheduleTransaction = () => {
  const { isOpen, onClose, notification_id } = useTransactionRescheduleStore();

  const form = useForm<z.infer<typeof rescheduleTransactionSchema>>({
    resolver: zodResolver(rescheduleTransactionSchema),
    defaultValues: {
      date: undefined,
    },
  });

  const date = form.watch("date");

  const { mutate } = useRescheduleRecurringTransaction();

  const onSubmit = (data: z.infer<typeof rescheduleTransactionSchema>) => {
    mutate({ data, id: notification_id });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Reschedule Recurring Transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="py-4 flex justify-center items-center">
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pick a rescheduled date for the transaction
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="border-gray-200 rounded-[.50rem] hover:bg-gray-100 w-full justify-start transition"
                          >
                            <CalendarIcon className="mr-2" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-white items-center flex justify-center">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant="primary"
                className="border rounded-[0.50rem]"
              >
                {date ? (
                  <span>Reschedule to {format(date, "PPP")}</span>
                ) : (
                  <span>Reschedule</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleTransaction;
