import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import SearchForm from '@/components/SearchForm';
import { placeholderImages } from '@/lib/placeholder-images.json';
import Link from 'next/link';

const propertyTypes = [
  { name: 'Hotels', image: placeholderImages.find(p => p.id === 'hotel-2'), hint: 'hotel room' },
  { name: 'Apartments', image: placeholderImages.find(p => p.id === 'apartment-1'), hint: 'modern apartment' },
  { name: 'Resorts', image: placeholderImages.find(p => p.id === 'resort-1'), hint: 'beach resort' },
  { name: 'Villas', image: placeholderImages.find(p => p.id === 'villa-1'), hint: 'private villa' },
];

export default function Home() {
  const heroImage = placeholderImages.find(
    img => img.id === 'hero-background'
  )!;

  return (
    <>
      <div className="relative w-full bg-primary -mt-1">
        <div className="container mx-auto px-4">
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
      <div className="container mx-auto px-4 py-12">
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
    </>
  );
}
