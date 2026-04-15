interface Props {
  steps: string[];
}

export default function CookingSteps({ steps }: Props) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex items-center justify-center w-8 h-8 bg-saffron text-white rounded-full text-sm font-bold shrink-0">
            {i + 1}
          </span>
          <p className="text-gray-700 pt-1">{step}</p>
        </li>
      ))}
    </ol>
  );
}
