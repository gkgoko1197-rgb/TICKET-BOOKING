
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCircle,
  Car,
  ChevronRight,
  Headphones,
  Home,
  LifeBuoy,
  MessageSquare,
  Plane,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const faqItems = [
  {
    category: 'stays',
    title: 'Cancellations',
    content:
      'You can cancel your booking through the link in your confirmation email or by logging into your account. Cancellation policies vary by property, so please check your booking confirmation for details.',
  },
  {
    category: 'stays',
    title: 'Payment',
    content:
      'We accept various payment methods, including credit/debit cards and PayPal. Your payment information is always secure.',
  },
  {
    category: 'stays',
    title: 'Booking details',
    content:
      'You can view your booking details by clicking the link in your confirmation email or by accessing the "My Bookings" section on our website.',
  },
  {
    category: 'stays',
    title: 'Communications',
    content:
      'All communications regarding your booking will be sent to the email address you provided. You can also contact the property directly through our messaging service.',
  },
  {
    category: 'stays',
    title: 'Room types',
    content:
      'Details about room types, including amenities and occupancy, can be found on the property page during the booking process.',
  },
  {
    category: 'stays',
    title: 'Pricing',
    content:
      'The price shown includes all taxes and fees unless stated otherwise. Any additional charges from the property will be clearly indicated.',
  },
  {
    category: 'stays',
    title: 'Credit cards',
    content:
      'We use a secure server to process your credit card information. Your card details are encrypted and safe with us.',
  },
  {
    category: 'stays',
    title: 'Property policies',
    content:
      'Property policies, such as check-in/check-out times and pet policies, are listed on the property details page.',
  },
  {
    category: 'stays',
    title: 'Extra facilities',
    content:
      'Information about extra facilities like pools, gyms, or spas can be found on the accommodation’s page.',
  },
  {
    category: 'stays',
    title: 'Security and awareness',
    content:
      'We take your security seriously. Never share your password or payment details with anyone over the phone or via chat.',
  },
];

const helpCategories = [
    { value: 'stays', label: 'Stays', icon: <Home /> },
    { value: 'flights', label: 'Flights', icon: <Plane /> },
    { value: 'car-rentals', label: 'Car rentals', icon: <Car /> },
    { value: 'attractions', label: 'Attractions', icon: <Sparkles /> },
    { value: 'airport-taxis', label: 'Airport taxis', icon: <Car /> },
    { value: 'insurance', label: 'Insurance', icon: <ShieldCheck /> },
    { value: 'other', label: 'Other', icon: <LifeBuoy /> },
];

export default function HelpPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader className="flex-row items-center gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            <CardTitle className="text-blue-800 font-bold">Stay safe online</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <p>
              Please check your payment policy. Gokovia will never ask for
              your account or payment info by phone, email or chat (e.g.
              WhatsApp). If in doubt, please report it to Gokovia.
            </p>
            <Button variant="link" className="p-0 h-auto mt-1 text-blue-700">
              Learn more
            </Button>
          </CardContent>
        </Card>

        <section className="text-center mb-10">
          <h1 className="text-3xl font-headline font-bold mb-2">
            Welcome to the Help Centre
          </h1>
          <p className="text-muted-foreground">
            Sign in to contact Customer Service, we&apos;re available 24 hours a day
          </p>
        </section>

        <section className="mb-10">
          <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-8 h-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Send us a message</h3>
                  <p className="text-muted-foreground">
                    Contact our agents about your booking, and we&apos;ll reply as
                    soon as possible.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Headphones className="w-8 h-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Call us</h3>
                  <p className="text-muted-foreground">
                    For anything urgent, you can call us 24/7 on a local or
                    international phone number.
                  </p>
                </div>
              </div>
            </CardContent>
            <div className="border-t p-6 flex flex-col items-center gap-4">
                <Button asChild className="w-full max-w-sm">
                    <Link href="/signin">Sign In</Link>
                </Button>
                <Button variant="link">Continue without an account</Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-headline font-bold mb-4">
            Frequently asked questions
          </h2>
          <Tabs defaultValue="stays" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 h-auto mb-6">
                {helpCategories.map(cat => (
                    <TabsTrigger key={cat.value} value={cat.value} className="flex flex-col md:flex-row gap-2 items-center h-auto py-2 data-[state=active]:border-primary data-[state=active]:border-b-2">
                        {cat.icon}
                        {cat.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="stays">
                <Card>
                    <CardContent className="p-0">
                         <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index} className="px-6">
                                    <AccordionTrigger className="hover:no-underline">
                                        <span className="flex-1 text-left">{item.title}</span>
                                    </AccordionTrigger>
                                    <AccordionContent>{item.content}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </TabsContent>
            {helpCategories.slice(1).map(cat => (
                 <TabsContent key={cat.value} value={cat.value}>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-muted-foreground text-center">No frequently asked questions for {cat.label} yet.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            ))}
          </Tabs>
        </section>
      </div>
    </div>
  );
}
