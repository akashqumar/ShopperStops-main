import React from 'react';

const ProductSkeleton = () => (
    <div class="group relative animate-pulse">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
      <div class="h-full w-full bg-gray-200"></div>
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <div class="h-4 bg-gray-200 w-3/4 rounded mb-1"></div>
        <div class="h-4 bg-gray-200 w-1/2 rounded"></div>
      </div>
      <div class="h-4 bg-gray-200 w-1/4 rounded"></div>
    </div>
  </div>
);

const TenProductSkeletons = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    {[...Array(8)].map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </div>
);

export default TenProductSkeletons;
