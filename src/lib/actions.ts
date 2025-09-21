
"use server";

import {
  personalizedAccommodationRecommendations,
  PersonalizedAccommodationRecommendationsInput,
} from "@/ai/flows/personalized-accommodation-recommendations";
import {
  generateIdealBookingForm,
  GenerateIdealBookingFormInput,
} from "@/ai/flows/generate-ideal-booking-form";
import { accommodations } from "./data";

export async function getAIRecommendations(
  input: PersonalizedAccommodationRecommendationsInput
) {
  try {
    const accommodationNames = accommodations.map(acc => acc.name);
    const recommendations = await personalizedAccommodationRecommendations({...input, accommodationNames});
    return { success: true, data: recommendations };
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return { success: false, error: "Failed to fetch AI recommendations." };
  }
}

export async function generateForm(input: GenerateIdealBookingFormInput) {
  try {
    const { formCode } = await generateIdealBookingForm(input);
    return { success: true, data: formCode };
  } catch (error) {
    console.error("Form Generation Error:", error);
    return { success: false, error: "Failed to generate form code." };
  }
}
