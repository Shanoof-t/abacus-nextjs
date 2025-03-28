"use client";
import ConsentCreationForm from "@/app/(dashboard)/settings/components/consent-form";
import RescheduleTransaction from "@/components/notification/reschedule-transaction";

const DialogProvider = () => {
  return (
    <>
      <RescheduleTransaction />
      <ConsentCreationForm />
    </>
  );
};

export default DialogProvider;
