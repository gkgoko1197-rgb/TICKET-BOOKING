
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  Plane,
  ArrowLeftRight,
  Calendar as CalendarIcon,
  Users,
  Search,
  Plus,
  Minus,
  Check,
  Star,
  ShieldCheck,
  Headset,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FlightBookingForm from "@/components/FlightBookingForm";
import { useSearchParams } from "next/navigation";


const flightSearchSchema = z.object({
  tripType: z.enum(["return", "one-way"]),
  from: z.string().min(1, "Origin is required"),
  to: z.string().min(1, "Destination is required"),
  dates: z.object({
    from: z.date({ required_error: "Departure date is required" }),
    to: z.date().optional(),
  }),
  adults: z.number().min(1),
  children: z.number().min(0),
  directOnly: z.boolean(),
});

const whyBookWithUs = [
    { icon: <Star />, title: "Find great-value flights", description: "Search all the big names, plus any low-cost carriers and travel specialists." },
    { icon: <ShieldCheck />, title: "No hidden fees", description: "The price you see is the price you pay. No sneaky extras." },
    { icon: <Headset />, title: "Flexible options", description: "Compare flights with flexible tickets, so you won’t lose out if your plans change." },
];

const popularDestinations = [
    { name: 'London', imageUrl: 'https://picsum.photos/seed/london-flight/400/300', hint: 'London city' },
    { name: 'Paris', imageUrl: 'https://picsum.photos/seed/paris-flight/400/300', hint: 'Eiffel Tower' },
    { name: 'New York', imageUrl: 'https://picsum.photos/seed/ny-flight/400/300', hint: 'New York skyline' },
    { name: 'Tokyo', imageUrl: 'https://picsum.photos/seed/tokyo-flight/400/300', hint: 'Tokyo street' },
    { name: 'Dubai', imageUrl: 'https://picsum.photos/seed/dubai-flight/400/300', hint: 'Dubai desert' },
    { name: 'Singapore', imageUrl: 'https://picsum.photos/seed/singapore-flight/400/300', hint: 'Singapore city' },
];

const faqs = [
    {
      question: "How do I find the cheapest flights?",
      answer: "The easiest way is to use our search engine. Just enter where you want to go and when, and we'll show you the cheapest, quickest and best-value flights. You can also set up Price Alerts to be notified when fares change for your chosen route.",
    },
    {
      question: "Can I book a one-way flight?",
      answer: "Yes, you can. Just select 'one-way' on our search form before you hit search.",
    },
    {
      question: "Which cities have direct flights from my location?",
      answer: "To see which airlines fly direct from your location, just enter your departure point and we'll show you all your options – both direct and indirect.",
    },
];

const flightNames = [
    "AeroWing Swift", "SkyLiner Express", "StarJet Voyager", "Quantum Airlines",
    "Velocity Air", "Celestial Ways", "Horizon Wings", "Nimbus Airways",
    "Apex Flights", "Solaris Express", "Azure Airlines", "Pinnacle Jet",
    "Equinox Air", "Orion Flights", "Meridian Airways", "Terra Jet",
    "Galaxy Wings", "Phoenix Air", "Stratus Flights", "Odyssey Airlines"
];

