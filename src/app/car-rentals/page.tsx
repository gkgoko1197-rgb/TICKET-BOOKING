
"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MapPin,
  Calendar as CalendarIcon,
  Search,
  ThumbsUp,
  Award,
  ShieldCheck,
  Star
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const searchSchema = z.object({
  pickupLocation: z.string().min(1, "Pick-up location is required"),
  differentDropoff: z.boolean(),
  dropoffLocation: z.string().optional(),
  pickupDate: z.date({ required_error: "Pick-up date is required" }),
  pickupTime: z.string({ required_error: "Pick-up time is required" }),
  dropoffDate: z.date({ required_error: "Drop-off date is required" }),
  dropoffTime: z.string({ required_error: "Drop-off time is required" }),
  age: z.string().optional(),
});

const faqs = [
    {
      question: "What do I need to rent a car?",
      answer: "To book your car, all you need is a credit or debit card. When you pick the car up, you'll need: Your voucher / eVoucher, to show that you've paid for the car. The main driver's credit / debit card, with enough available funds for the car's deposit. Each driver's full, valid driving license, which they've held for at least 12 months (often 24). Your passport and any other ID the car rental company needs to see.",
    },
    {
      question: "Can I book a rental car for someone else?",
      answer: "Yes, as long as they meet these requirements. Just fill in their details while you're making the reservation.",
    },
    {
      question: "How do I find the cheapest car rental deal?",
      answer: "We work with all the major international car rental brands (and lots of smaller local companies) to bring you a huge choice of cars at the very best prices. That's how we can find you cheap car rental deals at over 60,000 locations worldwide. To compare prices and find your ideal car at an unbeatable price, just use our search form.",
    },
    {
      question: "What should I look for when I'm choosing a car?",
      answer: "Space: You'll enjoy your rental far more if you choose a car with plenty of room for your passengers and luggage. Fuel policy: Not planning on driving much? A Like for like fuel policy can save you a lot of money. Location: You can't beat a car with an on-airport counter, but an off-airport counter with a shuttle bus can be much cheaper.",
    },
];

const whyBookWithUs = [
    { icon: <ThumbsUp />, title: "Free cancellation", description: "On most bookings, up to 48 hours before pick-up." },
    { icon: <ShieldCheck />, title: "No hidden fees", description: "Know exactly what you're paying." },
    { icon: <Star />, title: "Price Match Guarantee", description: "Found the same deal for less? We'll match the price." },
    { icon: <Award />, title: "Clean cars", description: "We're working with our partners to keep you safe." },
];

const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const formattedHour = hour.toString().padStart(2, '0');
    return `${formattedHour}:${minute}`;
});

const popularDestinations = [
    { name: 'El Segundo', locations: 103, price: 65, imageUrl: 'https://picsum.photos/seed/elsegundo/200/150', hint: 'cityscape' },
    { name: 'Dania Beach', locations: 92, price: 50, imageUrl: 'https://picsum.photos/seed/dania/200/150', hint: 'beach' },
    { name: 'Coolangatta', locations: 22, price: 58, imageUrl: 'https://picsum.photos/seed/coolangatta/200/150', hint: 'coastline' },
    { name: 'Phoenix', locations: 78, price: 70, imageUrl: 'https://picsum.photos/seed/phoenix/200/150', hint: 'city buildings' },
    { name: 'Jamaica', locations: 79, price: 85, imageUrl: 'https://picsum.photos/seed/jamaica/200/150', hint: 'tropical island' },
    { name: 'Irving', locations: 81, price: 62, imageUrl: 'https://picsum.photos/seed/irving/200/150', hint: 'modern city' },
    { name: 'Madrid', locations: 108, price: 52, imageUrl: 'https://picsum.photos/seed/madrid-car/200/150', hint: 'historic square' },
    { name: 'Calgary', locations: 46, price: 68, imageUrl: 'https://picsum.photos/seed/calgary/200/150', hint: 'city skyline' },
    { name: 'San Diego', locations: 87, price: 60, imageUrl: 'https://picsum.photos/seed/sandiego/200/150', hint: 'city waterfront' },
];


