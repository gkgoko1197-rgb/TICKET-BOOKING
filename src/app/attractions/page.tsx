
import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Ticket, Landmark, Mountain, Palmtree } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


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

const europeDestinations = [
    { name: 'London', thingsToDo: 3889, imageUrl: 'https://picsum.photos/seed/london-dest/400/300', hint: 'London city' },
    { name: 'Istanbul', thingsToDo: 2737, imageUrl: 'https://picsum.photos/seed/istanbul-dest/400/300', hint: 'Istanbul mosque' },
    { name: 'Paris', thingsToDo: 3880, imageUrl: 'https://picsum.photos/seed/paris-dest/400/300', hint: 'Paris skyline' },
    { name: 'Hamburg', thingsToDo: 365, imageUrl: 'https://picsum.photos/seed/hamburg-dest/400/300', hint: 'Hamburg harbor' },
    { name: 'Amsterdam', thingsToDo: 1895, imageUrl: 'https://picsum.photos/seed/amsterdam-dest/400/300', hint: 'Amsterdam canal' },
    { name: 'Lisbon', thingsToDo: 3828, imageUrl: 'https://picsum.photos/seed/lisbon-dest/400/300', hint: 'Lisbon city' },
    { name: 'Rome', thingsToDo: 6778, imageUrl: 'https://picsum.photos/seed/rome-dest/400/300', hint: 'Rome ruins' },
    { name: 'Athens', thingsToDo: 3349, imageUrl: 'https://picsum.photos/seed/athens-dest/400/300', hint: 'Athens acropolis' },
    { name: 'Berlin', thingsToDo: 894, imageUrl: 'https://picsum.photos/seed/berlin-dest/400/300', hint: 'Berlin gate' },
    { name: 'Barcelona', thingsToDo: 2509, imageUrl: 'https://picsum.photos/seed/barcelona-dest/400/300', hint: 'Barcelona architecture' },
    { name: 'Venice', thingsToDo: 1762, imageUrl: 'https://picsum.photos/seed/venice-dest/400/300', hint: 'Venice canal' },
    { name: 'Málaga', thingsToDo: 823, imageUrl: 'https://picsum.photos/seed/malaga-dest/400/300', hint: 'Malaga beach' },
];

const northAmericaDestinations = [
    { name: 'New York', thingsToDo: 5432, imageUrl: 'https://picsum.photos/seed/ny-dest/400/300', hint: 'New York skyline' },
    { name: 'Los Angeles', thingsToDo: 3123, imageUrl: 'https://picsum.photos/seed/la-dest/400/300', hint: 'Los Angeles beach' },
    { name: 'Toronto', thingsToDo: 1234, imageUrl: 'https://picsum.photos/seed/toronto-dest/400/300', hint: 'Toronto skyline' },
    { name: 'Vancouver', thingsToDo: 987, imageUrl: 'https://picsum.photos/seed/vancouver-dest/400/300', hint: 'Vancouver mountains' },
    { name: 'Mexico City', thingsToDo: 2345, imageUrl: 'https://picsum.photos/seed/mexico-city-dest/400/300', hint: 'Mexico City architecture' },
    { name: 'Cancun', thingsToDo: 1567, imageUrl: 'https://picsum.photos/seed/cancun-dest/400/300', hint: 'Cancun beach' },
    { name: 'Las Vegas', thingsToDo: 4890, imageUrl: 'https://picsum.photos/seed/vegas-dest/400/300', hint: 'Las Vegas strip' },
    { name: 'San Francisco', thingsToDo: 2876, imageUrl: 'https://picsum.photos/seed/sf-dest/400/300', hint: 'San Francisco bridge' },
];

const asiaDestinations = [
    { name: 'Tokyo', thingsToDo: 6789, imageUrl: 'https://picsum.photos/seed/tokyo-dest/400/300', hint: 'Tokyo city' },
    { name: 'Seoul', thingsToDo: 3456, imageUrl: 'https://picsum.photos/seed/seoul-dest/400/300', hint: 'Seoul palace' },
    { name: 'Bangkok', thingsToDo: 4321, imageUrl: 'https://picsum.photos/seed/bangkok-dest/400/300', hint: 'Bangkok temple' },
    { name: 'Singapore', thingsToDo: 2109, imageUrl: 'https://picsum.photos/seed/singapore-dest/400/300', hint: 'Singapore skyline' },
    { name: 'Hong Kong', thingsToDo: 3212, imageUrl: 'https://picsum.photos/seed/hk-dest/400/300', hint: 'Hong Kong harbor' },
    { name: 'Kyoto', thingsToDo: 2876, imageUrl: 'https://picsum.photos/seed/kyoto-dest/400/300', hint: 'Kyoto temple' },
    { name: 'Bali', thingsToDo: 3123, imageUrl: 'https://picsum.photos/seed/bali-dest/400/300', hint: 'Bali beach' },
    { name: 'Taipei', thingsToDo: 1543, imageUrl: 'https://picsum.photos/seed/taipei-dest/400/300', hint: 'Taipei 101' },
];

