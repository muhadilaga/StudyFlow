export function formatDateLabel(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function isSameDay(dateValue: string, targetDate = new Date()) {
  const date = new Date(dateValue);
  return (
    date.getFullYear() === targetDate.getFullYear() &&
    date.getMonth() === targetDate.getMonth() &&
    date.getDate() === targetDate.getDate()
  );
}

export function isWithinSevenDays(dateValue: string, fromDate = new Date()) {
  const date = new Date(dateValue);
  const diffMs = date.getTime() - fromDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
}

export function isOverdue(dateValue: string, now = new Date()) {
  return new Date(dateValue).getTime() < now.getTime();
}

export function isDueSoon(dateValue: string, now = new Date()) {
  const date = new Date(dateValue);
  const diffMs = date.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours >= 0 && diffHours <= 24;
}
