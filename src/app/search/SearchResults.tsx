"use client";

import { useState, useMemo, useEffect } from "react";
import type { Accommodation } from "@/lib/data";
import FilterSidebar from "@/components/FilterSidebar";
import AccommodationList from "@/components/AccommodationList";
import MapWrapper from "@/components/MapWrapper";
import { Skeleton } from "@/components/ui/skeleton";

type Filters = {
  priceRange: [number, number];
  rating: number;
  amenities: string[];
};

export default function SearchResults({
  accommodations,
  searchParams,
}: {
  accommodations: Accommodation[];
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isClient, setIsClient] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
  });
  
  const [highlighted, setHighlighted] = useState<string[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredAccommodations = useMemo(() => {
    let filtered = accommodations.filter((acc) => {
      const { priceRange, rating, amenities } = filters;
      if (acc.price < priceRange[0] || acc.price > priceRange[1]) return false;
      if (rating > 0 && acc.rating < rating) return false;
      if (amenities.length > 0 && !amenities.every(a => acc.amenities.includes(a as any))) return false;
      
      const destination = searchParams.destination as string;
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
  }, [accommodations, filters, highlighted, searchParams.destination]);

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <Skeleton className="h-[600px] w-full" />
        </div>
        <div className="lg:col-span-9">
          <Skeleton className="h-full w-full min-h-[600px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-3">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onRecommendations={setHighlighted}
          resultsCount={filteredAccommodations.length}
        />
      </div>
      <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
            <h2 className="text-2xl font-headline font-semibold mb-4">
                {searchParams.destination ? `${searchParams.destination}: ` : ''} 
                {filteredAccommodations.length} properties found
            </h2>
        </div>
        <div className="md:col-span-1 h-[400px] md:h-auto md:order-2">
           <MapWrapper accommodations={filteredAccommodations} />
        </div>
        <div className="md:col-span-1 md:order-1">
          <AccommodationList accommodations={filteredAccommodations} highlighted={highlighted} />
        </div>
      </div>
    </div>
  );
}
