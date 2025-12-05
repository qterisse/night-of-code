import { Lightbulb } from "lucide-react";
import type { Solution } from "../types/Solution";

const SolutionCard = ({card, position}: {card: Solution, position: string}) => {

    return (
    <div className={` ${position} absolute scale-70 hover:scale-75 hover:-translate-y-2 bg-light-cream hover:shadow-2xl duration-500 ease-in-out w-200 h-130 rounded-3xl border-4 border-double overflow-hidden flex flex-col`}>
      <div className="h-20 w-full border-b flex items-center gap-4 px-4 bg-linear-to-tl from-cobalt-blue/10 to-light-cream">
        <div className="p-3 rounded-full border border-cobalt-blue/80 border">
          <Lightbulb strokeWidth={1.5} className="" />
        </div>
        <h2 className="text-4xl font-medium text-cobalt-blue/80">{card.title}</h2>
      </div>

      <div className="flex-1 flex gap-10 ">
        <p className="p-8 leading-9 bg-cobalt-blue/70 text-light-cream text-2xl cursor-pointer">
        {card.description}
        </p>
      </div>
    </div>
  );
}

export default SolutionCard;
