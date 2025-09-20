import Image from "next/image";
import Link from "next/link";
import { Star, Bot } from "lucide-react";
import type { Accommodation } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AccommodationCardProps {
  accommodation: Accommodation;
  isHighlighted?: boolean;
  layout?: "list" | "grid";
}

export default function AccommodationCard({ accommodation, isHighlighted = false, layout = 'list' }: AccommodationCardProps) {
  if (layout === 'grid') {
    return (
       <Link href={`/accommodation/${accommodation.id}`}>
        <Card className={cn("overflow-hidden transition-all hover:shadow-lg h-full flex flex-col", isHighlighted && "ring-2 ring-primary shadow-lg")}>
          <div className="relative h-48 w-full">
            <Image
              src={accommodation.images[0].url}
              alt={accommodation.name}
              fill
              className="object-cover"
              data-ai-hint={accommodation.images[0].hint}
            />
          </div>
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-headline font-semibold text-lg">{accommodation.name}</h3>
                <div className="flex items-center gap-1 text-sm shrink-0 pl-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{accommodation.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{accommodation.description}</p>
            </div>
            <div className="flex justify-between items-end mt-4">
               <div>
                {isHighlighted && (
                   <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                     <Bot className="w-3 h-3 mr-1.5" />
                     AI Pick
                   </Badge>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">${accommodation.price}</p>
                <p className="text-xs text-muted-foreground">per night</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/accommodation/${accommodation.id}`}>
      <Card className={cn("overflow-hidden transition-all hover:shadow-lg", isHighlighted && "ring-2 ring-primary shadow-lg")}>
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-48 sm:h-auto sm:w-2/5 md:w-1/3">
            <Image
              src={accommodation.images[0].url}
              alt={accommodation.name}
              fill
              className="object-cover"
              data-ai-hint={accommodation.images[0].hint}
            />
          </div>
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-headline font-semibold text-lg">{accommodation.name}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{accommodation.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{accommodation.description}</p>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div>
                {isHighlighted && (
                   <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                     <Bot className="w-3 h-3 mr-1.5" />
                     AI Recommended
                   </Badge>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">${accommodation.price}</p>
                <p className="text-xs text-muted-foreground">per night</p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
