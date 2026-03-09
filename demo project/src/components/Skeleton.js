export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-slate-700/50 rounded-md ${className}`}
    ></div>
  );
}

export function DestinationSkeleton() {
  return (
    <div className="glass-panel p-0 overflow-hidden h-full flex flex-col">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-6 flex flex-col flex-1 gap-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="mt-auto pt-4 border-t border-slate-700/50 flex justify-between">
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
}
