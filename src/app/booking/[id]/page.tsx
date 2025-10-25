
"use client";

import { accommodations } from "@/lib/data";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useBooking } from "@/context/BookingContext";

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  paymentMethod: z.enum(["credit-card", "paypal"]),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
}).refine(data => {
    if (data.paymentMethod === 'credit-card') {
        return (
            z.string().min(2, { message: "Name on card is required." }).safeParse(data.cardName).success &&
            z.string().refine((val) => /^\d{16}$/.test(val), { message: "Card number must be 16 digits." }).safeParse(data.cardNumber).success &&
            z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), { message: "Expiry date must be in MM/YY format." }).safeParse(data.expiryDate).success &&
            z.string().refine((val) => /^\d{3,4}$/.test(val), { message: "CVC must be 3 or 4 digits." }).safeParse(data.cvc).success
        )
    }
    return true;
}, {
    message: "Credit card details are required.",
    path: ["cardName"], // you can specify which field to show the error on, or a general one
});


type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const { addBooking } = useBooking();
  const [isLoading, setIsLoading] = useState(false);
  const accommodation = accommodations.find((acc) => acc.id === params.id);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      paymentMethod: "credit-card",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  if (!accommodation) {
    notFound();
  }

  async function onSubmit(data: BookingFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addBooking({
      id: `acc-${Date.now()}`,
      type: 'accommodation',
      title: accommodation.name,
      details: `${accommodation.location.city}`,
      date: new Date().toISOString(),
      price: accommodation.price,
    });

    setIsLoading(false);
    toast({
      title: "Booking Confirmed!",
      description: `Your stay at ${accommodation.name} has been booked.`,
    });
    router.push("/search");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-headline font-bold mb-8 text-center">Confirm your booking</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Stay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={accommodation.images[0].url}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                  data-ai-hint={accommodation.images[0].hint}
                />
              </div>
              <h2 className="text-xl font-semibold">{accommodation.name}</h2>
              <p className="text-muted-foreground">{accommodation.location.city}</p>
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Price</span>
                  <span className="text-xl font-bold text-primary">${accommodation.price}</span>
                </div>
                <p className="text-sm text-muted-foreground text-right">for 1 night</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Contact & Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-4 mt-4">
                     <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><CreditCard /> Payment Method</h3>
                     <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4"
                                    >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="credit-card" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Credit Card
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="paypal" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        PayPal
                                        </FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                     
                     {paymentMethod === 'credit-card' && (
                        <div className="space-y-4 mt-4">
                            <FormField
                                control={form.control}
                                name="cardName"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name on Card</FormLabel>
                                    <FormControl><Input placeholder="John M Doe" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl><Input placeholder="0000 0000 0000 0000" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="expiryDate"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expiry</FormLabel>
                                        <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cvc"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CVC</FormLabel>
                                        <FormControl><Input placeholder="123" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                     )}
                     {paymentMethod === 'paypal' && (
                        <div className="mt-4 flex items-center justify-center bg-gray-100 p-6 rounded-md">
                            <p className="text-muted-foreground">PayPal checkout coming soon.</p>
                        </div>
                     )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6" disabled={isLoading || paymentMethod === 'paypal'}>
                    {isLoading ? <Loader2 className="animate-spin" /> : "Complete Booking"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
