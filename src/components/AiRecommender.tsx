"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAIRecommendations } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  tripType: z.string().min(1, "Trip type is required."),
  interests: z.string().min(1, "Please tell us your interests."),
});

interface AiRecommenderProps {
  onRecommendations: (names: string[]) => void;
}

export default function AiRecommender({ onRecommendations }: AiRecommenderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tripType: "",
      interests: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    onRecommendations([]); // Clear previous highlights

    // In a real app, booking history would be fetched for the logged-in user.
    const mockBookingHistory = "User previously booked a 4-star hotel in Paris for a romantic getaway and a beachfront resort in Bali for a family vacation.";
    
    const preferences = `Trip Type: ${data.tripType}. Interests: ${data.interests}`;

    const result = await getAIRecommendations({
      userPreferences: preferences,
      bookingHistory: mockBookingHistory,
      numberOfRecommendations: 3,
    });

    if (result.success && result.data) {
      toast({
        title: "AI Recommendations Ready!",
        description: "We've highlighted some top picks for you.",
      });
      const recommendedNames = result.data.map(rec => rec.accommodationName);
      onRecommendations(recommendedNames);
    } else {
      toast({
        title: "Error",
        description: result.error || "Could not fetch AI recommendations.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Bot className="text-primary" />
        <h3 className="font-semibold font-headline">AI-Powered Suggestions</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Tell us more about your trip for personalized recommendations.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="tripType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trip Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="e.g., Leisure, Business" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Leisure">Leisure</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Romantic">Romantic</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interests</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., museums, hiking, beaches" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Recommendations...
              </>
            ) : (
              "Get AI Picks"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
