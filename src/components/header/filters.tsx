import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetAllAccount } from "@/hooks/use-account";
import { format, subMonths } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
// import { useFinancialSummary } from "@/hooks/use-overview";

const Filters = () => {
  const { data, isSuccess } = useGetAllAccount(true);
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const router = useRouter();
  const pathName = usePathname();

  const to = date?.to || new Date();
  const from = date?.from || subMonths(to, 1);
  const [account, setAccount] = useState("all");

  const endDate = format(to, "PP");
  const startDate = format(from, "MMM d");

  useEffect(() => {
    if (date?.to && date?.from && account === "all") {
      const queryUrl = `?from=${date?.from.toISOString()}&to=${date?.to.toISOString()}`;
      router.push(queryUrl);
    } else if (date?.to && date?.from && account) {
      const queryUrl = `?from=${date?.from.toISOString()}&to=${date?.to.toISOString()}&account=${account}`;
      router.push(queryUrl);
    } else if (account && !(date?.to && date?.from)) {
      if (account !== "all") {
        const queryUrl = `?account=${account}`;
        router.push(queryUrl);
      } else {
        router.push(pathName);
      }
    } else {
      router.push(pathName);
    }
  }, [date, account, router, pathName]);

  return (
    <div className="lg:space-x-2 lg:flex space-y-2 lg:space-y-0">
      <Select defaultValue={account} onValueChange={setAccount}>
        <SelectTrigger className="w-full h-auto space-x-2 lg:w-auto border-none font-normal bg-white/10 hover:bg-white/20 transition text-white  border focus:ring-0 focus:ring-offset-0 rounded hover:text-white">
          <SelectValue placeholder="All Accounts " />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {isSuccess && data?.data.length === 0 && (
              <SelectLabel className="items-center">No Accounts</SelectLabel>
            )}
            <SelectItem value="all">All Accounts</SelectItem>
            {isSuccess &&
              data?.data.map((account) => (
                <SelectItem value={account.account_name} key={account.id}>
                  {account.account_name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className={
              "flex justify-between w-full lg:w-auto border-none font-normal bg-white/10 hover:bg-white/20 transition text-white focus:bg-white/30 border rounded hover:text-white"
            }
          >
            {startDate + " - " + endDate}{" "}
            <ChevronDown className="text-white/30" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-white items-center flex justify-center z-50 ">
          <div className="grid">
            <div className="space-y-2 px-2">
              <h4 className="font-medium leading-none">Date Period</h4>
              <p className="text-sm text-muted-foreground">
                Set the date range for the period.
              </p>
            </div>
            <div className="">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Filters;