const africaDestinations = [
    { name: 'Cairo', thingsToDo: 1876, imageUrl: 'https://picsum.photos/seed/cairo-dest/400/300', hint: 'Cairo pyramids' },
    { name: 'Cape Town', thingsToDo: 2109, imageUrl: 'https://picsum.photos/seed/capetown-dest/400/300', hint: 'Cape Town mountain' },
    { name: 'Marrakech', thingsToDo: 1567, imageUrl: 'https://picsum.photos/seed/marrakech-dest/400/300', hint: 'Marrakech market' },
    { name: 'Nairobi', thingsToDo: 789, imageUrl: 'https://picsum.photos/seed/nairobi-dest/400/300', hint: 'Nairobi wildlife' },
    { name: 'Lagos', thingsToDo: 543, imageUrl: 'https://picsum.photos/seed/lagos-dest/400/300', hint: 'Lagos city' },
    { name: 'Zanzibar', thingsToDo: 987, imageUrl: 'https://picsum.photos/seed/zanzibar-dest/400/300', hint: 'Zanzibar beach' },
];

const oceaniaDestinations = [
    { name: 'Sydney', thingsToDo: 3456, imageUrl: 'https://picsum.photos/seed/sydney-dest/400/300', hint: 'Sydney opera house' },
    { name: 'Melbourne', thingsToDo: 2345, imageUrl: 'https://picsum.photos/seed/melbourne-dest/400/300', hint: 'Melbourne street art' },
    { name: 'Auckland', thingsToDo: 1234, imageUrl: 'https://picsum.photos/seed/auckland-dest/400/300', hint: 'Auckland skyline' },
    { name: 'Queenstown', thingsToDo: 1122, imageUrl: 'https://picsum.photos/seed/queenstown-dest/400/300', hint: 'Queenstown mountains' },
    { name: 'Fiji', thingsToDo: 876, imageUrl: 'https://picsum.photos/seed/fiji-dest/400/300', hint: 'Fiji beach' },
    { name: 'Bora Bora', thingsToDo: 543, imageUrl: 'https://picsum.photos/seed/borabora-dest/400/300', hint: 'Bora Bora bungalow' },
];

const southAmericaDestinations = [
    { name: 'Rio de Janeiro', thingsToDo: 2987, imageUrl: 'https://picsum.photos/seed/rio-dest/400/300', hint: 'Rio Christ the Redeemer' },
    { name: 'Buenos Aires', thingsToDo: 1765, imageUrl: 'https://picsum.photos/seed/buenos-aires-dest/400/300', hint: 'Buenos Aires street' },
    { name: 'Lima', thingsToDo: 1234, imageUrl: 'https://picsum.photos/seed/lima-dest/400/300', hint: 'Lima architecture' },
    { name: 'Cusco', thingsToDo: 1543, imageUrl: 'https://picsum.photos/seed/cusco-dest/400/300', hint: 'Cusco ruins' },
    { name: 'Medellín', thingsToDo: 987, imageUrl: 'https://picsum.photos/seed/medellin-dest/400/300', hint: 'Medellin city' },
    { name: 'Santiago', thingsToDo: 1122, imageUrl: 'https://picsum.photos/seed/santiago-dest/400/300', hint: 'Santiago skyline' },
    { name: 'Cartagena', thingsToDo: 1345, imageUrl: 'https://picsum.photos/seed/cartagena-dest/400/300', hint: 'Cartagena colorful streets' },
    { name: 'Galapagos', thingsToDo: 456, imageUrl: 'https://picsum.photos/seed/galapagos-dest/400/300', hint: 'Galapagos wildlife' },
];

const DestinationGrid = ({ destinations }: { destinations: typeof europeDestinations }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {destinations.map((dest) => (
        <Link href="#" key={dest.name}>
          <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                  <Image src={dest.imageUrl} alt={dest.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={dest.hint} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                    <p className="text-white/90 text-sm">{dest.thingsToDo} things to do</p>
                  </div>
              </div>
          </Card>
        </Link>
      ))}
    </div>
);


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

          {/* Explore more destinations */}
          <section className="mb-16">
            <h2 className="text-3xl font-headline font-bold">Explore more destinations</h2>
            <p className="text-muted-foreground mb-6">Find things to do in cities around the world</p>
            <Tabs defaultValue="europe" className="w-full">
              <TabsList className="flex flex-wrap h-auto justify-start bg-transparent p-0 mb-4 border-b rounded-none">
                <TabsTrigger value="europe">Europe</TabsTrigger>
                <TabsTrigger value="north-america">North America</TabsTrigger>
                <TabsTrigger value="asia">Asia</TabsTrigger>
                <TabsTrigger value="africa">Africa</TabsTrigger>
                <TabsTrigger value="oceania">Oceania</TabsTrigger>
                <TabsTrigger value="south-america">South America</TabsTrigger>
              </TabsList>
              <TabsContent value="europe">
                <DestinationGrid destinations={europeDestinations} />
              </TabsContent>
               <TabsContent value="north-america">
                 <DestinationGrid destinations={northAmericaDestinations} />
               </TabsContent>
               <TabsContent value="asia">
                 <DestinationGrid destinations={asiaDestinations} />
                </TabsContent>
                <TabsContent value="africa">
                    <DestinationGrid destinations={africaDestinations} />
                </TabsContent>
                <TabsContent value="oceania">
                    <DestinationGrid destinations={oceaniaDestinations} />
                </TabsContent>
                <TabsContent value="south-america">
                    <DestinationGrid destinations={southAmericaDestinations} />
                </TabsContent>
            </Tabs>
          </section>

        </div>
      </div>
    </div>
  );
}

    