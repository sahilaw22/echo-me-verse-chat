import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Responsive breakpoints matching Tailwind's default breakpoints
export const breakpoints = {
  sm: '640px',   // Small devices (phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (laptops)
  xl: '1280px',  // Extra large devices (desktops)
  '2xl': '1536px' // 2X large devices
}

// Common spacing values
export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '2.5rem' // 40px
}

// Font sizes
export const fontSize = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem' // 30px
}

// Container max widths
export const containers = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Responsive container class that can be used across the app
export const containerClass = "w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"

// Common layout classes
export const layoutClasses = {
  pageWrapper: "min-h-screen w-full bg-background",
  mainContent: "flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6",
  section: "mb-8",
  card: "rounded-lg border bg-card text-card-foreground shadow-sm",
  grid: "grid gap-4 md:gap-6 lg:gap-8",
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  gridCols: {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  }
}
