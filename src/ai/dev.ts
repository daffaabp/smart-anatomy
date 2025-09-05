import { config } from 'dotenv';
config();

import '@/ai/flows/get-quiz-feedback.ts';
import '@/ai/flows/analyze-student-task-submissions.ts';
import '@/ai/flows/generate-quiz-questions.ts';
import '@/ai/flows/generate-sample-answers.ts';
import '@/ai/flows/ai-chat-interface.ts';

    