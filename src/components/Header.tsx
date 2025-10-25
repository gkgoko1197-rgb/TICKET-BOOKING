
"use client";

import Link from "next/link";
import { Home, Plane, Car, Sparkles, Building, CircleHelp, Bell, Ticket } from "lucide-react";
import { Button } from "./ui/button";
import { useBooking } from "@/context/BookingContext";
import BookingsSidebar from "./BookingsSidebar";

export default function Header() {
  const { setSidebarOpen, hasNewBookings } = useBooking();

  return (
    <>
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
              <Button 
                variant="outline" 
                className="relative bg-transparent border-white text-white hover:bg-white hover:text-primary"
                onClick={() => setSidebarOpen(true)}
              >
                <Ticket className="mr-2"/>
                My Bookings
                {hasNewBookings && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                    </span>
                )}
              </Button>
              <Button variant="secondary" asChild className="bg-white text-primary hover:bg-gray-200">
                <Link href="/signin">Register</Link>
              </Button>
              <Button variant="secondary" asChild className="bg-white text-primary hover:bg-gray-200">
                <Link href="/signin">Sign In</Link>
              </Button>
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
                      <Link href="/flights">
                          <Plane className="mr-2" />
                          Flights
                      </Link>
                  </Button>
                  <Button variant="ghost" asChild className="hover-bg-white/10 rounded-full">
                      <Link href="/car-rentals">
                          <Car className="mr-2" />
                          Car rentals
                      </Link>
                  </Button>
                  <Button variant="ghost" asChild className="hover-bg-white/10 rounded-full">
                      <Link href="/attractions">
                          <Sparkles className="mr-2" />
                          Attractions
                      </Link>
                  </Button>
                  <Button variant="ghost" asChild className="hover-bg-white/10 rounded-full">
                      <Link href="/airport-taxis">
                          <Building className="mr-2" />
                          Airport taxis
                      </Link>
                  </Button>
              </nav>
          </div>
        </div>
    </header>
    <BookingsSidebar />
    </>
  );
}
