
"use client";

import { useBooking } from "@/context/BookingContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Plane, BedDouble, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export default function BookingsSidebar() {
  const { isSidebarOpen, setSidebarOpen, bookings, markAsViewed, removeBooking } = useBooking();
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    setSidebarOpen(open);
    if (!open) {
      markAsViewed();
    }
  };

  const handleCancelBooking = (bookingId: string, title: string) => {
    removeBooking(bookingId);
    toast({
        title: "Booking Cancelled",
        description: `Your booking for ${title} has been cancelled.`,
        variant: "destructive"
    })
  }

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
                    <div className="flex-grow">
                        <CardTitle className="text-lg">{booking.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Booked on: {format(new Date(booking.date), "PPP")}
                        </p>
                    </div>
                    <p className="text-lg font-bold text-primary">${booking.price}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">{booking.details}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Button variant="destructive" size="sm" className="w-full" onClick={() => handleCancelBooking(booking.id, booking.title)}>
                        <X className="mr-2"/>
                        Cancel Booking
                    </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
