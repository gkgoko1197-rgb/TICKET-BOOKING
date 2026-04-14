
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { useBooking } from "@/context/BookingContext";
import { MapPin, Bed, DollarSign, Check, Loader2, User, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const hotels = [
    { name: "The Ritz-Carlton", rooms: 5, price: 450 },
    { name: "Four Seasons Hotel", rooms: 3, price: 550 },
    { name: "The St. Regis", rooms: 8, price: 650 }
];

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
    const [step, setStep] = useState<'selection' | 'details'>('selection');
    
    // Form state for personal details
    const [personalInfo, setPersonalInfo] = useState({
        fullName: "",
        email: ""
    });

    const handleSelectHotel = (hotel: (typeof hotels)[0]) => {
        setSelectedHotel(hotel);
        setStep('details');
    };
    
    const handleConfirmBooking = async () => {
        if (!selectedHotel) return;
        
        if (!personalInfo.fullName || !personalInfo.email) {
            toast({
                title: "Information missing",
                description: "Please provide your name and email to proceed.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        addBooking({
            id: `acc-${Date.now()}`,
            type: 'accommodation',
            title: selectedHotel.name,
            details: `Booked for ${personalInfo.fullName} in ${destination}`,
            date: new Date().toISOString(),
            price: selectedHotel.price * parseInt(selectedRoom, 10),
        });

        setIsLoading(false);
        toast({
            title: "Booking Confirmed!",
            description: `Successfully booked ${selectedHotel.name}. Confirmation sent to ${personalInfo.email}.`,
        });
        onBookingSuccess();
    };

    if (step === 'details' && selectedHotel) {
        return (
            <div className="space-y-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-xl">{selectedHotel.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                            <MapPin size={14}/> {destination}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <span className="text-muted-foreground block">Price per night</span>
                                <span className="font-bold text-lg">${selectedHotel.price}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-muted-foreground block">Select rooms</span>
                                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                                    <SelectTrigger className="w-full h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({length: selectedHotel.rooms}, (_, i) => i + 1).map(num => (
                                            <SelectItem key={num} value={String(num)}>{num} room{num > 1 ? 's' : ''}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Separator className="my-2" />

                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                                <User size={16} className="text-primary" /> Personal Information
                            </h4>
                            <div className="grid gap-2">
                                <Label htmlFor="full-name" className="text-xs">Full Name</Label>
                                <Input 
                                    id="full-name" 
                                    placeholder="Enter your full name" 
                                    value={personalInfo.fullName}
                                    onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs">Email Address</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={personalInfo.email}
                                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 pt-2">
                        <div className="flex items-baseline justify-between w-full">
                            <span className="text-sm text-muted-foreground">Total Price:</span>
                            <span className="text-2xl font-bold text-primary">
                                ${selectedHotel.price * parseInt(selectedRoom, 10)}
                            </span>
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleConfirmBooking} disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : <><Check className="mr-2"/> Confirm My Booking</>}
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full" onClick={() => setStep('selection')}>
                            Back to Hotel List
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <p className="text-sm text-muted-foreground mb-2">Available hotels in {destination}:</p>
            {hotels.map(hotel => (
                <Card key={hotel.name} className="hover:border-primary transition-colors">
                    <CardContent className="p-4 flex justify-between items-center">
                        <div className="space-y-1">
                            <h4 className="font-bold">{hotel.name}</h4>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><Bed size={12}/> {hotel.rooms} rooms</span>
                                <span className="flex items-center gap-1"><DollarSign size={12}/> ${hotel.price}/night</span>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleSelectHotel(hotel)}>
                            Select
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function Separator({ className }: { className?: string }) {
    return <div className={`h-[1px] w-full bg-border ${className}`} />;
}
