import Graphs from "@/components/graphs/main";
import CardGrid from "@/components/overview/overview-card-grid";
import React from "react";

const Page = () => {
  return (
    <div className="-mt-28 border-none container overflow-y-auto ">
      <CardGrid />
      <Graphs />
    </div>
  );
};

export default Page;
