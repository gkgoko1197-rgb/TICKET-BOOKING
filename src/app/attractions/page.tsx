
"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Ticket, Landmark, Mountain, Palmtree, X } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';


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
    { name: 'Dublin', thingsToDo: 1200, imageUrl: 'https://picsum.photos/seed/dublin-dest/400/300', hint: 'Dublin street' },
    { name: 'Prague', thingsToDo: 2100, imageUrl: 'https://picsum.photos/seed/prague-dest/400/300', hint: 'Prague castle' },
    { name: 'Vienna', thingsToDo: 1500, imageUrl: 'https://picsum.photos/seed/vienna-dest/400/300', hint: 'Vienna opera' },
    { name: 'Budapest', thingsToDo: 1800, imageUrl: 'https://picsum.photos/seed/budapest-dest/400/300', hint: 'Budapest parliament' },
    { name: 'Madrid', thingsToDo: 2200, imageUrl: 'https://picsum.photos/seed/madrid-dest/400/300', hint: 'Madrid plaza' },
    { name: 'Florence', thingsToDo: 1900, imageUrl: 'https://picsum.photos/seed/florence-dest/400/300', hint: 'Florence cathedral' },
    { name: 'Edinburgh', thingsToDo: 1300, imageUrl: 'https://picsum.photos/seed/edinburgh-dest/400/300', hint: 'Edinburgh castle' },
    { name: 'Copenhagen', thingsToDo: 1000, imageUrl: 'https://picsum.photos/seed/copenhagen-dest/400/300', hint: 'Copenhagen harbor' },
    { name: 'Stockholm', thingsToDo: 900, imageUrl: 'https://picsum.photos/seed/stockholm-dest/400/300', hint: 'Stockholm old town' },
    { name: 'Brussels', thingsToDo: 800, imageUrl: 'https://picsum.photos/seed/brussels-dest/400/300', hint: 'Brussels grand place' },
    { name: 'Zurich', thingsToDo: 700, imageUrl: 'https://picsum.photos/seed/zurich-dest/400/300', hint: 'Zurich lake' },
    { name: 'Munich', thingsToDo: 1100, imageUrl: 'https://picsum.photos/seed/munich-dest/400/300', hint: 'Munich square' },
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
    { name: 'Chicago', thingsToDo: 2000, imageUrl: 'https://picsum.photos/seed/chicago-dest/400/300', hint: 'Chicago bean' },
    { name: 'Miami', thingsToDo: 1800, imageUrl: 'https://picsum.photos/seed/miami-dest/400/300', hint: 'Miami beach' },
    { name: 'Montreal', thingsToDo: 1100, imageUrl: 'https://picsum.photos/seed/montreal-dest/400/300', hint: 'Montreal city' },
    { name: 'Havana', thingsToDo: 800, imageUrl: 'https://picsum.photos/seed/havana-dest/400/300', hint: 'Havana cars' },
    { name: 'Orlando', thingsToDo: 3500, imageUrl: 'https://picsum.photos/seed/orlando-dest/400/300', hint: 'Orlando castle' },
    { name: 'Boston', thingsToDo: 1700, imageUrl: 'https://picsum.photos/seed/boston-dest/400/300', hint: 'Boston harbor' },
    { name: 'Washington D.C.', thingsToDo: 2200, imageUrl: 'https://picsum.photos/seed/dc-dest/400/300', hint: 'Washington monument' },
    { name: 'Seattle', thingsToDo: 1400, imageUrl: 'https://picsum.photos/seed/seattle-dest/400/300', hint: 'Seattle skyline' },
    { name: 'New Orleans', thingsToDo: 1600, imageUrl: 'https://picsum.photos/seed/nola-dest/400/300', hint: 'New Orleans street' },
    { name: 'Austin', thingsToDo: 1300, imageUrl: 'https://picsum.photos/seed/austin-dest/400/300', hint: 'Austin skyline' },
    { name: 'Denver', thingsToDo: 1200, imageUrl: 'https://picsum.photos/seed/denver-dest/400/300', hint: 'Denver mountains' },
    { name: 'Quebec City', thingsToDo: 900, imageUrl: 'https://picsum.photos/seed/quebec-dest/400/300', hint: 'Quebec City old town' },
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
    { name: 'Shanghai', thingsToDo: 2500, imageUrl: 'https://picsum.photos/seed/shanghai-dest/400/300', hint: 'Shanghai skyline' },
    { name: 'Mumbai', thingsToDo: 2200, imageUrl: 'https://picsum.photos/seed/mumbai-dest/400/300', hint: 'Mumbai gateway' },
    { name: 'Ho Chi Minh City', thingsToDo: 1700, imageUrl: 'https://picsum.photos/seed/hcmc-dest/400/300', hint: 'Saigon street' },
    { name: 'Kuala Lumpur', thingsToDo: 1900, imageUrl: 'https://picsum.photos/seed/kl-dest/400/300', hint: 'Petronas Towers' },
    { name: 'Dubai', thingsToDo: 3000, imageUrl: 'https://picsum.photos/seed/dubai-dest2/400/300', hint: 'Dubai desert' },
    { name: 'Jaipur', thingsToDo: 1400, imageUrl: 'https://picsum.photos/seed/jaipur-dest/400/300', hint: 'Jaipur palace' },
    { name: 'Agra', thingsToDo: 800, imageUrl: 'https://picsum.photos/seed/agra-dest/400/300', hint: 'Taj Mahal' },
    { name: 'Phuket', thingsToDo: 2000, imageUrl: 'https://picsum.photos/seed/phuket-dest/400/300', hint: 'Phuket beach' },
    { name: 'Hanoi', thingsToDo: 1600, imageUrl: 'https://picsum.photos/seed/hanoi-dest/400/300', hint: 'Hanoi old quarter' },
    { name: 'Siem Reap', thingsToDo: 1200, imageUrl: 'https://picsum.photos/seed/siemreap-dest/400/300', hint: 'Angkor Wat' },
    { name: 'Goa', thingsToDo: 1100, imageUrl: 'https://picsum.photos/seed/goa-dest/400/300', hint: 'Goa beach' },
    { name: 'Maldives', thingsToDo: 900, imageUrl: 'https://picsum.photos/seed/maldives-dest/400/300', hint: 'Maldives bungalows' },
];

