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
import { ChevronDown, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";

const Filters = () => {
  const { data, isSuccess, isLoading } = useGetAllAccount(true);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const to = date?.to || new Date();
  const from = date?.from || subMonths(to, 1);
  const [account, setAccount] = useState("all");

  const endDate = format(to, "PP");
  const startDate = format(from, "MMM d");

  useEffect(() => {
    setIsInitialized(true);
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

  const showLoading = isLoading;

  return (
    <div className="lg:space-x-2 lg:flex space-y-2 lg:space-y-0">
      <Select
        defaultValue={account}
        onValueChange={setAccount}
        disabled={showLoading}
      >
        <SelectTrigger className="w-full h-auto space-x-2 lg:w-auto border-none font-normal bg-white/10 hover:bg-white/20 transition text-white border focus:ring-0 focus:ring-offset-0 rounded hover:text-white disabled:opacity-50">
          {showLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <SelectValue placeholder="All Accounts" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {showLoading ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm">Loading accounts...</span>
              </div>
            ) : (
              <>
                {isSuccess && data?.data.length === 0 && (
                  <SelectLabel className="items-center">
                    No Accounts
                  </SelectLabel>
                )}
                <SelectItem value="all">All Accounts</SelectItem>
                {isSuccess &&
                  data?.data.map((account) => (
                    <SelectItem value={account.account_name} key={account.id}>
                      {account.account_name}
                    </SelectItem>
                  ))}
              </>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            disabled={showLoading}
            className="flex justify-between w-full lg:w-auto border-none font-normal bg-white/10 hover:bg-white/20 transition text-white focus:bg-white/30 border rounded hover:text-white disabled:opacity-50"
          >
            {showLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                {startDate + " - " + endDate}
                <ChevronDown className="text-white/30" />
              </>
            )}
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
