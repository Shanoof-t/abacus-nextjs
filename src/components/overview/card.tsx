"use client";
import { cva, VariantProps } from "class-variance-authority";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CountUp from "@/components/count-up";
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

const boxVarient = cva("rounded-[.30rem] p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
    },
    defaultVariants: {
      variant: "default",
    },
  },
});
const iconVarient = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500",
      success: "fill-emerald-500",
      danger: "fill-rose-500",
    },
    defaultVariants: {
      variant: "default",
    },
  },
});

type BoxVarient = VariantProps<typeof boxVarient>;
type IconVarient = VariantProps<typeof iconVarient>;

interface OverViewCard extends BoxVarient, IconVarient {
  title: string;
  dateRange: string;
  icon: IconType;
  percentage?: number;
  value?: number;
}

const OverViewCard = ({
  title,
  dateRange,
  icon: Icon,
  percentage,
  variant,
  value = 0,
}: OverViewCard) => {
  return (
    <Card className="border-none drop-shadow-sm bg-white p-4 border rounded-[.50rem]">
      <CardHeader className="flex-row justify-between items-center">
        <div className="space-y-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-black/50 ">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn(boxVarient({ variant }))}>
          <Icon className={cn(iconVarient({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl mb-2 font-bold">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            prefix="$"
          />
        </h1>
        <p
          className={
            percentage && percentage > 0
              ? "text-emerald-500  text-sm"
              : "text-rose-500  text-sm"
          }
        >
          {percentage}% from last period
        </p>
      </CardContent>
    </Card>
  );
};

export default OverViewCard;
