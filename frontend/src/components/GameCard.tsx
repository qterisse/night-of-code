import { Apple } from "lucide-react";
import image from "../assets/image.png";

function GameCard() {

  return (
    <div className="hover:scale-100 scale-30 translate-y-100 hover:translate-40 hover:shadow-2xl hover:rotate-0 duration-500 ease-in-out rotate-90 w-200 h-130 rounded-3xl border-4 border-double overflow-hidden flex flex-col">
      <div className="h-20 w-full border-b flex items-center gap-4 px-4 bg-linear-to-tl from-cobalt-blue/10 to-light-cream">
        <div className="p-3 rounded-full border border-cobalt-blue/80 border">
          <Apple strokeWidth={1.5} className="" />
        </div>
        <h2 className="text-4xl font-medium text-cobalt-blue/80">Consommation d'énergies fossiles</h2>
      </div>

      <div className="p-4 flex-1 flex gap-10">
        <img src={image} className="w-1/3 h-full rounded rounded-bl-lg object-cover" />
        <ul>
          <li>
            À l'échelle mondiale en 2023, les combustibles fossiles (charbon, pétrole, gaz) représentaient environ 81,5 % de l'énergie primaire consommée
            <a href="https://dieselnet.com/news/2024/06energyreview.php?utm_source=chatgpt.com" target="_blank" className="ml-2 -mt-1 bg-cobalt-blue/70 text-light-cream text-xs rounded-full px-1 cursor-pointer">dieselnet.com</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GameCard;
