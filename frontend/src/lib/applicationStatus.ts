export function getStatusClasses(status: string) {
  if (status === "accepted") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "rejected") {
    return "bg-slate-100 text-slate-700";
  }

  return "bg-violet-100 text-violet-700";
}