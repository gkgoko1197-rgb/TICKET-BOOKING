import Link from "next/link";
import { BedDouble, Bot } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <BedDouble className="h-8 w-8 text-primary" />
          <span className="text-2xl font-headline font-bold text-foreground">
            StayFinder
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/search">
              Search
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin/form-generator">
              <Bot className="mr-2" />
              AI Tools
            </Link>
          </Button>
          <Button>Sign In</Button>
        </nav>
      </div>
    </header>
  );
}
