"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Accommodation } from "@/lib/data";
import FilterSidebar from "@/components/FilterSidebar";
import AccommodationList from "@/components/AccommodationList";
import { Skeleton } from "@/components/ui/skeleton";

type Filters = {
  priceRange: [number, number];
  rating: number;
  amenities: string[];
};

export default function SearchResults({
  accommodations,
}: {
  accommodations: Accommodation[];
}) {
  const [isClient, setIsClient] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
  });
  
  const [highlighted, setHighlighted] = useState<string[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredAccommodations = useMemo(() => {
    let filtered = accommodations.filter((acc) => {
      const { priceRange, rating, amenities } = filters;
      if (acc.price < priceRange[0] || acc.price > priceRange[1]) return false;
      if (rating > 0 && acc.rating < rating) return false;
      if (amenities.length > 0 && !amenities.every(a => acc.amenities.includes(a as any))) return false;
      
      const destination = searchParams.get("destination");
      if (destination && !acc.city.toLowerCase().includes(destination.toLowerCase())) {
        return false;
      }
      
      return true;
    });

    if (highlighted.length > 0) {
      filtered.sort((a, b) => {
        const aIsHighlighted = highlighted.includes(a.name);
        const bIsHighlighted = highlighted.includes(b.name);
        if (aIsHighlighted && !bIsHighlighted) return -1;
        if (!aIsHighlighted && bIsHighlighted) return 1;
        return 0;
      });
    }

    return filtered;
  }, [accommodations, filters, highlighted, searchParams]);

  const destination = searchParams.get("destination");

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Skeleton className="h-[600px] w-full" />
        </div>
        <div className="lg:col-span-3">
          <Skeleton className="h-full w-full min-h-[600px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onRecommendations={setHighlighted}
          resultsCount={filteredAccommodations.length}
        />
      </div>
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-headline font-semibold mb-4">
            {destination ? `${destination}: ` : ''} 
            {filteredAccommodations.length} properties found
        </h2>
        <AccommodationList accommodations={filteredAccommodations} highlighted={highlighted} />
      </div>
    </div>
  );
}
