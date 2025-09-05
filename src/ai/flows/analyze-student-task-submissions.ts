// src/ai/flows/analyze-student-task-submissions.ts
'use server';
/**
 * @fileOverview Analyzes student task submissions, providing pre-grading and feedback highlights for lecturers.
 *
 * - analyzeTaskSubmission - Analyzes a single student's task submission.
 * - AnalyzeTaskSubmissionInput - The input type for the analyzeTaskSubmission function.
 * - AnalyzeTaskSubmissionOutput - The return type for the analyzeTaskSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTaskSubmissionInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('The description of the task assigned to the student.'),
  studentSubmissionText: z
    .string()
    .optional()
    .describe('The text content of the student submission.'),
  submissionFile: z
    .string()
    .optional()
    .describe("A file submission from a student, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  gradingCriteria: z
    .string()
    .describe('The grading criteria or rubric for the task.'),
});
export type AnalyzeTaskSubmissionInput = z.infer<
  typeof AnalyzeTaskSubmissionInputSchema
>;

const AnalyzeTaskSubmissionOutputSchema = z.object({
  aiPreScreeningScore: z
    .number()
    .describe(
      'The AI pre-screening score (out of 100) indicating the quality of the submission.'
    ),
  keyPointsHighlighted: z
    .string()
    .describe('Key points highlighted from the student submission.'),
  potentialIssuesFlagged: z
    .string()
    .describe('Potential issues or areas of concern in the submission.'),
  suggestedScore: z
    .number()
    .describe('The suggested score (out of 100) for the submission.'),
  suggestedFeedback: z
    .string()
    .describe('Suggested feedback to provide to the student.'),
});
export type AnalyzeTaskSubmissionOutput = z.infer<
  typeof AnalyzeTaskSubmissionOutputSchema
>;

export async function analyzeTaskSubmission(
  input: AnalyzeTaskSubmissionInput
): Promise<AnalyzeTaskSubmissionOutput> {
  return analyzeTaskSubmissionFlow(input);
}

const analyzeTaskSubmissionPrompt = ai.definePrompt({
  name: 'analyzeTaskSubmissionPrompt',
  input: {schema: AnalyzeTaskSubmissionInputSchema},
  output: {schema: AnalyzeTaskSubmissionOutputSchema},
  prompt: `You are an AI assistant helping lecturers to grade student task submissions.

You will receive the task description, the student submission (either as text or a file), and the grading criteria.
Your goal is to analyze the student submission and provide a pre-grading analysis, highlighting key points and potential issues.

Task Description: {{{taskDescription}}}
{{#if studentSubmissionText}}
Student Submission (Text): {{{studentSubmissionText}}}
{{/if}}
{{#if submissionFile}}
Student Submission (File): {{media url=submissionFile}}
{{/if}}
Grading Criteria: {{{gradingCriteria}}}

Based on your analysis, provide the following:
- AI pre-screening score (out of 100) indicating the overall quality of the submission.
- Key points highlighted from the student submission.
- Potential issues or areas of concern in the submission.
- Suggested score (out of 100) for the submission.
- Suggested feedback to provide to the student.

Please ensure your analysis is thorough and provides valuable insights for the lecturer to efficiently grade the assignment and provide targeted feedback.

Output in JSON format:
`,
});

const analyzeTaskSubmissionFlow = ai.defineFlow(
  {
    name: 'analyzeTaskSubmissionFlow',
    inputSchema: AnalyzeTaskSubmissionInputSchema,
    outputSchema: AnalyzeTaskSubmissionOutputSchema,
  },
  async input => {
    if (!input.studentSubmissionText && !input.submissionFile) {
        throw new Error("Either studentSubmissionText or submissionFile must be provided.");
    }
    const {output} = await analyzeTaskSubmissionPrompt(input);
    return output!;
  }
);