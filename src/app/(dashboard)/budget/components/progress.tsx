function SemiCircleProgress({
  progress = 0,
}: {
  progress?: number;
  total_spent?: number;
}) {
  const radius = 100; // Radius of the semi-circle
  const strokeWidth = 20; // Thickness of the stroke
  const circumference = Math.PI * radius; // Half the circumference of the circle
  const offset = (1 - progress / 100) * circumference; // Inverse for growing order
  const size = radius * 2 + strokeWidth * 2; // Size of the SVG (width and height)

  return (
    <div className="flex justify-center items-center w-full h-auto relative">
      <svg
        width={size}
        height={radius + strokeWidth} // Semi-circle height
        className="relative"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1d4ed8" /> {/* blue-700 */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
          </linearGradient>
        </defs>
        {/* Background Semi-Circle */}
        <path
          d={`
            M ${strokeWidth} ${radius + strokeWidth} 
            A ${radius} ${radius} 0 0 1 ${size - strokeWidth} ${
            radius + strokeWidth
          }
          `}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
        />
        {/* Progress Semi-Circle */}
        <path
          d={`
            M ${strokeWidth} ${radius + strokeWidth} 
            A ${radius} ${radius} 0 0 1 ${size - strokeWidth} ${
            radius + strokeWidth
          }
          `}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth + strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="square"
          className="transition-all duration-500 "
        />
      </svg>
      {/* Progress Percentage Text */}
      <div
        className="absolute flex flex-col justify-center items-center"
        style={{
          top: `calc(60% + ${strokeWidth}px)`,
          transform: "translateY(-50%)",
        }}
      >
        <h1 className="font-bold text-3xl">{progress}%</h1>
        <p className="text-xs font-bold text-muted-foreground mt-1">Progress</p>
      </div>
    </div>
  );
}

export default SemiCircleProgress;
