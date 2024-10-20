import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomHexColors(numColors: number): string[] {
  const colors: string[] = [];

  for (let i = 0; i < numColors; i++) {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const color = `#${red}${green}${blue}`;
    colors.push(color);
  }

  return colors;
}
