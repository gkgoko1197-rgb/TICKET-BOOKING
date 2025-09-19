import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import SearchForm from '@/components/SearchForm';
import { placeholderImages } from '@/lib/placeholder-images.json';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Globe, Headset, ThumbsUp, ArrowRight } from 'lucide-react';

const propertyTypes = [
  { name: 'Hotels', image: placeholderImages.find(p => p.id === 'hotel-2'), hint: 'hotel room' },
  { name: 'Apartments', image: placeholderImages.find(p => p.id === 'apartment-1'), hint: 'modern apartment' },
  { name: 'Resorts', image: placeholderImages.find(p => p.id === 'resort-1'), hint: 'beach resort' },
  { name: 'Villas', image: placeholderImages.find(p => p.id === 'villa-1'), hint: 'private villa' },
];

const trendingDestinations = [
    { name: 'Bangalore', imageUrl: 'https://picsum.photos/seed/bangalore/800/600', hint: 'Bangalore palace' },
    { name: 'Chennai', imageUrl: 'https://picsum.photos/seed/chennai/800/600', hint: 'Chennai memorial' },
    { name: 'Mysore', imageUrl: 'https://picsum.photos/seed/mysore/800/600', hint: 'Mysore palace' },
    { name: 'Mumbai', imageUrl: 'https://picsum.photos/seed/mumbai/800/600', hint: 'Mumbai skyline' },
    { name: 'New Delhi', imageUrl: 'https://picsum.photos/seed/delhi/800/600', hint: 'Delhi street market' },
];

const whyStayFinder = [
    {
      icon: <CalendarCheck className="w-8 h-8 text-accent" />,
      title: 'Book now, pay at the property',
      description: 'FREE cancellation on most rooms',
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-accent" />,
      title: '300M+ reviews from fellow travelers',
      description: 'Get trusted information from guests like you',
    },
    {
      icon: <Globe className="w-8 h-8 text-accent" />,
      title: '2+ million properties worldwide',
      description: 'Hotels, guest houses, apartments, and more...',
    },
    {
      icon: <Headset className="w-8 h-8 text-accent" />,
      title: 'Trusted 24/7 customer service',
      description: "We're always here to help",
    },
  ];

export default function Home() {
  const heroImage = placeholderImages.find(
    img => img.id === 'hero-background'
  )!;

  return (
    <>
      <div className="relative w-full bg-primary -mt-1">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative z-10 flex flex-col items-start text-left text-white px-4 py-16">
            <h1 className="text-5xl font-headline font-bold mb-4 drop-shadow-lg">
              Find your next stay
            </h1>
            <p className="text-xl max-w-2xl mb-8 drop-shadow-md">
              Search deals on hotels, homes, and much more...
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 -mt-16 z-20 relative flex justify-center">
        <SearchForm />
      </div>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-3xl font-headline font-bold mb-6">Browse by property type</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {propertyTypes.map(type => (
            <Link href="#" key={type.name}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                        <Image
                        src={type.image?.imageUrl || ''}
                        alt={type.name}
                        fill
                        className="object-cover"
                        data-ai-hint={type.hint}
                        />
                    </div>
                    <CardContent className="p-4">
                        <h3 className="font-headline font-semibold text-lg">{type.name}</h3>
                    </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-3xl font-headline font-bold mb-6">Why StayFinder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyStayFinder.map((item) => (
            <Card key={item.title} className="p-6 flex flex-col items-start text-left">
                {item.icon}
                <h3 className="font-headline font-bold mt-4 mb-2 text-lg">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-3xl font-headline font-bold">Offers</h2>
        <p className="text-muted-foreground mb-6">Promotions, deals, and special offers for you</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="flex items-center p-4">
            <div className="flex-1">
              <h3 className="font-headline font-bold text-xl mb-2">Quick escape, quality time</h3>
              <p className="text-muted-foreground mb-4">Save up to 20% with a Getaway Deal</p>
              <Button className="bg-accent hover:bg-accent/90">Save on stays</Button>
            </div>
            <div className="relative w-24 h-24 ml-4">
              <Image src="https://picsum.photos/seed/couple/200/200" alt="Couple on a boat" fill className="object-cover rounded-md" data-ai-hint="happy couple" />
            </div>
          </Card>
          <Card className="relative overflow-hidden group">
            <Image src="https://picsum.photos/seed/hammock/800/400" alt="Person in a hammock" fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="beach hammock" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative h-full flex flex-col justify-between p-6 text-white">
                <div>
                    <p className="text-sm">Late Escape Deals</p>
                    <h3 className="font-headline font-bold text-2xl mt-1">Go for a good time, not a long time</h3>
                    <p className="mt-1 text-sm">Squeeze out the last bit of sun with at least 15% off</p>
                </div>
              <Button variant="secondary" className="self-start">Find deals</Button>
            </div>
             <div className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-6 h-6 text-gray-800" />
            </div>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-3xl font-headline font-bold">Trending destinations</h2>
        <p className="text-muted-foreground mb-6">Travelers searching for India also booked these</p>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trendingDestinations.slice(0, 2).map((dest) => (
              <Link href="#" key={dest.name}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow w-full">
                  <div className="relative h-64">
                    <Image
                      src={dest.imageUrl}
                      alt={dest.name}
                      fill
                      className="object-cover"
                      data-ai-hint={dest.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-bold text-xl flex items-center gap-2">
                      <span>{dest.name}</span>
                      <span className="text-2xl">🇮🇳</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trendingDestinations.slice(2).map((dest) => (
              <Link href="#" key={dest.name}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow w-full">
                  <div className="relative h-48">
                    <Image
                      src={dest.imageUrl}
                      alt={dest.name}
                      fill
                      className="object-cover"
                      data-ai-hint={dest.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-bold text-xl flex items-center gap-2">
                      <span>{dest.name}</span>
                      <span className="text-2xl">🇮🇳</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
