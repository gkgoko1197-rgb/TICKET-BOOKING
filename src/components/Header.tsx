import Link from "next/link";
import { Home, Plane, Car, Sparkles, Building, CircleHelp, Bell } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-headline font-bold">
              StayFinder
            </span>
          </Link>
          <div className="flex items-center gap-4">
              <Button variant="ghost" className="hover:bg-white/10">
                  <CircleHelp className="mr-2"/>
              </Button>
              <Button variant="ghost" className="hover:bg-white/10">
                  <Bell className="mr-2"/>
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">List your property</Button>
              <Button variant="secondary" className="bg-white text-primary hover:bg-gray-200">Register</Button>
              <Button variant="secondary" className="bg-white text-primary hover:bg-gray-200">Sign In</Button>
          </div>
        </div>
        <div className="pb-2">
              <nav className="flex items-center gap-2">
                  <Button variant="ghost" asChild className="hover:bg-white/10 rounded-full">
                      <Link href="/">
                          <Home className="mr-2" />
                          Home
                      </Link>
                  </Button>
                  <Button variant="ghost" asChild className="hover:bg-white/10 rounded-full">
                      <Link href="#">
                          <Plane className="mr-2" />
                          Flights
                      </Link>
                  </Button>
                  <Button variant="ghost" asChild className="hover:bg-white/10 rounded-full">
                      <Link href="#">
                          <Car className="mr-2" />
                          Car rentals
                      </Link>
                  </Button>
                  <Button variant="ghost" asChild className="hover:bg-white/10 rounded-full">
                      <Link href="#">
                          <Sparkles className="mr-2" />
                          Attractions
                      </Link>
                  </Button>
                  <Button variant="ghost" asChild className="hover:bg-white/10 rounded-full">
                      <Link href="#">
                          <Building className="mr-2" />
                          Airport taxis
                      </Link>
                  </Button>
              </nav>
          </div>
        </div>
    </header>
  );
}
