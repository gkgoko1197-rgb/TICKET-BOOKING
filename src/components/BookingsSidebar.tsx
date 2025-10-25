
"use client";

import { useBooking } from "@/context/BookingContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Plane, BedDouble } from "lucide-react";
import { format } from "date-fns";

export default function BookingsSidebar() {
  const { isSidebarOpen, setSidebarOpen, bookings, markAsViewed } = useBooking();

  const handleOpenChange = (open: boolean) => {
    setSidebarOpen(open);
    if (!open) {
      markAsViewed();
    }
  };

  return (
    <Sheet open={isSidebarOpen} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Bookings</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-4">
          {bookings.length === 0 ? (
            <p className="text-muted-foreground text-center">You have no bookings yet.</p>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                    {booking.type === 'flight' ? <Plane /> : <BedDouble />}
                    <CardTitle className="text-lg">{booking.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">{booking.details}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Booked on: {format(new Date(booking.date), "PPP")}
                    </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
