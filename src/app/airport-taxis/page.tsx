"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Calendar as CalendarIcon,
  Check,
  PlaneTakeoff,
  Users,
  ShieldCheck,
  CreditCard,
  ThumbsUp,
  MapPin,
  ArrowRight,
  Clock,
  Car,
  Phone,
  Building,
  ArrowDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const taxiSearchSchema = z.object({
    tripType: z.enum(["one-way", "return"]),
    from: z.string().min(1, "Pick-up location is required"),
    to: z.string().min(1, "Destination is required"),
    date: z.date({ required_error: "Date is required" }),
    time: z.string({ required_error: "Time is required" }),
    passengers: z.string().min(1, "Number of passengers is required"),
});

const features = [
    { icon: <PlaneTakeoff className="w-10 h-10 text-primary" />, title: "Flight tracking", description: "Your driver tracks your flight and waits for you if it's delayed." },
    { icon: <CreditCard className="w-10 h-10 text-primary" />, title: "One clear price", "description": "Your price is confirmed upfront - no extra costs, no cash required." },
    { icon: <ThumbsUp className="w-10 h-10 text-primary" />, title: "Tried and trusted", "description": "We work with professional drivers and have 24/7 customer care." },
];

const howItWorks = [
    { icon: <Car />, title: "Booking your airport taxi", description: "Confirmation is immediate. If your plans change, you can cancel for free up to 24 hours before your scheduled pick-up time." },
    { icon: <Phone />, title: "Meeting your driver", description: "You'll be met on arrival and taken to your vehicle. Your driver will track your flight, so they'll wait for you even if it's delayed." },
    { icon: <Building />, title: "Arriving at your destination", description: "Get to your destination quickly and safely - no waiting in line for a taxi, no figuring out public transport." },
]

const taxiTypes = [
    { 
        type: "Standard", 
        description: "Skoda Octavia or similar",
        features: ["3 passengers", "2 standard bags", "Meet & Greet included", "Free cancellation"]
    },
    { 
        type: "Executive", 
        description: "Mercedes-Benz E-Class or similar",
        features: ["3 passengers", "2 standard bags", "Meet & Greet included", "Free cancellation"]
    }
];

const faqs = [
    { q: "What happens if my flight is early or delayed?", a: "Your driver will track your flight and adjust the pick-up time accordingly. There's no need to worry about waiting or missing your ride." },
    { q: "What's included in the price?", a: "The price includes the ride, all taxes, and a meet and greet service. Gratuity is optional." },
    { q: "How do I pay?", a: "Payment is handled online at the time of booking, so you don't need to worry about cash or card payments in the vehicle." },
    { q: "Can I cancel my booking?", a: "Yes, you can cancel for free up to 24 hours before your scheduled pick-up time. For cancellations within 24 hours, a fee may apply." },
];

const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const formattedHour = hour.toString().padStart(2, '0');
    return `${formattedHour}:${minute}`;
});

