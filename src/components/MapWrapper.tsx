"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY } from "@/app/config";
import type { Accommodation } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface MapWrapperProps {
  accommodations: Accommodation[];
}

export default function MapWrapper({ accommodations }: MapWrapperProps) {
  const [selected, setSelected] = useState<Accommodation | null>(null);

  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_API_KEY_HERE") {
    return (
        <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center p-4 text-center">
            <p>Google Maps API key is missing or invalid. Please add it to your environment variables to display the map.</p>
        </div>
    );
  }

  const center = accommodations.length > 0 
    ? { lat: accommodations[0].location.lat, lng: accommodations[0].location.lng }
    : { lat: 48.8566, lng: 2.3522 };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="h-full w-full rounded-lg overflow-hidden shadow-md">
        <Map
          defaultCenter={center}
          center={center}
          defaultZoom={accommodations.length > 1 ? 11 : 13}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="stayfinder_map"
        >
          {accommodations.map((acc) => (
            <AdvancedMarker
              key={acc.id}
              position={acc.location}
              onClick={() => setSelected(acc)}
            >
              <Pin
                background={"#468FFF"}
                borderColor={"#1E40AF"}
                glyphColor={"#FFFFFF"}
              />
            </AdvancedMarker>
          ))}
          {selected && (
            <InfoWindow
              position={selected.location}
              onCloseClick={() => setSelected(null)}
            >
              <Card className="border-none shadow-none max-w-xs">
                <CardHeader className="p-2">
                    <div className="relative h-24 w-full">
                        <Image
                            src={selected.images[0].url}
                            alt={selected.name}
                            fill
                            className="object-cover rounded-md"
                            data-ai-hint={selected.images[0].hint}
                        />
                    </div>
                  <CardTitle className="text-base font-headline pt-2">{selected.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0">
                  <p className="text-sm font-bold text-primary">${selected.price} / night</p>
                  <Button asChild size="sm" className="w-full mt-2">
                    <Link href={`/accommodation/${selected.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
