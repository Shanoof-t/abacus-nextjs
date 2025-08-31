"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PieVariant from "./pie-variant";
import { useGetFinancialHistory } from "@/hooks/use-overview";

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

const EmptyState = () => {
  return (
    <div className="h-[350px] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 text-gray-300">
        <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
          <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
          <path d="M32 4 A28 28 0 0 1 32 32 Z" fillOpacity="0.2"/>
          <path d="M32 32 L60 32 A28 28 0 0 1 46 54 Z" fillOpacity="0.1"/>
          <path d="M32 32 L46 54 A28 28 0 0 1 18 54 Z" fillOpacity="0.15"/>
          <circle cx="32" cy="32" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
      
      <div className="text-center">
        <p className="text-gray-500 text-sm">No data for this period</p>
      </div>
    </div>
  );
};

const SpendingPie = () => {
  const { data, isLoading } = useGetFinancialHistory();

  return (
    <Card className="border-none drop-shadow-sm bg-white p-4 border rounded-[.50rem]">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSkeleton />
        ) : !data || data?.categories.length === 0 ? (
          <EmptyState />
        ) : (
          <PieVariant data={data?.categories} />
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingPie;
