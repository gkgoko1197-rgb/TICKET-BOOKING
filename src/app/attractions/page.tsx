
import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Ticket, Landmark, Mountain, Palmtree, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const topDestinations = [
    { name: 'Paris', imageUrl: 'https://picsum.photos/seed/paris-attr/400/500', hint: 'Eiffel Tower' },
    { name: 'Rome', imageUrl: 'https://picsum.photos/seed/rome-attr/400/500', hint: 'Colosseum' },
    { name: 'London', imageUrl: 'https://picsum.photos/seed/london-attr/400/500', hint: 'Tower Bridge' },
    { name: 'New York', imageUrl: 'https://picsum.photos/seed/ny-attr/400/500', hint: 'Statue of Liberty' },
    { name: 'Tokyo', imageUrl: 'https://picsum.photos/seed/tokyo-attr/400/500', hint: 'Tokyo temple' },
    { name: 'Dubai', imageUrl: 'https://picsum.photos/seed/dubai-attr/400/500', hint: 'Dubai skyline' },
];

const categories = [
    { name: 'Tours', icon: <MapPin /> },
    { name: 'Museums', icon: <Landmark /> },
    { name: 'Activities', icon: <Palmtree /> },
    { name: 'Adventures', icon: <Mountain /> },
    { name: 'Tickets', icon: <Ticket /> },
];

const trendingAttractions = [
  {
    id: 'attr1',
    name: 'Louvre Museum Priority Access',
    location: 'Paris, France',
    rating: 4.8,
    reviews: 12890,
    price: 25,
    imageUrl: 'https://picsum.photos/seed/louvre/800/600',
    hint: 'art museum'
  },
  {
    id: 'attr2',
    name: 'Colosseum & Roman Forum Guided Tour',
    location: 'Rome, Italy',
    rating: 4.9,
    reviews: 21543,
    price: 78,
    imageUrl: 'https://picsum.photos/seed/colosseum/800/600',
    hint: 'ancient ruins'
  },
  {
    id: 'attr3',
    name: 'Statue of Liberty & Ellis Island',
    location: 'New York, USA',
    rating: 4.7,
    reviews: 18450,
    price: 44,
    imageUrl: 'https://picsum.photos/seed/liberty/800/600',
    hint: 'famous statue'
  },
  {
    id: 'attr4',
    name: 'Burj Khalifa At the Top (Level 124 & 125)',
    location: 'Dubai, UAE',
    rating: 4.6,
    reviews: 32987,
    price: 55,
    imageUrl: 'https://picsum.photos/seed/burj/800/600',
    hint: 'tall skyscraper'
  }
];

export default function AttractionsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary/90 text-white py-20 -mt-1">
        <Image
            src="https://picsum.photos/seed/attractions-hero/1920/600"
            alt="Attractions background"
            fill
            className="object-cover object-center z-0 opacity-20"
            data-ai-hint="city attractions montage"
        />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h1 className="text-5xl font-headline font-bold mb-4">Attractions, activities and experiences</h1>
          <p className="text-xl mb-8">Discover and book things to do, from walking tours to day trips and more.</p>
          <div className="max-w-xl mx-auto">
            <form className="relative">
              <Input
                type="search"
                placeholder="Where are you going?"
                className="w-full h-14 pl-6 pr-24 rounded-full text-base text-foreground"
              />
              <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-accent hover:bg-accent/90">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="bg-background">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            
          {/* Top Destinations */}
          <section className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-6">Top destinations for attractions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {topDestinations.map(dest => (
                <Link href="#" key={dest.name}>
                    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className="relative aspect-[4/5]">
                            <Image src={dest.imageUrl} alt={dest.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={dest.hint} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h3 className="absolute bottom-3 left-3 text-white font-bold text-lg">{dest.name}</h3>
                        </div>
                    </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-6">Browse by category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {categories.map(cat => (
                <Link href="#" key={cat.name}>
                  <Card className="p-4 flex items-center gap-4 hover:bg-muted/50 hover:shadow-md transition-all">
                    <div className="text-accent">{React.cloneElement(cat.icon, { className: "w-6 h-6" })}</div>
                    <span className="font-semibold">{cat.name}</span>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
          
          {/* Trending Attractions */}
          <section>
            <h2 className="text-3xl font-headline font-bold mb-6">Trending attractions</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingAttractions.map(attr => (
                    <Link href="#" key={attr.id}>
                        <Card className="overflow-hidden group hover:shadow-xl transition-shadow flex flex-col h-full">
                           <div className="relative h-64 w-full">
                                <Image src={attr.imageUrl} alt={attr.name} fill className="object-cover" data-ai-hint={attr.hint} />
                           </div>
                           <CardContent className="p-4 flex-grow flex flex-col justify-between">
                               <div>
                                    <h3 className="font-headline font-bold text-xl mb-2 leading-tight">{attr.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-2">{attr.location}</p>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="flex items-center gap-1 text-yellow-600">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="font-bold">{attr.rating}</span>
                                        </div>
                                        <span className="text-muted-foreground">({attr.reviews.toLocaleString()} reviews)</span>
                                    </div>
                               </div>
                               <div className="flex justify-between items-end mt-4">
                                    <div>
                                        <p className="text-muted-foreground text-sm">From</p>
                                        <p className="font-bold text-xl text-primary">${attr.price}</p>
                                    </div>
                                   <Button variant="ghost" size="icon" className="text-primary group-hover:bg-primary/10">
                                       <ArrowRight />
                                   </Button>
                               </div>
                           </CardContent>
                        </Card>
                    </Link>
                ))}
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}
