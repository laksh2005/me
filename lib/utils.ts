import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Standard shadcn-style class merger. Vendored Skiper components expect this. */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
