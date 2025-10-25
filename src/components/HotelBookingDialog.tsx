
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { useBooking } from "@/context/BookingContext";
import { MapPin, Bed, DollarSign, Check, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const hotels = [
    { name: "The Ritz-Carlton", rooms: 5, price: 450 },
    { name: "Four Seasons Hotel", rooms: 3, price: 550 },
    { name: "The St. Regis", rooms: 8, price: 650 }
]

interface HotelBookingDialogProps {
    destination: string;
    onBookingSuccess: () => void;
}

export default function HotelBookingDialog({ destination, onBookingSuccess }: HotelBookingDialogProps) {
    const { toast } = useToast();
    const { addBooking } = useBooking();
    const [selectedHotel, setSelectedHotel] = useState<(typeof hotels)[0] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<string>("1");

    const handleSelectHotel = (hotel: (typeof hotels)[0]) => {
        setSelectedHotel(hotel);
    }
    
    const handleConfirmBooking = async () => {
        if (!selectedHotel) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        addBooking({
            id: `acc-${Date.now()}`,
            type: 'accommodation',
            title: selectedHotel.name,
            details: `${destination}`,
            date: new Date().toISOString(),
            price: selectedHotel.price * parseInt(selectedRoom, 10),
        });

        setIsLoading(false);
        toast({
            title: "Booking Confirmed!",
            description: `Your stay at ${selectedHotel.name} has been booked.`,
        });
        onBookingSuccess();
    }


    if (selectedHotel) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{selectedHotel.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2"><MapPin size={14}/> {destination}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold flex items-center gap-2"><Bed/> Rooms available:</span>
                        <span className="font-bold">{selectedHotel.rooms}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="font-semibold flex items-center gap-2"><DollarSign/> Price per room:</span>
                        <span className="font-bold">${selectedHotel.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                         <span className="font-semibold">Select rooms:</span>
                        <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({length: selectedHotel.rooms}, (_, i) => i + 1).map(num => (
                                    <SelectItem key={num} value={String(num)}>{num} room{num > 1 ? 's' : ''}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                     <div className="flex items-baseline justify-end w-full gap-2">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="text-2xl font-bold text-primary">${selectedHotel.price * parseInt(selectedRoom, 10)}</span>
                    </div>
                    <Button className="w-full" onClick={handleConfirmBooking} disabled={isLoading}>
                         {isLoading ? <Loader2 className="animate-spin" /> : <><Check className="mr-2"/> Confirm Booking</>}
                    </Button>
                    <Button variant="link" onClick={() => setSelectedHotel(null)}>Back to list</Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <div className="space-y-3">
            {hotels.map(hotel => (
                <Card key={hotel.name}>
                    <CardContent className="p-4 flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold">{hotel.name}</h4>
                            <p className="text-sm text-muted-foreground">{hotel.rooms} rooms available</p>
                        </div>
                        <Button onClick={() => handleSelectHotel(hotel)}>Select</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
