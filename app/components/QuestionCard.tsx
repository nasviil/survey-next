interface Option {
  value: number;
  label: string;
}

interface InteractiveQuestionCardProps {
  index: number;
  question: string;
  options: Option[];
  onAnswer: (index: number, value: number) => void;
  selectedValue: number | null;
}

export default function InteractiveQuestionCard({ 
  index,
  question,
  options,
  onAnswer,
  selectedValue
}: InteractiveQuestionCardProps) {
  return (
    <div className="border-t-4 border-indigo-900 shadow-sm shadow-neutral-400 p-4">
      <p className="font-semibold mb-3 text-gray-800">
        {index + 1}. {question}
      </p>

      <div className="flex justify-between px-16">
        {options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer"
          >
            <input
              type="radio"
              name={`question-${index}`}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onAnswer(index, option.value)}
              className="peer sr-only"
            />
            <div className="py-2 px-3 border rounded-md text-sm text-center border-gray-500 text-gray-700 hover:bg-blue-50 transition-colors duration-100 peer-checked:bg-indigo-700 peer-checked:text-white peer-checked:border-indigo-700 peer-checked:hover:bg-indigo-700">
              {option.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}