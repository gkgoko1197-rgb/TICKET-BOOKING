import { accommodations, Amenity } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Wifi,
  Car,
  Waves,
  Dumbbell,
  Sparkles,
  Utensils,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const amenityIcons: { [key in Amenity]: React.ReactNode } = {
  wifi: <Wifi className="w-5 h-5" />,
  pool: <Waves className="w-5 h-5" />,
  parking: <Car className="w-5 h-5" />,
  gym: <Dumbbell className="w-5 h-5" />,
  spa: <Sparkles className="w-5 h-5" />,
  restaurant: <Utensils className="w-5 h-5" />,
};

const amenityLabels: { [key in Amenity]: string } = {
  wifi: "Wi-Fi",
  pool: "Swimming Pool",
  parking: "Parking",
  gym: "Fitness Center",
  spa: "Spa",
  restaurant: "Restaurant",
};

export default function AccommodationPage({
  params,
}: {
  params: { id: string };
}) {
  const accommodation = accommodations.find((acc) => acc.id === params.id);

  if (!accommodation) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Carousel className="w-full rounded-lg overflow-hidden shadow-lg">
            <CarouselContent>
              {accommodation.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-96">
                    <Image
                      src={image.url}
                      alt={`${accommodation.name} - image ${index + 1}`}
                      fill
                      className="object-cover"
                      data-ai-hint={image.hint}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">{accommodation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{accommodation.location.city}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{accommodation.rating.toFixed(1)} rating</span>
                </div>
              </div>
              <p className="text-base leading-relaxed">{accommodation.longDescription}</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex justify-between items-baseline font-headline">
                <span>Book your stay</span>
                <span className="text-2xl text-primary font-bold">
                  ${accommodation.price}
                  <span className="text-sm font-normal text-muted-foreground">/night</span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
                    <Link href={`/booking/${accommodation.id}`}>Reserve or Book Now</Link>
                </Button>
            </CardContent>
            <Separator />
            <CardHeader>
              <CardTitle className="font-headline text-xl">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {accommodation.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3">
                    <div className="text-primary">{amenityIcons[amenity]}</div>
                    <span className="text-sm">{amenityLabels[amenity]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
