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
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  destination: z.string().min(1, { message: "Destination is required." }),
  dates: z.object({
    from: z.date({ required_error: "Check-in date is required." }),
    to: z.date({ required_error: "Check-out date is required." }),
  }),
  guests: z.string().min(1, { message: "Number of guests is required." }),
});

export default function SearchForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      destination: "",
      guests: "2",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { destination, dates, guests } = data;

    if (!dates.from || !dates.to) {
        toast({
            title: "Invalid dates",
            description: "Please select both check-in and check-out dates.",
            variant: "destructive",
        })
        return;
    }
    
    const params = new URLSearchParams({
      destination,
      checkin: format(dates.from, "yyyy-MM-dd"),
      checkout: format(dates.to, "yyyy-MM-dd"),
      guests,
    });

    router.push(`/search?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-x-0 gap-y-2 items-center bg-yellow-400 border-4 border-yellow-400 rounded-md"
      >
        <div className="lg:col-span-4">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Where are you going?"
                      className="pl-10 h-12 rounded-none rounded-l-sm border-0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="pl-2"/>
              </FormItem>
            )}
          />
        </div>

        <div className="lg:col-span-4">
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal h-12 rounded-none border-x-2 border-yellow-400",
                          !field.value?.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="lg:col-span-3">
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input type="number" placeholder="Guests" className="pl-10 h-12 rounded-none border-0" min="1" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full lg:col-span-1 h-12 rounded-none rounded-r-sm text-lg">
           Search
        </Button>
      </form>
    </Form>
  );
}
