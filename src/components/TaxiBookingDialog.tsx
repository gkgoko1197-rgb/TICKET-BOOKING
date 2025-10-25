
"use client";

import { useState } from "react";
import { TaxiDriver } from "@/lib/taxis";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Phone, Star, User, Car, X, Check, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

interface TaxiBookingDialogProps {
    drivers: TaxiDriver[];
    bookingDetails: { from: string; to: string } | null;
    onConfirm: (driver: TaxiDriver) => void;
    bookingType: 'car' | 'taxi';
}

export default function TaxiBookingDialog({ drivers: initialDrivers, bookingDetails, onConfirm, bookingType }: TaxiBookingDialogProps) {
    const { toast } = useToast();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleConfirm = (driver: TaxiDriver) => {
        toast({
            title: "Booking Confirmed!",
            description: `You have booked a ${bookingType} with ${driver.name}.`,
        });
        onConfirm(driver);
        showNextDriver();
    };

    const handleReject = (driver: TaxiDriver) => {
        toast({
            title: "Driver Rejected",
            description: `${driver.name} has been removed from the list.`,
            variant: "destructive"
        });
        showNextDriver();
    };

    const showNextDriver = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const currentDriver = initialDrivers[currentIndex];

    if (!currentDriver) {
        return (
            <div className="text-center text-muted-foreground py-10 flex flex-col items-center justify-center min-h-[150px]">
                <p>No more available drivers match your criteria.</p>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full">
                <Card key={currentDriver.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={currentDriver.imageUrl} alt={currentDriver.name} data-ai-hint="driver portrait" />
                            <AvatarFallback>{currentDriver.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <h4 className="font-bold text-lg">{currentDriver.name}</h4>
                            <p className="text-sm text-muted-foreground">{currentDriver.company}</p>
                            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm mt-1">
                                <span className="flex items-center gap-1"><Car size={14} /> {currentDriver.car.make} {currentDriver.car.model} ({currentDriver.car.plate})</span>
                                <span className="flex items-center gap-1"><User size={14} /> Age: {currentDriver.age}</span>
                                <span className="flex items-center gap-1"><Phone size={14} /> {currentDriver.phone}</span>
                                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-current" /> {currentDriver.rating.toFixed(1)}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleConfirm(currentDriver)}>
                                <Check size={16} />
                                Confirm
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(currentDriver)}>
                                <X size={16} />
                                Reject
                            </Button>
                        </div>
                    </CardContent>
                    {bookingDetails && (
                        <>
                        <Separator />
                        <CardContent className="p-4 text-sm">
                            <div className="flex items-center gap-2">
                                <MapPin className="text-muted-foreground" size={16} />
                                <span className="font-semibold">From:</span>
                                <span>{bookingDetails.from}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <MapPin className="text-muted-foreground" size={16} />
                                <span className="font-semibold">To:</span>
                                <span>{bookingDetails.to}</span>
                            </div>
                        </CardContent>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}
