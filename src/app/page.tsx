import { vegetables } from "@/lib/vegetables";
import VegetableSelector from "@/components/VegetableSelector";

export default function Home() {
  return (
    <div className="pb-28">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          What&apos;s in your kitchen?
        </h1>
        <p className="text-neutral-500 text-base">
          Pick your vegetables and we&apos;ll find the perfect Nepali recipe for you.
        </p>
      </div>
      <VegetableSelector vegetables={vegetables} />
    </div>
  );
}
