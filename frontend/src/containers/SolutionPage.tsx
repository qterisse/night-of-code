import SolutionCard from "../components/SolutionCard"
import { solutions } from "../data/solutions"

function getFourRandomUnique() {
  const values = [0,1,2,3,4,5,6];
  const result = [];

  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * values.length);
    result.push(values[index]);
    values.splice(index, 1); // retire le nombre pour éviter les doublons
  }

  return result;
}


function SolutionPage() {

    const randoms = getFourRandomUnique();
    const positions = ["absolute top-left", "absolute top-right", "absolute bottom-left", "absolute bottom-right"];

    console.log(randoms);

    return (
        <div>
            {randoms.map((index, i) => (
                <SolutionCard 
                    key={i}
                    card={solutions[index]}
                    position={positions[i]}
                />
            ))}
        </div>
    )
}

export default SolutionPage;

