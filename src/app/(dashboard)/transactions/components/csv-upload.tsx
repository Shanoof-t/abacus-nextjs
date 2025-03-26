"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useCreateBulkTransaction } from "@/hooks/use-transaction";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

type Props = {
  onCancel: () => void;
  importData: string[][];
  onBack: () => void;
};

export type Transaction = {
  account_name?: string;
  category_name?: string;
  transaction_date?: string;
  transaction_payee?: string;
  transaction_amount?: string;
  transaction_note?: string;
};

const CsvUpload = ({ onCancel, importData, onBack }: Props) => {
  const header: string[] = importData[0];
  const body: string[][] = importData.slice(1);
  const adjustedHeader = header.map((head) => {
    switch (head) {
      case "Account":
        return "account_name";
      case "Category":
        return "category_name";
      case "Date":
        return "transaction_date";
      case "Payee":
        return "transaction_payee";
      case "Amount":
        return "transaction_amount";
      case "Note":
        return "transaction_note";
      default:
        return null;
    }
  });

  const { mutate, isPending, isSuccess } = useCreateBulkTransaction();
  const onUpload = () => {
    const uploadData = body.map((transactionSet) => {
      return transactionSet.reduce(
        (acc: Transaction, transactionDetail, index) => {
          const header = adjustedHeader[index];
          if (header !== null) {
            acc[header] = transactionDetail;
          }
          return acc;
        },
        {}
      );
    });
    mutate(uploadData);
  };

  useEffect(() => {
    if (isSuccess) {
      onBack();
    }
  }, [isSuccess, onBack]);
  if (isPending) {
    return (
      <div className="-mt-28 bg-white container overflow-y-auto border rounded-[.50rem]">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="lg:flex-row lg:justify-between lg:items-center">
            <Skeleton className="h-8 w-48 bg-gray-200 border rounded" />{" "}
            <Skeleton className="h-8 w-40 bg-gray-200 border rounded" />
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[500px]">
            <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="-mt-28 bg-white container overflow-y-auto border rounded-[.50rem]">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:flex-row lg:justify-between lg:items-center">
          <CardTitle className="text-xl line-clamp-1">
            Import Transactions
          </CardTitle>
          <div className="space-x-2">
            <Button
              variant="primary"
              size="sm"
              className="text-white border rounded-[.50rem]"
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="text-white border rounded-[.50rem]"
              onClick={onUpload}
            >
              Continue
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {header.map((head, inx) => (
                  <TableHead key={inx}>{head}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {body.map((row, rowInd) => (
                <TableRow key={rowInd}>
                  {row.map((cell, cellInd) => (
                    <TableCell key={cellInd}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CsvUpload;
