"use client";
import { useState, useEffect } from "react";
import { saveSurveyAnswers } from "../actions/survey";
import InteractiveQuestionCard from "./QuestionCard";

interface Option {
  value: number;
  label: string;
}

interface SurveyFormProps {
  questions: string[];
  options: Option[];
}

export default function SurveyForm({ questions, options }: SurveyFormProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAnswer = (index: number, value: number) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (questions.some((_, index) => !answers[index])) {
      setMessage("Please answer all questions");
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const result = await saveSurveyAnswers(answers);
      setMessage(result.success ? "Survey submitted successfully!" : result.error || "Failed to save");
      
      // Reset form if successful
      if (result.success) {
        setAnswers({});
      }
    } catch {
      setMessage("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-hide message after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="w-full p-4">
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Survey Form</h2>

      {questions.map((question, index) => (
        <InteractiveQuestionCard
          key={index}
          index={index}
          question={question}
          options={options}
          onAnswer={handleAnswer}
          selectedValue={answers[index] || null}
        />
      ))}
      </div>
      <button
        type="submit"
        className={`py-2 px-4 rounded-md mt-6 bg-gray-500 hover:bg-gray-400 text-white`}
      >
        Submit
      </button>

      {message && (
        <p className={`text-center mt-4 font-semibold ${message.includes('successfully') ? 'text-green-600' : 'text-rose-800'}`}>
          {message}
        </p>
      )}
    </form>
  );
}