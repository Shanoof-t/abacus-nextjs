"use client";
import useBudgetAlert from "@/hooks/use-alert";

const AlertProvider = () => {
  const {BudgetAlert} = useBudgetAlert();
  return (
    <>
      {/* <BudgetAlertDialog /> */}
      <BudgetAlert />
    </>
  );
};

export default AlertProvider;
