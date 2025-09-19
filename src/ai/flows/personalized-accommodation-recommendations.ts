// This is a server-side file.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized accommodation recommendations
 * based on user booking history and preferences.
 *
 * The flow takes user preferences and booking history as input and returns a list of recommended
 * accommodations with details.
 *
 * @exports `personalizedAccommodationRecommendations` - The main function to trigger the flow.
 * @exports `PersonalizedAccommodationRecommendationsInput` - The input type for the flow.
 * @exports `PersonalizedAccommodationRecommendationsOutput` - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for personalized accommodation recommendations
const PersonalizedAccommodationRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The preferences of the user, such as preferred location types and amenities.'),
  bookingHistory: z
    .string()
    .describe('The past booking history of the user, including locations, dates, and accommodation types.'),
  numberOfRecommendations: z.number().describe('The number of recommendations to return.'),
});

export type PersonalizedAccommodationRecommendationsInput = z.infer<
  typeof PersonalizedAccommodationRecommendationsInputSchema
>;

// Define the output schema for personalized accommodation recommendations
const AccommodationRecommendationSchema = z.object({
  accommodationName: z.string().describe('The name of the accommodation.'),
  accommodationType: z.string().describe('The type of accommodation (e.g., hotel, apartment).'),
  location: z.string().describe('The location of the accommodation.'),
  price: z.number().describe('The price per night of the accommodation.'),
  rating: z.number().describe('The rating of the accommodation (out of 5).'),
  amenities: z.array(z.string()).describe('A list of amenities offered by the accommodation.'),
  description: z.string().describe('A brief description of the accommodation.'),
});

const PersonalizedAccommodationRecommendationsOutputSchema = z.array(
  AccommodationRecommendationSchema
);

export type PersonalizedAccommodationRecommendationsOutput = z.infer<
  typeof PersonalizedAccommodationRecommendationsOutputSchema
>;

// Define the prompt for personalized accommodation recommendations
const personalizedAccommodationRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedAccommodationRecommendationsPrompt',
  input: {schema: PersonalizedAccommodationRecommendationsInputSchema},
  output: {schema: PersonalizedAccommodationRecommendationsOutputSchema},
  prompt: `Based on the user's preferences and booking history, recommend a list of accommodations.

User Preferences: {{{userPreferences}}}
Booking History: {{{bookingHistory}}}
Number of Recommendations: {{{numberOfRecommendations}}}

Return a JSON array of accommodations, each including the accommodation name, type, location, price, rating, amenities, and a brief description.
Ensure the recommendations align with the user's past behavior and stated preferences. Return at most {{numberOfRecommendations}} recommendations.
`,
});

// Define the Genkit flow for personalized accommodation recommendations
const personalizedAccommodationRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedAccommodationRecommendationsFlow',
    inputSchema: PersonalizedAccommodationRecommendationsInputSchema,
    outputSchema: PersonalizedAccommodationRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedAccommodationRecommendationsPrompt(input);
    return output!;
  }
);

/**
 * Generates personalized accommodation recommendations based on user preferences and booking history.
 *
 * @param input - The input containing user preferences, booking history, and the number of recommendations to return.
 * @returns A promise that resolves to a list of recommended accommodations.
 */
export async function personalizedAccommodationRecommendations(
  input: PersonalizedAccommodationRecommendationsInput
): Promise<PersonalizedAccommodationRecommendationsOutput> {
  return personalizedAccommodationRecommendationsFlow(input);
}