export default function CarRentalPage() {
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [showDriverAge, setShowDriverAge] = useState(true);
  
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      pickupLocation: "New York, NY",
      differentDropoff: false,
      pickupTime: '10:00',
      dropoffTime: '10:00',
      age: '30-65',
    },
  });

  function onSubmit(values: z.infer<typeof searchSchema>) {
    console.log(values);
    // Handle form submission
  }

  return (
    <div className="flex flex-col">
      <section className="relative bg-primary/90 text-white py-12 -mt-1">
        <Image
          src="https://picsum.photos/seed/car-hero/1920/600"
          alt="Car driving on a scenic road"
          fill
          className="object-cover object-center z-0 opacity-20"
          data-ai-hint="scenic road car"
        />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <h1 className="text-4xl font-headline font-bold mb-3">
            Car rental for any kind of trip
          </h1>
          <p className="text-lg mb-6">
            Compare deals from the biggest car rental companies
          </p>
          <Card>
            <CardContent className="p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pickupLocation"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel className="flex items-center gap-2 font-bold"><MapPin /> Pick-up location</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city, airport, or address" {...field} className="h-12"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="different-dropoff" onCheckedChange={(checked) => setDifferentDropoff(checked as boolean)} />
                    <Label htmlFor="different-dropoff">Drop car off at different location</Label>
                  </div>
                  {differentDropoff && (
                     <FormField
                        control={form.control}
                        name="dropoffLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 font-bold"><MapPin /> Drop-off location</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city, airport, or address" {...field} className="h-12"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="pickupDate"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Pick-up date</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button variant={"outline"} className="w-full justify-start text-left font-normal h-12">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? format(field.value, "MMM dd, yyyy") : <span>Pick a date</span>}
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} />
                                </PopoverContent>
                                </Popover>
                            </FormItem>
                            )}
                        />
                         <FormField
                          control={form.control}
                          name="pickupTime"
                          render={({ field }) => (
                            <FormItem>
                               <FormLabel className="font-bold text-white">.</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeOptions.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                       <div className="grid grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="dropoffDate"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Drop-off date</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button variant={"outline"} className="w-full justify-start text-left font-normal h-12">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? format(field.value, "MMM dd, yyyy") : <span>Pick a date</span>}
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < (form.getValues("pickupDate") || new Date())} />
                                </PopoverContent>
                                </Popover>
                            </FormItem>
                            )}
                        />
                         <FormField
                          control={form.control}
                          name="dropoffTime"
                          render={({ field }) => (
                             <FormItem>
                               <FormLabel className="font-bold text-white">.</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {timeOptions.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Checkbox id="driver-age" checked={showDriverAge} onCheckedChange={(checked) => setShowDriverAge(checked as boolean)} />
                     <Label htmlFor="driver-age">Driver's age is between 30 and 65</Label>
                  </div>
                  {!showDriverAge && (
                    <div className="max-w-xs">
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Driver's Age</FormLabel>
                                    <FormControl><Input placeholder="e.g. 25" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                  )}
                  <div className="pt-2">
                    <Button type="submit" className="w-full md:w-auto h-12 px-12 bg-accent text-lg">
                      <Search className="mr-2"/>
                      Search
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="bg-background">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyBookWithUs.map(item => (
                    <div key={item.title} className="flex items-start gap-4">
                        <div className="text-accent flex-shrink-0">{item.icon}</div>
                        <div>
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          <Separator className="my-12"/>

          <section className="mb-12">
            <h2 className="text-2xl font-headline font-bold mb-2">Popular car rental destinations</h2>
            <p className="text-muted-foreground mb-4">Explore more options to rent a car for cheap</p>
            <Tabs defaultValue="cities">
              <TabsList>
                <TabsTrigger value="cities">Cities worldwide</TabsTrigger>
                <TabsTrigger value="airports">Airports worldwide</TabsTrigger>
              </TabsList>
              <TabsContent value="cities" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                  {popularDestinations.map((dest) => (
                    <div key={dest.name} className="flex items-center gap-4">
                      <Image
                        src={dest.imageUrl}
                        alt={dest.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover w-20 h-20"
                        data-ai-hint={dest.hint}
                      />
                      <div>
                        <h4 className="font-semibold">{dest.name}</h4>
                        <p className="text-sm text-muted-foreground">{dest.locations} car rental locations</p>
                        <p className="text-sm">Average price of <span className="font-semibold text-primary">${dest.price.toFixed(2)}</span> per day</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-4 px-0">Show more</Button>
              </TabsContent>
              <TabsContent value="airports" className="mt-6">
                <p className="text-muted-foreground">Airport car rental information will be available soon.</p>
              </TabsContent>
            </Tabs>
          </section>

          <Separator className="my-12"/>
          
          <section className="mb-12">
             <h2 className="text-2xl font-headline font-bold mb-4">Frequently asked questions</h2>
             <Accordion type="single" collapsible className="w-full">
                {faqs.map(faq => (
                     <AccordionItem value={faq.question} key={faq.question}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                         {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
             </Accordion>
          </section>
        </div>
      </div>
    </div>
  );
}
