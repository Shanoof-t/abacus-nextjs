"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/ui/data-table";
import { useNewTransactionStore } from "@/store/transaction-store";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { column } from "./components/column";
import {
  useBulkTransactionDelete,
  useGetAllTransaction,
} from "@/hooks/use-transaction";
import { Skeleton } from "@/components/ui/skeleton";
// import CsvUploadButton from "./components/csv-upload-button";
import CsvUpload from "./components/csv-upload";
import { jsonToCSV } from "react-papaparse";
import useConfirm from "@/hooks/use-confirm";
import { toast } from "@/hooks/use-toast";

type CsvResult = {
  data: string[][];
  error: [];
  meta: [];
};

enum Variants {
  IMPORT = "IMPORT",
  DEFAULT = "DEFAULT",
}

const Page = () => {
  const { onOpen } = useNewTransactionStore();
  const { data, isLoading, isSuccess } = useGetAllTransaction();
  const { mutate } = useBulkTransactionDelete();

  const [variant, setVariant] = useState(Variants.DEFAULT);
  const [importData, setImportData] = useState<string[][]>([]);

  const importCsv = (result: CsvResult) => {
    setVariant(Variants.IMPORT);
    const filterdNonEmpty = result.data.filter((imports) => imports.length > 1);
    setImportData(filterdNonEmpty);
  };

  const onCancel = () => {
    setVariant(Variants.DEFAULT);
  };

  const onBack = () => {
    setVariant(Variants.DEFAULT);
  };

  const { ConfirmDialog, confirm } = useConfirm({
    title: "Export Transactions",
    description: "Are you sure to export transactions?",
  });

  const onExport = async () => {
    if (data) {
      try {
        await confirm();
        const filterDataForCSV = data.data.map((transaction) => {
          return {
            account_name: transaction.account_name,
            category_name: transaction.category_name,
            transaction_date: transaction.transaction_date,
            transaction_payee: transaction.transaction_payee,
            transaction_amount: transaction.transaction_amount,
            transaction_note: transaction.transaction_note,
          };
        });
        const jsonData = JSON.stringify(filterDataForCSV);
        const result = jsonToCSV(JSON.parse(jsonData));
        const url = URL.createObjectURL(new Blob([result]));
        const link = document.createElement("a");
        link.href = url;
        const fileName = `transactions_${Date.now()}.csv`;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast({ description: "Transactions downloaded successfully." });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) {
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

  if (!isSuccess) {
    return (
      <div className="-mt-28 bg-white container overflow-y-auto border rounded-[.50rem]">
        <Card className="border-none drop-shadow-sm">
          <CardContent className="flex justify-center items-center h-[500px]">
            <CardTitle className="text-xl line-clamp-1">
              Something Wrongs Happened!
            </CardTitle>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === Variants.IMPORT)
    return (
      <CsvUpload onCancel={onCancel} importData={importData} onBack={onBack} />
    );

  if (variant === Variants.DEFAULT)
    return (
      <div className="-mt-28 bg-white container overflow-y-auto border rounded-[.50rem]">
        <ConfirmDialog />
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="lg:flex-row lg:justify-between lg:items-center">
            <CardTitle className="text-xl line-clamp-1">
              Transaction history
            </CardTitle>

            <div className="lg:space-x-2 lg:space-y-0 space-y-1">
              {/* <Button
                variant="primary"
                size="sm"
                className="text-white border rounded-[.50rem] w-full lg:w-auto"
                onClick={() => onExport()}
              >
                <Download /> Export
              </Button>
              <CsvUploadButton onUpload={importCsv} /> */}

              <Button
                variant="primary"
                size="sm"
                className="text-white border rounded-[.50rem] w-full lg:w-auto"
                onClick={() => onOpen()}
              >
                <Plus /> Add new
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={column}
              data={data.data}
              filterKey="transaction_payee"
              filterPlaceholder="Search payee"
              onDelete={(rows) => {
                const ids = rows.map((row) => row.original.id);
                mutate(ids);
              }}
              disabled={false}
            />
          </CardContent>
        </Card>
      </div>
    );
};

export default Page;
