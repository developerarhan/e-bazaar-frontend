export default function ProductSkeleton() {
  return (
    <div className="animate-pulse border rounded-lg p-4 space-y-4 bg-white dark:bg-gray-800  dark:border-gray-700">
      <div className="bg-gray-300 h-40 rounded"></div>
      <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
    </div>
  );
}
