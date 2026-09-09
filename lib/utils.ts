import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDistanceToNow(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}

export function truncateText(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

export const CATEGORIES = [
  { value: "infrastructure", label: "Infrastructure" },
  { value: "environment", label: "Environment" },
  { value: "public_safety", label: "Public Safety" },
  { value: "education", label: "Education" },
  { value: "housing", label: "Housing" },
  { value: "transportation", label: "Transportation" },
  { value: "civic_rights", label: "Civic Rights" },
  { value: "other", label: "Other" },
];

export const EVENT_TYPES = [
  { value: "protest", label: "Protest" },
  { value: "meeting", label: "Meeting" },
  { value: "town_hall", label: "Town Hall" },
  { value: "community_gathering", label: "Community Gathering" },
  { value: "workshop", label: "Workshop" },
];