const africaDestinations = [
    { name: 'Cairo', thingsToDo: 1876, imageUrl: 'https://picsum.photos/seed/cairo-dest/400/300', hint: 'Cairo pyramids' },
    { name: 'Cape Town', thingsToDo: 2109, imageUrl: 'https://picsum.photos/seed/capetown-dest/400/300', hint: 'Cape Town mountain' },
    { name: 'Marrakech', thingsToDo: 1567, imageUrl: 'https://picsum.photos/seed/marrakech-dest/400/300', hint: 'Marrakech market' },
    { name: 'Nairobi', thingsToDo: 789, imageUrl: 'https://picsum.photos/seed/nairobi-dest/400/300', hint: 'Nairobi wildlife' },
    { name: 'Lagos', thingsToDo: 543, imageUrl: 'https://picsum.photos/seed/lagos-dest/400/300', hint: 'Lagos city' },
    { name: 'Zanzibar', thingsToDo: 987, imageUrl: 'https://picsum.photos/seed/zanzibar-dest/400/300', hint: 'Zanzibar beach' },
    { name: 'Johannesburg', thingsToDo: 1200, imageUrl: 'https://picsum.photos/seed/johannesburg-dest/400/300', hint: 'Johannesburg skyline' },
    { name: 'Luxor', thingsToDo: 1100, imageUrl: 'https://picsum.photos/seed/luxor-dest/400/300', hint: 'Luxor temple' },
    { name: 'Victoria Falls', thingsToDo: 400, imageUrl: 'https://picsum.photos/seed/vicfalls-dest/400/300', hint: 'Victoria Falls' },
    { name: 'Serengeti', thingsToDo: 300, imageUrl: 'https://picsum.photos/seed/serengeti-dest/400/300', hint: 'Serengeti safari' },
    { name: 'Dakar', thingsToDo: 600, imageUrl: 'https://picsum.photos/seed/dakar-dest/400/300', hint: 'Dakar monument' },
    { name: 'Accra', thingsToDo: 500, imageUrl: 'https://picsum.photos/seed/accra-dest/400/300', hint: 'Accra beach' },
    { name: 'Addis Ababa', thingsToDo: 450, imageUrl: 'https://picsum.photos/seed/addis-dest/400/300', hint: 'Addis Ababa city' },
    { name: 'Tunis', thingsToDo: 700, imageUrl: 'https://picsum.photos/seed/tunis-dest/400/300', hint: 'Tunis blue city' },
    { name: 'Giza', thingsToDo: 250, imageUrl: 'https://picsum.photos/seed/giza-dest/400/300', hint: 'Giza pyramids sphinx' },
    { name: 'Casablanca', thingsToDo: 800, imageUrl: 'https://picsum.photos/seed/casablanca-dest/400/300', hint: 'Casablanca mosque' },
];

