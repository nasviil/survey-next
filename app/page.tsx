import SurveyForm from "./components/SurveyForm";

const QUESTIONS = [
  "I worry about things.",
  "I make friends easily.",
  "I have a vivid imagination.",
  "Do you often feel overwhelmed by your emotions?"
];

const SCALE_OPTIONS = [
  { value: 1, label: "Very Inaccurate" },
  { value: 2, label: "Moderately Inaccurate" },
  { value: 3, label: "Neither Accurate Nor Inaccurate" },
  { value: 4, label: "Moderately Accurate" },
  { value: 5, label: "Very Accurate" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4">
      <SurveyForm questions={QUESTIONS} options={SCALE_OPTIONS} />
    </div>
  );
}
