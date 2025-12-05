import { Apple } from "lucide-react";
import type { Card } from "../types/Card";

function GameCard({card, position}: {card: Card, position: string}) {

  return (
    <div className={`hover:scale-100 ${position} hover:z-50 absolute scale-40 hover:-translate-y-50 bg-light-cream hover:shadow-2xl hover:rotate-0 duration-500 ease-in-out rotate-90 w-200 h-130 rounded-3xl border-4 border-double overflow-hidden flex flex-col`}>
      <div className="h-20 w-full border-b flex items-center gap-4 px-4 bg-linear-to-tl from-cobalt-blue/10 to-light-cream">
        <div className="p-3 rounded-full border border-cobalt-blue/80 border">
          <Apple strokeWidth={1.5} className="" />
        </div>
        <h2 className="text-4xl font-medium text-cobalt-blue/80">{card.title}</h2>
      </div>

      <div className="p-4 flex-1 flex gap-10">
        <div className="relative w-1/3 flex-none h-full">
          <img src={card.image} className="w-full h-full rounded rounded-bl-lg object-cover" />
          {card.imageSource && (
            <p className="text-white text-xs italic absolute bottom-0 right-1">{card.imageSource}</p>
          )}
        </div>
        <ul>
          {card.facts.map((fact, index) => (
            <li key={index}>
              {fact.text}
              <a href={fact.sourceURL} target="_blank" className="ml-2 -mt-1 bg-cobalt-blue/70 text-light-cream text-xs rounded-full px-1 cursor-pointer">
                {fact.source}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GameCard;