export default function AirportTaxisPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof taxiSearchSchema>>({
        resolver: zodResolver(taxiSearchSchema),
        defaultValues: {
            tripType: "one-way",
            from: "",
            to: "",
            time: "12:00",
            passengers: "1",
        },
    });

    function onSearch(data: z.infer<typeof taxiSearchSchema>) {
        console.log(data);
        toast({
            title: "Search Submitted",
            description: "Taxi search functionality is not yet implemented.",
        });
    }

    return (
        <div className="bg-gray-50">
            <div className="bg-background">
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <h1 className="text-3xl font-bold mb-2">Find the right ride for your trip</h1>
                    <p className="text-muted-foreground mb-6">Easy airport transfers to and from your accommodation</p>
                    
                    <Card className="shadow-md border-yellow-400 border-2">
                        <CardContent className="p-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSearch)} className="space-y-4">
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
                                                    <FormControl><RadioGroupItem value="one-way" /></FormControl>
                                                    <FormLabel className="font-normal">One-way</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl><RadioGroupItem value="return" /></FormControl>
                                                    <FormLabel className="font-normal">Return</FormLabel>
                                                </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 items-end">
                                        <FormField control={form.control} name="from" render={({ field }) => (
                                            <FormItem><FormLabel>From pick-up location</FormLabel><FormControl><Input placeholder="e.g. Airport or Address" {...field} /></FormControl></FormItem>
                                        )} />
                                        <FormField control={form.control} name="to" render={({ field }) => (
                                            <FormItem><FormLabel>To drop-off destination</FormLabel><FormControl><Input placeholder="e.g. Hotel or Address" {...field} /></FormControl></FormItem>
                                        )} />
                                        <div className="grid grid-cols-2 gap-2">
                                            <FormField control={form.control} name="date" render={({ field }) => (
                                                <FormItem><FormLabel>Date</FormLabel>
                                                <Popover><PopoverTrigger asChild><FormControl>
                                                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "MMM dd") : <span>Pick a date</span>}
                                                    </Button>
                                                </FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} /></PopoverContent></Popover>
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="time" render={({ field }) => (
                                                <FormItem><FormLabel>Time</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                                <SelectContent>{timeOptions.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></FormItem>
                                            )} />
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                            <FormField control={form.control} name="passengers" render={({ field }) => (
                                                <FormItem><FormLabel>Passengers</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><Users className="mr-2"/><SelectValue /></SelectTrigger></FormControl>
                                                <SelectContent>{Array.from({length: 8}, (_,i)=>i+1).map(p => <SelectItem key={p} value={String(p)}>{p}</SelectItem>)}</SelectContent></Select></FormItem>
                                            )} />
                                            <Button type="submit" className="w-full lg:w-auto self-end">Search</Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                        {features.map(f => (
                            <div key={f.title} className="flex items-start gap-4">
                                {f.icon}
                                <div>
                                    <h3 className="font-bold">{f.title}</h3>
                                    <p className="text-muted-foreground text-sm">{f.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold">Airport transfers made easy</h2>
                    <p className="text-muted-foreground">How does it work?</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-transparent hidden md:block" aria-hidden="true">
                        <div className="relative w-full h-full">
                            <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-gray-300"></div>
                        </div>
                    </div>
                    {howItWorks.map((step, index) => (
                        <div key={step.title} className="text-center relative bg-gray-50 px-4">
                            <div className="inline-block bg-primary-foreground p-4 rounded-full border mb-4">
                               {step.icon}
                            </div>
                            <h3 className="font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-background">
                <div className="container mx-auto px-4 py-12 max-w-5xl">
                    <h2 className="text-2xl font-bold mb-4">Airport taxis for any kind of trip</h2>
                     <div className="grid md:grid-cols-2 gap-6">
                        {taxiTypes.map(type => (
                            <Card key={type.type}>
                                <CardHeader><CardTitle>{type.type}</CardTitle><p className="text-muted-foreground text-sm">{type.description}</p></CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                    {type.features.map(f => (
                                        <li key={f} className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-600" /> {f}</li>
                                    ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl">
                 <h2 className="text-2xl font-bold mb-4">Find out more about our airport taxi service</h2>
                 <p className="text-muted-foreground mb-6">See more FAQs on our <a href="#" className="text-primary underline">help page</a></p>
                 <div className="grid md:grid-cols-2 gap-4">
                     <Accordion type="single" collapsible className="w-full">
                        {faqs.slice(0, 2).map(faq => (
                            <AccordionItem value={faq.q} key={faq.q} className="bg-background px-4 rounded-md">
                                <AccordionTrigger>{faq.q}</AccordionTrigger>
                                <AccordionContent>{faq.a}</AccordionContent>
                            </AccordionItem>
                        ))}
                     </Accordion>
                     <Accordion type="single" collapsible className="w-full">
                        {faqs.slice(2).map(faq => (
                             <AccordionItem value={faq.q} key={faq.q} className="bg-background px-4 rounded-md">
                                <AccordionTrigger>{faq.q}</AccordionTrigger>
                                <AccordionContent>{faq.a}</AccordionContent>
                            </AccordionItem>
                        ))}
                     </Accordion>
                 </div>
            </div>
        </div>
    )
}
