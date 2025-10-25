
"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const bookingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.coerce.number().min(1, "Age is required"),
  phoneNumber: z.string().min(10, "A valid phone number is required"),
  email: z.string().email("A valid email is required"),
  flightName: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  from: z.string(),
  to: z.string(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface FlightBookingFormProps {
  flightName: string;
  from: string;
  to: string;
  onBookingSuccess: () => void;
}

export default function FlightBookingForm({ flightName, from, to, onBookingSuccess }: FlightBookingFormProps) {
  const { toast } = useToast();
  const { addBooking } = useBooking();
  const [isLoading, setIsLoading] = useState(false);
  
  const price = useMemo(() => Math.floor(Math.random() * (750 - 250 + 1)) + 250, [flightName, from, to]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      phoneNumber: "",
      email: "",
      flightName: flightName,
      departureTime: "08:00 AM",
      arrivalTime: "10:30 AM",
      from,
      to,
    },
  });

  async function onSubmit(data: BookingFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addBooking({
      id: `flt-${Date.now()}`,
      type: 'flight',
      title: data.flightName,
      details: `From ${data.from} to ${data.to}`,
      date: new Date().toISOString(),
      price: price
    });

    setIsLoading(false);
    
    toast({
      title: "Booking Successful!",
      description: `Your seat on ${data.flightName} has been confirmed.`,
    });
    onBookingSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                    <Input placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        
        <div className="space-y-4 rounded-md bg-muted p-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold">Flight Details</h4>
            <div className="text-lg font-bold text-primary">${price}</div>
          </div>
           <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="flightName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flight</FormLabel>
                <FormControl>
                  <Input readOnly {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="departureTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="arrivalTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Confirm Booking
        </Button>
      </form>
    </Form>
  );
}
