export function SkeletonTitle() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-full mb-8 bg-gray-200 animate-pulse rounded"></div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="space-y-4">
      <div className="h-18 w-full bg-gray-300 animate-pulse rounded"></div>
      <div className="h-18 w-full bg-gray-300 animate-pulse rounded"></div>
      <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded"></div>
      <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded"></div>
      <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
      <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
      <div className="h-4 w-5/6 bg-gray-300 animate-pulse rounded"></div>
      <div className="h-4 w-5/6 bg-gray-300 animate-pulse rounded"></div>
    </div>
  );
}