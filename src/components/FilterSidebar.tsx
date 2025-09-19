"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AiRecommender from "./AiRecommender";
import type { Amenity } from "@/lib/data";

type Filters = {
  priceRange: [number, number];
  rating: number;
  amenities: string[];
};

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onRecommendations: (names: string[]) => void;
  resultsCount: number;
}

const amenities: { id: Amenity; label: string }[] = [
  { id: "wifi", label: "Wi-Fi" },
  { id: "pool", label: "Swimming Pool" },
  { id: "parking", label: "Parking" },
  { id: "gym", label: "Gym" },
  { id: "spa", label: "Spa" },
  { id: "restaurant", label: "Restaurant" },
];

export default function FilterSidebar({ filters, onFilterChange, onRecommendations }: FilterSidebarProps) {

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleRatingChange = (value: string) => {
    onFilterChange({ ...filters, rating: Number(value) });
  };

  const handleAmenityChange = (amenityId: string) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter((a) => a !== amenityId)
      : [...filters.amenities, amenityId];
    onFilterChange({ ...filters, amenities: newAmenities });
  };

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="font-headline">Filter & Sort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="price-range" className="font-semibold">Price Range</Label>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <Slider
            id="price-range"
            min={0}
            max={1000}
            step={10}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="mt-2"
          />
        </div>

        <Separator />

        <div>
          <Label className="font-semibold">Star Rating</Label>
          <RadioGroup
            value={String(filters.rating)}
            onValueChange={handleRatingChange}
            className="mt-2 space-y-2"
          >
            {[5, 4, 3, 2, 1, 0].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem value={String(rating)} id={`r${rating}`} />
                <Label htmlFor={`r${rating}`}>
                  {rating > 0 ? `${rating} Stars & Up` : "Any"}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        <div>
          <Label className="font-semibold">Amenities</Label>
          <div className="mt-2 space-y-2">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={filters.amenities.includes(amenity.id)}
                  onCheckedChange={() => handleAmenityChange(amenity.id)}
                />
                <Label htmlFor={amenity.id}>{amenity.label}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <AiRecommender onRecommendations={onRecommendations} />

      </CardContent>
    </Card>
  );
}
