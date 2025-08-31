"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AreaVariant from "./area-variant";
import { useGetFinancialHistory } from "@/hooks/use-overview";

// Minimal Loading Component
const LoadingSkeleton = () => {
  return (
    <div className="h-[350px] flex items-center justify-center">
      <div className="flex items-center space-x-3 text-gray-400">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    </div>
  );
};

// Minimal Empty State Component
const EmptyState = () => {
  return (
    <div className="h-[350px] flex flex-col items-center justify-center space-y-4">
      {/* Simple chart icon */}
      <div className="w-16 h-16 text-gray-300">
        <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
          <path d="M8 48 L8 56 L56 56 L56 8 L48 8 L48 16 L40 16 L40 24 L32 24 L32 32 L24 32 L24 40 L16 40 L16 48 L8 48 Z" fillOpacity="0.2"/>
          <path d="M8 56 L56 56 M56 8 L56 56" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="16" cy="48" r="2" />
          <circle cx="24" cy="40" r="2" />
          <circle cx="32" cy="32" r="2" />
          <circle cx="40" cy="24" r="2" />
          <circle cx="48" cy="16" r="2" />
        </svg>
      </div>
      
      <div className="text-center">
        <p className="text-gray-500 text-sm">No data for this period</p>
      </div>
    </div>
  );
};

const TransactionGraph = () => {
  const { data, isLoading } = useGetFinancialHistory();

  return (
    <Card className="border-none drop-shadow-sm bg-white p-4 border rounded-[.50rem]">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSkeleton />
        ) : !data || data?.transaction.length === 0 ? (
          <EmptyState />
        ) : (
          <AreaVariant data={data?.transaction} />
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionGraph;