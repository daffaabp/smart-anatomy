"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface CircularProgressProps extends React.SVGProps<SVGSVGElement> {
  value: number;
  strokeWidth?: number;
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({ className, value, strokeWidth = 8, ...props }, ref) => {
    const radius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <svg
        ref={ref}
        className={cn("w-32 h-32 transform -rotate-90", className)}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle
          className="text-muted"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          cx="50"
          cy="50"
          r={radius}
        />
        <circle
          className="text-primary transition-all duration-500"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
    )
  }
)
CircularProgress.displayName = "CircularProgress"

export { CircularProgress }
