
"use client";

import { useState } from "react";
import { TaxiDriver } from "@/lib/taxis";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Phone, Star, User, Car, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";


interface TaxiBookingDialogProps {
    drivers: TaxiDriver[];
}

export default function TaxiBookingDialog({ drivers: initialDrivers }: TaxiBookingDialogProps) {
    const { toast } = useToast();
    const [drivers, setDrivers] = useState(initialDrivers);

    const handleConfirm = (driver: TaxiDriver) => {
        toast({
            title: "Booking Confirmed!",
            description: `You have booked a ride with ${driver.name}.`,
        });
        // Remove the confirmed driver from the list
        setDrivers(drivers.filter(d => d.id !== driver.id));
    };

    const handleReject = (driver: TaxiDriver) => {
        toast({
            title: "Driver Rejected",
            description: `${driver.name} has been removed from the list.`,
            variant: "destructive"
        });
        // Remove the rejected driver from the list
        setDrivers(drivers.filter(d => d.id !== driver.id));
    };

    if (drivers.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-10">
                <p>No available drivers match your criteria.</p>
            </div>
        )
    }

    return (
        <ScrollArea className="h-[60vh]">
            <div className="space-y-4 p-1">
                {drivers.map(driver => (
                    <Card key={driver.id}>
                        <CardContent className="p-4 flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${driver.id}`} alt={driver.name} />
                                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <h4 className="font-bold text-lg">{driver.name}</h4>
                                <p className="text-sm text-muted-foreground">{driver.company}</p>
                                <div className="flex items-center gap-4 text-sm mt-1">
                                    <span className="flex items-center gap-1"><Car size={14} /> {driver.car.make} {driver.car.model} ({driver.car.plate})</span>
                                    <span className="flex items-center gap-1"><User size={14} /> Age: {driver.age}</span>
                                    <span className="flex items-center gap-1"><Phone size={14} /> {driver.phone}</span>
                                    <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-current" /> {driver.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleConfirm(driver)}>
                                    <Check size={16} />
                                    Confirm
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleReject(driver)}>
                                    <X size={16} />
                                    Reject
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}

    