const oceaniaDestinations = [
    { name: 'Sydney', thingsToDo: 3456, imageUrl: 'https://picsum.photos/seed/sydney-dest/400/300', hint: 'Sydney opera house' },
    { name: 'Melbourne', thingsToDo: 2345, imageUrl: 'https://picsum.photos/seed/melbourne-dest/400/300', hint: 'Melbourne street art' },
    { name: 'Auckland', thingsToDo: 1234, imageUrl: 'https://picsum.photos/seed/auckland-dest/400/300', hint: 'Auckland skyline' },
    { name: 'Queenstown', thingsToDo: 1122, imageUrl: 'https://picsum.photos/seed/queenstown-dest/400/300', hint: 'Queenstown mountains' },
    { name: 'Fiji', thingsToDo: 876, imageUrl: 'https://picsum.photos/seed/fiji-dest/400/300', hint: 'Fiji beach' },
    { name: 'Bora Bora', thingsToDo: 543, imageUrl: 'https://picsum.photos/seed/borabora-dest/400/300', hint: 'Bora Bora bungalow' },
    { name: 'Perth', thingsToDo: 900, imageUrl: 'https://picsum.photos/seed/perth-dest/400/300', hint: 'Perth skyline' },
    { name: 'Adelaide', thingsToDo: 600, imageUrl: 'https://picsum.photos/seed/adelaide-dest/400/300', hint: 'Adelaide city' },
    { name: 'Brisbane', thingsToDo: 1000, imageUrl: 'https://picsum.photos/seed/brisbane-dest/400/300', hint: 'Brisbane bridge' },
    { name: 'Cairns', thingsToDo: 700, imageUrl: 'https://picsum.photos/seed/cairns-dest/400/300', hint: 'Cairns reef' },
    { name: 'Wellington', thingsToDo: 800, imageUrl: 'https://picsum.photos/seed/wellington-dest/400/300', hint: 'Wellington city' },
    { name: 'Christchurch', thingsToDo: 650, imageUrl: 'https://picsum.photos/seed/christchurch-dest/400/300', hint: 'Christchurch cathedral' },
    { name: 'Gold Coast', thingsToDo: 1500, imageUrl: 'https://picsum.photos/seed/goldcoast-dest/400/300', hint: 'Gold Coast beach' },
    { name: 'Hobart', thingsToDo: 400, imageUrl: 'https://picsum.photos/seed/hobart-dest/400/300', hint: 'Hobart harbor' },
    { name: 'Darwin', thingsToDo: 300, imageUrl: 'https://picsum.photos/seed/darwin-dest/400/300', hint: 'Darwin waterfront' },
    { name: 'Papeete', thingsToDo: 450, imageUrl: 'https://picsum.photos/seed/papeete-dest/400/300', hint: 'Tahiti market' },
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
    { name: 'Bogotá', thingsToDo: 1400, imageUrl: 'https://picsum.photos/seed/bogota-dest/400/300', hint: 'Bogota city' },
    { name: 'Quito', thingsToDo: 900, imageUrl: 'https://picsum.photos/seed/quito-dest/400/300', hint: 'Quito old town' },
    { name: 'Ushuaia', thingsToDo: 300, imageUrl: 'https://picsum.photos/seed/ushuaia-dest/400/300', hint: 'Ushuaia end of world' },
    { name: 'La Paz', thingsToDo: 800, imageUrl: 'https://picsum.photos/seed/lapaz-dest/400/300', hint: 'La Paz city mountains' },
    { name: 'Montevideo', thingsToDo: 700, imageUrl: 'https://picsum.photos/seed/montevideo-dest/400/300', hint: 'Montevideo beach' },
    { name: 'Asunción', thingsToDo: 500, imageUrl: 'https://picsum.photos/seed/asuncion-dest/400/300', hint: 'Asuncion government building' },
    { name: 'Salar de Uyuni', thingsToDo: 200, imageUrl: 'https://picsum.photos/seed/uyuni-dest/400/300', hint: 'Uyuni salt flat' },
    { name: 'Torres del Paine', thingsToDo: 250, imageUrl: 'https://picsum.photos/seed/torres-dest/400/300', hint: 'Patagonia mountains' },
];

