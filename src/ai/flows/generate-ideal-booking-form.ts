'use server';
/**
 * @fileOverview AI flow to generate a booking form based on design requirements.
 *
 * - generateIdealBookingForm - A function that generates the booking form.
 * - GenerateIdealBookingFormInput - The input type for the generateIdealBookingForm function.
 * - GenerateIdealBookingFormOutput - The return type for the generateIdealBookingForm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIdealBookingFormInputSchema = z.object({
  designRequirements: z
    .string()
    .describe('Detailed design requirements for the booking form, including fields, layout, and styling.'),
});
export type GenerateIdealBookingFormInput = z.infer<
  typeof GenerateIdealBookingFormInputSchema
>;

const GenerateIdealBookingFormOutputSchema = z.object({
  formCode: z
    .string()
    .describe(
      'The generated code for the booking form, including HTML, CSS, and any necessary JavaScript.'
    ),
});
export type GenerateIdealBookingFormOutput = z.infer<
  typeof GenerateIdealBookingFormOutputSchema
>;

export async function generateIdealBookingForm(
  input: GenerateIdealBookingFormInput
): Promise<GenerateIdealBookingFormOutput> {
  return generateIdealBookingFormFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIdealBookingFormPrompt',
  input: {schema: GenerateIdealBookingFormInputSchema},
  output: {schema: GenerateIdealBookingFormOutputSchema},
  prompt: `You are an expert front-end developer specializing in generating booking forms based on design specifications.

You will receive a detailed description of the desired booking form, including the necessary fields, layout, and styling.

Your task is to generate the complete code for the booking form, including HTML, CSS, and any JavaScript necessary for basic functionality and styling. The output should be directly usable in a NextJS project.

Design Requirements: {{{designRequirements}}}`,
});

const generateIdealBookingFormFlow = ai.defineFlow(
  {
    name: 'generateIdealBookingFormFlow',
    inputSchema: GenerateIdealBookingFormInputSchema,
    outputSchema: GenerateIdealBookingFormOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
