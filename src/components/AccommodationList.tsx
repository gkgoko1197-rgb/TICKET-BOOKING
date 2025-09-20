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
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>No accommodations found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {accommodations.map((acc) => (
        <AccommodationCard 
          key={acc.id} 
          accommodation={acc} 
          isHighlighted={highlighted.includes(acc.name)}
        />
      ))}
    </div>
  );
}