const allDestinations = [
    ...europeDestinations,
    ...northAmericaDestinations,
    ...asiaDestinations,
    ...africaDestinations,
    ...oceaniaDestinations,
    ...southAmericaDestinations,
];

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

const DestinationGrid = ({ destinations }: { destinations: typeof europeDestinations }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {destinations.map((dest) => (
        <a href={`https://www.google.com/search?q=attractions+in+${encodeURIComponent(dest.name)}`} target="_blank" rel="noopener noreferrer" key={dest.name}>
          <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                  <Image src={dest.imageUrl} alt={dest.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={dest.hint} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-3">
                    <h3 className="text-white font-bold text-base">{dest.name}</h3>
                    <p className="text-white/90 text-xs">{dest.thingsToDo} things to do</p>
                  </div>
              </div>
          </Card>
        </a>
      ))}
    </div>
);


export default function AttractionsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categorizedDestinations = useMemo(() => {
    if (!activeCategory) return [];
    const shuffled = shuffleArray([...allDestinations]);
    const count = Math.floor(Math.random() * 6) + 4; // Random number between 4 and 9
    return shuffled.slice(0, count);
  }, [activeCategory]);


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?destination=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const handleCategoryClick = (categoryName: string) => {
    if (activeCategory === categoryName) {
        setActiveCategory(null); // Deselect if clicking the same category
    } else {
        setActiveCategory(categoryName);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary/90 text-white py-16 -mt-1">
        <Image
            src="https://picsum.photos/seed/attractions-hero/1920/500"
            alt="Attractions background"
            fill
            className="object-cover object-center z-0 opacity-20"
            data-ai-hint="city attractions montage"
        />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h1 className="text-4xl font-headline font-bold mb-3">Attractions, activities and experiences</h1>
          <p className="text-lg mb-6">Discover and book things to do, from walking tours to day trips and more.</p>
          <div className="max-w-xl mx-auto">
            <form className="relative" onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder="Where are you going?"
                className="w-full h-12 pl-5 pr-20 rounded-full text-base text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-accent hover:bg-accent/90">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="bg-background">
        <div className="container mx-auto px-4 py-10 max-w-6xl">
            
          {/* Top Destinations */}
          <section className="mb-12">
            <h2 className="text-2xl font-headline font-bold mb-4">Top destinations for attractions</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {topDestinations.map(dest => (
                <Link href={`/search?destination=${encodeURIComponent(dest.name)}`} key={dest.name}>
                    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className="relative aspect-[3/4]">
                            <Image src={dest.imageUrl} alt={dest.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={dest.hint} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <h3 className="absolute bottom-2 left-2 text-white font-bold text-base">{dest.name}</h3>
                        </div>
                    </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-headline font-bold mb-4">Browse by category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {categories.map(cat => (
                <Button variant={activeCategory === cat.name ? "default" : "outline"} className="justify-start p-3 h-auto" onClick={() => handleCategoryClick(cat.name)} key={cat.name}>
                    <div className={activeCategory === cat.name ? "text-primary-foreground" : "text-accent"}>{React.cloneElement(cat.icon, { className: "w-5 h-5" })}</div>
                    <span className="font-semibold text-sm ml-3">{cat.name}</span>
                </Button>
              ))}
            </div>
          </section>

          {/* Explore more destinations */}
          <section>
            {activeCategory ? (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-headline font-bold">Results for {activeCategory}</h2>
                        <Button variant="ghost" onClick={() => setActiveCategory(null)}>
                            <X className="mr-2 h-4 w-4" /> Clear
                        </Button>
                    </div>
                    <DestinationGrid destinations={categorizedDestinations} />
                </div>
            ) : (
                <>
                <h2 className="text-2xl font-headline font-bold">Explore more destinations</h2>
                <p className="text-muted-foreground mb-4">Find things to do in cities around the world</p>
                <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex flex-wrap h-auto justify-start bg-transparent p-0 mb-4 border-b rounded-none">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="europe">Europe</TabsTrigger>
                    <TabsTrigger value="north-america">North America</TabsTrigger>
                    <TabsTrigger value="asia">Asia</TabsTrigger>
                    <TabsTrigger value="africa">Africa</TabsTrigger>
                    <TabsTrigger value="oceania">Oceania</TabsTrigger>
                    <TabsTrigger value="south-america">South America</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <DestinationGrid destinations={allDestinations} />
                </TabsContent>
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
                </>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
