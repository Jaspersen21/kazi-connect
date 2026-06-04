export default function JobCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm animate-pulse">
      <div className="h-6 w-1/2 rounded-xl bg-slate-100" />

      <div className="mt-3 h-4 w-1/3 rounded-xl bg-slate-100" />

      <div className="mt-4 flex flex-wrap gap-4">
        <div className="h-9 w-32 rounded-xl bg-slate-100" />
        <div className="h-9 w-24 rounded-xl bg-slate-100" />
        <div className="h-9 w-24 rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}