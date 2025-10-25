
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  BedDouble,
  Calendar as CalendarIcon,
  Users,
  Minus,
  Plus,
  MapPin,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import HotelBookingDialog from "./HotelBookingDialog";

const FormSchema = z.object({
  destination: z.string().min(1, { message: "Destination is required." }),
  dates: z.object({
    from: z.date({ required_error: "Check-in date is required." }),
    to: z.date({ required_error: "Check-out date is required." }),
  }),
  adults: z.number().min(1),
  children: z.number().min(0),
  rooms: z.number().min(1),
});

type FormValues = z.infer<typeof FormSchema>;

const trendingDestinations = [
    { name: 'Kerala', country: 'India' },
    { name: 'Chennai', country: 'India' },
    { name: 'Mumbai', country: 'India' },
    { name: 'New Delhi', country: 'India' },
    { name: 'Mangalore', country: 'India' },
];

export default function SearchForm() {
  const router = useRouter();
  const [destinationPopover, setDestinationPopover] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      destination: "",
      adults: 2,
      children: 0,
      rooms: 1,
    },
  });

  const destination = form.watch("destination");

  function onSearchSubmit(data: FormValues) {
    const { destination, dates, adults, children, rooms } = data;
    const params = new URLSearchParams({
      destination,
      checkin: dates.from ? format(dates.from, "yyyy-MM-dd") : '',
      checkout: dates.to ? format(dates.to, "yyyy-MM-dd") : '',
      guests: `${adults + children}`,
      adults: String(adults),
      children: String(children),
      rooms: String(rooms),
    });
    router.push(`/search?${params.toString()}`);
  }


  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg">
      <CardContent className="p-0">
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const result = FormSchema.safeParse(form.getValues());
                if (result.success) {
                  setIsBookingDialogOpen(true);
                } else {
                    form.trigger();
                }
              }}
              className="flex flex-col md:flex-row items-stretch bg-white border-2 border-yellow-400 rounded-lg overflow-hidden"
            >
              <div className="flex-1">
                  <Popover open={destinationPopover} onOpenChange={setDestinationPopover}>
                      <PopoverAnchor asChild>
                          <FormField
                          control={form.control}
                          name="destination"
                          render={({ field }) => (
                              <FormItem>
                              <FormControl>
                                  <div className="relative">
                                  <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                  <Input
                                      placeholder="Where are you going?"
                                      className="h-16 pl-12 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                                      {...field}
                                      onFocus={() => setDestinationPopover(true)}
                                  />
                                  </div>
                              </FormControl>
                              </FormItem>
                          )}
                          />
                      </PopoverAnchor>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] mt-2" onOpenAutoFocus={(e) => e.preventDefault()}>
                          <h4 className="font-semibold px-4 pb-2">Trending destinations</h4>
                          <div className="grid gap-1">
                              {trendingDestinations.map((dest) => (
                                  <Button 
                                      key={dest.name} 
                                      variant="ghost" 
                                      className="justify-start"
                                      onClick={() => {
                                          form.setValue("destination", dest.name);
                                          setDestinationPopover(false);
                                      }}
                                  >
                                      <MapPin className="mr-2"/>
                                      <div>
                                          <p className="font-semibold">{dest.name}</p>
                                          <p className="text-xs text-muted-foreground text-left">{dest.country}</p>
                                      </div>
                                  </Button>
                              ))}
                          </div>
                      </PopoverContent>
                  </Popover>
              </div>
              
              <Separator orientation="vertical" className="h-auto hidden md:block" />
              <div className="flex-1">
                  <FormField
                  control={form.control}
                  name="dates"
                  render={({ field }) => (
                      <FormItem>
                      <Popover>
                          <PopoverTrigger asChild>
                          <FormControl>
                              <Button
                              variant={"ghost"}
                              className={cn(
                                  "w-full justify-start text-left font-normal h-16 text-base",
                                  !field.value?.from && "text-muted-foreground"
                              )}
                              >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value?.from ? (
                                  field.value.to ? (
                                  <>
                                      {format(field.value.from, "MMM dd")} -{" "}
                                      {format(field.value.to, "MMM dd")}
                                  </>
                                  ) : (
                                  format(field.value.from, "LLL dd, y")
                                  )
                              ) : (
                                  <span>Check-in date — Check-out date</span>
                              )}
                              </Button>
                          </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                              mode="range"
                              defaultMonth={field.value?.from}
                              selected={field.value}
                              onSelect={field.onChange}
                              numberOfMonths={2}
                              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          />
                          </PopoverContent>
                      </Popover>
                      </FormItem>
                  )}
                  />
              </div>
              <Separator orientation="vertical" className="h-auto hidden md:block" />

              <div className="flex-1">
                  <Popover>
                  <PopoverTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start font-normal h-16 text-base text-left">
                      <Users className="mr-2 h-4 w-4" />
                      <div>
                          {form.watch("adults")} adults · {form.watch("children")} children · {form.watch("rooms")} room
                      </div>
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                      <div className="grid gap-4">
                      <div className="space-y-2">
                          <h4 className="font-medium leading-none">Guests & Rooms</h4>
                      </div>
                      <div className="grid gap-2">
                          {['adults', 'children', 'rooms'].map((name) => (
                          <div key={name} className="grid grid-cols-3 items-center gap-4">
                              <span className="capitalize">{name}</span>
                              <div className="col-span-2 flex items-center justify-end gap-2">
                              <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  type="button"
                                  onClick={() => form.setValue(name as keyof FormValues, Math.max(name === 'adults' || name === 'rooms' ? 1 : 0, form.getValues(name as keyof FormValues) - 1))}
                              >
                                  <Minus className="h-4 w-4" />
                              </Button>
                              <span>{form.watch(name as keyof FormValues)}</span>
                              <Button
                                  variant="outline"
                                  size="icon"
                                  type="button"
                                  className="h-8 w-8"
                                  onClick={() => form.setValue(name as keyof FormValues, form.getValues(name as keyof FormValues) + 1)}
                              >
                                  <Plus className="h-4 w-4" />
                              </Button>
                              </div>
                          </div>
                          ))}
                      </div>
                      </div>
                  </PopoverContent>
                  </Popover>
              </div>
              <Button type="submit" size="lg" className="h-auto text-lg font-bold w-full md:w-auto px-10 rounded-none bg-accent hover:bg-accent/90 text-accent-foreground">
                <BedDouble className="h-6 w-6 md:hidden mr-2" />
                Book Hotel
              </Button>
            </form>
          </Form>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Book a hotel in {destination}</DialogTitle>
            </DialogHeader>
            <HotelBookingDialog destination={destination} onBookingSuccess={() => setIsBookingDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
