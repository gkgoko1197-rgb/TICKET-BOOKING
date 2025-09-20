"use client";

import type { Accommodation } from "@/lib/data";
import AccommodationCard from "./AccommodationCard";

interface AccommodationListProps {
  accommodations: Accommodation[];
  highlighted: string[];
}

export default function AccommodationList({ accommodations, highlighted }: AccommodationListProps) {
  if (accommodations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground min-h-[400px]">
        <p>No accommodations found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {accommodations.map((acc) => (
        <AccommodationCard 
          key={acc.id} 
          accommodation={acc} 
          isHighlighted={highlighted.includes(acc.name)}
          layout="grid"
        />
      ))}
    </div>
  );
}
