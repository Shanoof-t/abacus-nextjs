"use client"
import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MaintenancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className=" text-center">
        <MaintenanceIllustration />
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
          Website Under Maintenance
        </h1>
        <p className="text-xl text-gray-700 mb-3">We&apos;re working on something awesome!</p>
        <p className="text-xl text-gray-700 mb-8">
          We&apos;ll be back on <strong>May 1st, 2025</strong>.
        </p>
        <Countdown targetDate="2025-05-01T00:00:00" />
      </div>
    </div>
  );
};

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.days ===.0 && timeLeft.hours === 0 && 
      timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return <p className="text-xl text-green-600 font-medium">We&apos;re back online!</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <CountdownItem value={timeLeft.days} label="Days" />
      <CountdownItem value={timeLeft.hours} label="Hours" />
      <CountdownItem value={timeLeft.minutes} label="Minutes" />
      <CountdownItem value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

const CountdownItem = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-blue-600 text-white rounded-lg px-4 py-2 w-24 text-center">
      <span className="text-3xl font-bold">{value}</span>
    </div>
    <span className="text-sm mt-1 text-gray-600">{label}</span>
  </div>
);

const MaintenanceIllustration = () => (
  <div className="mb-8 max-w-md mx-auto">
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
      <g>
        {/* Background elements */}
        <circle cx="400" cy="225" r="160" fill="#f3f4f6" />
        
        {/* Server/Computer */}
        <rect x="320" y="190" width="160" height="180" rx="10" fill="#3b82f6" />
        <rect x="340" y="210" width="120" height="140" rx="5" fill="#1e40af" />
        
        {/* Server lights and details */}
        <circle cx="360" cy="230" r="6" fill="#10b981" />
        <circle cx="390" cy="230" r="6" fill="#f59e0b" />
        <circle cx="420" cy="230" r="6" fill="#ef4444" />
        
        {/* Server rack lines */}
        <rect x="350" y="250" width="100" height="10" rx="2" fill="#60a5fa" />
        <rect x="350" y="270" width="100" height="10" rx="2" fill="#60a5fa" />
        <rect x="350" y="290" width="100" height="10" rx="2" fill="#60a5fa" />
        <rect x="350" y="310" width="100" height="10" rx="2" fill="#60a5fa" />
        
        {/* Gear elements */}
        <circle cx="500" cy="150" r="50" fill="#d1d5db" stroke="#6b7280" strokeWidth="8" />
        <circle cx="500" cy="150" r="20" fill="#9ca3af" />
        
        {/* Gear teeth */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <rect 
            key={i}
            x="495" 
            y="90" 
            width="10" 
            height="20" 
            fill="#6b7280"
            transform={`rotate(${angle}, 500, 150)`}
          />
        ))}
        
        {/* Tools */}
        <path d="M280,280 L320,320 L340,300 L300,260 Z" fill="#9ca3af" stroke="#6b7280" strokeWidth="4" />
        <rect x="240" y="180" width="80" height="20" rx="5" fill="#9ca3af" transform="rotate(-30, 280, 190)" />
        
        {/* Progress bar */}
        <rect x="250" y="380" width="300" height="20" rx="10" fill="#e5e7eb" />
        <rect x="250" y="380" width="150" height="20" rx="10" fill="#3b82f6" />
      </g>
    </svg>
  </div>
);

export default MaintenancePage;