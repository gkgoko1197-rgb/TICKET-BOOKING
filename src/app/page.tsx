import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import SearchForm from "@/components/SearchForm";
import { placeholderImages } from "@/lib/placeholder-images.json";

export default function Home() {
  const heroImage = placeholderImages.find(
    (img) => img.id === "hero-background"
  )!;

  return (
    <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover"
        priority
        data-ai-hint={heroImage.imageHint}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg">
          Find your next stay
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md">
          Search deals on hotels, homes, and much more...
        </p>
        <Card className="w-full max-w-5xl">
          <CardContent className="p-4 sm:p-6">
            <SearchForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
