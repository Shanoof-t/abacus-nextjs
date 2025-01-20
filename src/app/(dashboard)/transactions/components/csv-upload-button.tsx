import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import React from "react";
import { useCSVReader } from "react-papaparse";
type CsvResult = {
  data: [];
  error: [];
  meta: [];
};
const CsvUploadButton = ({
  onUpload,
}: {
  onUpload: (result: CsvResult) => void;
}) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        onUpload(results);
      }}
    >
      {({ getRootProps }: any) => (
        <>
          <Button
            variant="primary"
            size="sm"
            type="button"
            className="text-white border rounded-[.50rem] w-full lg:w-auto"
            {...getRootProps()}
          >
            <Upload /> Import
          </Button>
        </>
      )}
    </CSVReader>
  );
};

export default CsvUploadButton;
