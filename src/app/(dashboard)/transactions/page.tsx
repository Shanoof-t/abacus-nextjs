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

import CsvUploadButton from "./components/csv-upload-button";
import CsvUpload from "./components/csv-upload";

type CsvResult = {
  data: [];
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
  const [importData, setImportData] = useState([]);

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
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="lg:flex-row lg:justify-between lg:items-center">
            <CardTitle className="text-xl line-clamp-1">
              Transaction history
            </CardTitle>

            <div className="space-x-2">
              <CsvUploadButton onUpload={importCsv} />

              <Button
                variant="primary"
                size="sm"
                className="text-white border rounded-[.50rem]"
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
                const ids = rows.map((row) => row.original._id);
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
