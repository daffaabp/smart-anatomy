'use server';

/**
 * @fileOverview Provides AI-generated feedback for quiz questions with explanations and tips for improvement.
 *
 * - getQuizFeedback - A function that generates feedback for a given quiz question and student answer.
 * - GetQuizFeedbackInput - The input type for the getQuizFeedback function.
 * - GetQuizFeedbackOutput - The return type for the getQuizFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetQuizFeedbackInputSchema = z.object({
  question: z.string().describe('The quiz question.'),
  studentAnswer: z.string().describe('The student\u2019s answer to the question.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  accuracy: z.number().describe('Accuracy score from 0 to 1'),
  completeness: z.number().describe('Completeness score from 0 to 1'),
  speed: z.number().describe('Speed score from 0 to 1'),
  effort: z.number().describe('Effort score from 0 to 1'),
  learningProgress: z.number().describe('Learning progress score from 0 to 1'),
  engagement: z.number().describe('Engagement score from 0 to 1'),
  learningBehavior: z.number().describe('Learning behavior score from 0 to 1'),
});

export type GetQuizFeedbackInput = z.infer<typeof GetQuizFeedbackInputSchema>;

const GetQuizFeedbackOutputSchema = z.object({
  feedback: z.string().describe('AI-generated feedback for the quiz question.'),
});

export type GetQuizFeedbackOutput = z.infer<typeof GetQuizFeedbackOutputSchema>;

export async function getQuizFeedback(input: GetQuizFeedbackInput): Promise<GetQuizFeedbackOutput> {
  return getQuizFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getQuizFeedbackPrompt',
  input: {schema: GetQuizFeedbackInputSchema},
  output: {schema: GetQuizFeedbackOutputSchema},
  prompt: `You are an AI assistant providing feedback to students on their quiz answers.

  Provide constructive feedback based on the student's answer, the correct answer, and the performance scores. The performance scores indicates the level of each field. It is a floating number from 0 to 1. 
  Explain why the answer was incorrect (if applicable) and provide tips for improvement.

  Question: {{{question}}}
  Student's Answer: {{{studentAnswer}}}
  Correct Answer: {{{correctAnswer}}}
  Accuracy: {{{accuracy}}}
  Completeness: {{{completeness}}}
  Speed: {{{speed}}}
  Effort: {{{effort}}}
  Learning Progress: {{{learningProgress}}}
  Engagement: {{{engagement}}}
  Learning Behavior: {{{learningBehavior}}}

  Feedback:`,
});

const getQuizFeedbackFlow = ai.defineFlow(
  {
    name: 'getQuizFeedbackFlow',
    inputSchema: GetQuizFeedbackInputSchema,
    outputSchema: GetQuizFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
