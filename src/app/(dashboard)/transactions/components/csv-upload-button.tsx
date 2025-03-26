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
      onUploadAccepted={(results: CsvResult) => {
        onUpload(results);
      }}
    >
      {() => (
        <>
          <Button
            variant="primary"
            size="sm"
            type="button"
            className="text-white border rounded-[.50rem] w-full lg:w-auto"
          >
            <Upload /> Import
          </Button>
        </>
      )}
    </CSVReader>
  );
};

export default CsvUploadButton;
