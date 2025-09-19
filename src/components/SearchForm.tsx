"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  BedDouble,
  Calendar as CalendarIcon,
  Search,
  Users,
  Minus,
  Plus,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

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

export default function SearchForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      destination: "",
      adults: 2,
      children: 0,
      rooms: 1,
    },
  });

  function onSubmit(data: FormValues) {
    const { destination, dates, adults, children, rooms } = data;

    if (!dates.from || !dates.to) {
      toast({
        title: "Invalid dates",
        description: "Please select both check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    const params = new URLSearchParams({
      destination,
      checkin: format(dates.from, "yyyy-MM-dd"),
      checkout: format(dates.to, "yyyy-MM-dd"),
      guests: `${adults + children}`,
      adults: String(adults),
      children: String(children),
      rooms: String(rooms),
    });

    router.push(`/search?${params.toString()}`);
  }

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg">
      <CardContent className="p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row items-center bg-background border border-yellow-500 rounded-lg"
          >
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormControl>
                    <div className="relative">
                      <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="Where are you going?"
                        className="h-14 pl-10 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator orientation="vertical" className="h-8 hidden md:block" />
            <FormField
              control={form.control}
              name="dates"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "w-full justify-start text-left font-normal h-14 text-base",
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
            <Separator orientation="vertical" className="h-8 hidden md:block" />
             <Popover>
               <PopoverTrigger asChild>
                <Button variant="ghost" className="flex-1 w-full justify-start font-normal h-14 text-base text-left">
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
                            onClick={() => form.setValue(name as keyof FormValues, Math.max(name === 'adults' || name === 'rooms' ? 1 : 0, form.getValues(name as keyof FormValues) - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{form.watch(name as keyof FormValues)}</span>
                          <Button
                            variant="outline"
                            size="icon"
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
            <Button type="submit" size="lg" className="h-12 text-base font-bold m-1 w-full md:w-auto">
              <Search className="h-5 w-5 md:hidden mr-2" />
              Search
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
