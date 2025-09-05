'use server';

/**
 * @fileOverview AI flow for generating sample answers for tasks.
 *
 * - generateSampleAnswers - A function that generates sample answers for a given task description.
 * - GenerateSampleAnswersInput - The input type for the generateSampleAnswers function.
 * - GenerateSampleAnswersOutput - The return type for the generateSampleAnswers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSampleAnswersInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('The detailed description of the task for which sample answers are to be generated.'),
  gradingRubric: z
    .string()
    .optional()
    .describe('Optional grading rubric to guide the generation of sample answers.'),
});
export type GenerateSampleAnswersInput = z.infer<typeof GenerateSampleAnswersInputSchema>;

const GenerateSampleAnswersOutputSchema = z.object({
  sampleAnswers: z
    .array(z.string())
    .describe('An array of sample answers generated based on the task description and grading rubric.'),
});
export type GenerateSampleAnswersOutput = z.infer<typeof GenerateSampleAnswersOutputSchema>;

export async function generateSampleAnswers(input: GenerateSampleAnswersInput): Promise<GenerateSampleAnswersOutput> {
  return generateSampleAnswersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSampleAnswersPrompt',
  input: {schema: GenerateSampleAnswersInputSchema},
  output: {schema: GenerateSampleAnswersOutputSchema},
  prompt: `You are an expert teaching assistant. Your task is to generate sample answers for the given task description.

Task Description: {{{taskDescription}}}

{{#if gradingRubric}}
Grading Rubric: {{{gradingRubric}}}
{{/if}}

Please generate at least 3 distinct sample answers. Each answer should be comprehensive and reflect a strong understanding of the material. The answers should be formatted as a list.

Sample Answers:
`, // enforcing a list
});

const generateSampleAnswersFlow = ai.defineFlow(
  {
    name: 'generateSampleAnswersFlow',
    inputSchema: GenerateSampleAnswersInputSchema,
    outputSchema: GenerateSampleAnswersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
