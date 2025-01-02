"use client";
import React from "react";
import Navbar from "./nav-bar";
import WelcomeMsg from "./welcome-msg";

const TopSection = () => {
  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-12 pb-36">
      <Navbar />
      <WelcomeMsg />
    </div>
  );
};

export default TopSection;
