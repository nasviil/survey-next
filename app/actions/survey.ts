'use server';

import { prisma } from '../../lib/prisma';

export async function saveSurveyAnswers(answers: Record<number, number>) {
  try {
    const formattedAnswers: Record<string, string> = {};
    
    Object.entries(answers).forEach(([index, value]) => {
      formattedAnswers[`Q${parseInt(index) + 1}`] = value.toString();
    });

    // Save to database
    const result = await prisma.surveyAnswers.create({
      data: {
        answers: JSON.stringify(formattedAnswers)
      }
    });

    return { success: true, id: result.id };
  } catch (error) {
    console.error('Error saving survey answers:', error);
    return { success: false, error: 'Failed to save survey answers' };
  }
}