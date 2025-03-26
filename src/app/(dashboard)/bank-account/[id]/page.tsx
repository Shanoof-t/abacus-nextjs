"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useGetConsent } from "@/hooks/use-bank";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState("");
  console.log("id", id);
  useEffect(() => {
    const fetchId = async () => {
      const id = (await params).id;
      // console.log("id fetched", id);
      setId(id);
    };
    fetchId();
  });
  return (
    <div className="-mt-28 bg-white container overflow-y-auto border-none rounded-[.50rem]">
      <Card className="border-none">
        <CardHeader className="lg:flex-row lg:justify-between lg:items-center ">
          <CardTitle className="text-xl line-clamp-1">Bank Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h1>You are autherized with bank account</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