function FlightPageContent() {
  const searchParams = useSearchParams();
  const fromLocation = searchParams.get('from');

  const [isClient, setIsClient] = useState(false);
  const [randomFlight, setRandomFlight] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof flightSearchSchema>>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: {
      tripType: "return",
      from: fromLocation || "New York (NYC)",
      to: "",
      adults: 1,
      children: 0,
      directOnly: false,
    },
  });

  const tripType = form.watch("tripType");
  const fromValue = form.watch("from");
  const toValue = form.watch("to");

  const handleBookNowClick = () => {
    const randomIndex = Math.floor(Math.random() * flightNames.length);
    setRandomFlight(flightNames[randomIndex]);
    setIsDialogOpen(true);
  };


  const handleSwap = () => {
    const from = form.getValues("from");
    const to = form.getValues("to");
    form.setValue("from", to);
    form.setValue("to", from);
  };

  return (
    <div className="flex flex-col">
      <section className="relative bg-primary/90 text-white py-12 -mt-1">
        <Image
          src="https://picsum.photos/seed/flights-hero/1920/600"
          alt="Airplane wing in the sky"
          fill
          className="object-cover object-center z-0 opacity-20"
          data-ai-hint="airplane sky"
        />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <h1 className="text-4xl font-headline font-bold mb-3">
            Compare and book flights with ease
          </h1>
          <p className="text-lg mb-6">
            Discover your next destination
          </p>
          <Card>
            <CardContent className="p-4">
              <Form {...form}>
                <form className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <FormField
                        control={form.control}
                        name="tripType"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4"
                                    >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="return" id="return"/>
                                        </FormControl>
                                        <FormLabel htmlFor="return" className="font-normal">Return</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="one-way" id="one-way"/>
                                        </FormControl>
                                        <FormLabel htmlFor="one-way" className="font-normal">One-way</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    <FormField
                      control={form.control}
                      name="from"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormControl>
                            <div className="relative">
                                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="From" {...field} className="h-12 pl-10" />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                     <Button type="button" variant="ghost" size="icon" className="hidden md:block self-center mx-auto h-10 w-10 bg-white hover:bg-white" onClick={handleSwap}>
                        <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                     </Button>
                    <FormField
                      control={form.control}
                      name="to"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormControl>
                             <div className="relative">
                                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="To" {...field} className="h-12 pl-10"/>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="dates"
                    render={({ field }) => (
                        <FormItem className="md:col-span-1">
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={"w-full justify-start text-left font-normal h-12"}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value?.from ? (
                                    tripType === 'return' && field.value.to ? (
                                    <>
                                        {format(field.value.from, "MMM dd")} - {format(field.value.to, "MMM dd")}
                                    </>
                                    ) : format(field.value.from, "MMM dd, yyyy")
                                ) : (
                                    <span>Select dates</span>
                                )}
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode={tripType === 'return' ? 'range' : 'single'}
                                selected={field.value}
                                onSelect={field.onChange}
                                numberOfMonths={tripType === 'return' ? 2 : 1}
                                disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                            />
                            </PopoverContent>
                        </Popover>
                        </FormItem>
                    )}
                    />
                     <div className="md:col-span-1">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start font-normal h-12">
                                <Users className="mr-2 h-4 w-4" />
                                <div>
                                    {form.watch("adults")} Adult{form.watch("adults") > 1 && 's'}
                                    {form.watch("children") > 0 && `, ${form.watch("children")} Child${form.watch("children") > 1 && 'ren'}`}
                                </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Passengers</h4>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label>Adults</Label>
                                        <div className="col-span-2 flex items-center justify-end gap-2">
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => form.setValue("adults", Math.max(1, form.getValues("adults") - 1))}>
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span>{form.watch("adults")}</span>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => form.setValue("adults", form.getValues("adults") + 1)}>
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label>Children</Label>
                                        <div className="col-span-2 flex items-center justify-end gap-2">
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => form.setValue("children", Math.max(0, form.getValues("children") - 1))}>
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span>{form.watch("children")}</span>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => form.setValue("children", form.getValues("children") + 1)}>
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                     </div>
                     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button type="button" className="h-12 w-full md:w-auto text-lg bg-accent hover:bg-accent/90" onClick={handleBookNowClick}>
                                <Search className="mr-2"/>
                                Book Now
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Book your flight</DialogTitle>
                            </DialogHeader>
                            {isClient && randomFlight && <FlightBookingForm flightName={randomFlight} from={fromValue} to={toValue} onBookingSuccess={() => setIsDialogOpen(false)} />}
                        </DialogContent>
                    </Dialog>
                  </div>
                  <FormField
                    control={form.control}
                    name="directOnly"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 pt-2">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} id="direct-flights"/>
                            </FormControl>
                            <Label htmlFor="direct-flights" className="font-normal">Direct flights only</Label>
                        </FormItem>
                    )}
                    />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="bg-background">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <h2 className="text-2xl font-headline font-bold mb-4">Explore places near and far</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularDestinations.map((dest) => (
                 <a href="#" key={dest.name} className="group">
                    <Card className="overflow-hidden">
                        <div className="relative aspect-[4/3]">
                            <Image src={dest.imageUrl} alt={dest.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={dest.hint} />
                        </div>
                    </Card>
                    <h3 className="font-semibold mt-2 group-hover:text-primary">{dest.name}</h3>
                 </a>
              ))}
            </div>
          </section>

          <Separator className="my-12"/>

          <section>
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

export default function FlightsPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <FlightPageContent />
        </React.Suspense>
    )
}
