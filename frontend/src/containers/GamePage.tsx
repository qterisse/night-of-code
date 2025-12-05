import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { useAppContext } from "../contexts/AppContext";
import { cards } from "../data/cards";
import { socket } from "../services/socket";
import { useNavigate } from "react-router";

const GamePage = () => {
	const [selectedCardID, setSelectedCardID] = useState<number | null>(null);
    
	const { room, playerId, playedCards } = useAppContext();
	const [showEndBtn, setShowEndBtn] = useState(true)
	const navigate = useNavigate();


	const handleEndBtn = () => {
		console.log("round-2 emit")
		socket.emit("round-2");
	}


	useEffect(() => {
		socket.on("receive-round-2", () => {
			navigate("solution");
		})
	}, [])


	useEffect(() => {
		if (playedCards.length >= 10) {
			setShowEndBtn(true);
		}
	}, [playedCards])

	if (!room) {
		return (
			<div className="relative w-screen h-screen flex flex-col items-center justify-center font-montserrat">
				Loading...
			</div>
		)
	}

	return (
		<div className="relative w-screen h-screen flex flex-col items-center justify-center font-montserrat overflow-hidden">
			<div className="hidden mr-200 mr-100 mr-0 ml-100 ml-200"></div>
			<div className="flex h-30 w-full gap-30 px-20">
				{room._players.map((player, index) => player._id !== playerId && (
					<div key={index} className="grow border-2 border-t-0 bg-cobalt-blue/10 border-cobalt-blue rounded-b-xl flex justify-center">
						{player._hand.map((cardID, index) => {
							return (<GameCard card={cards.find(c => c.id === cardID)} position={`duration-300 -mt-60 absolute hover:scale-80 hover:translate-y-50 -rotate-90`} marginLeft={(index - (player._hand.length - 1) / 2) * 450} />);
						})}
					</div>
				))}
			</div>

			<div className="flex-1 flex items-end justify-start w-full mb-50 overflow-x-auto px-10">
				<GameCard card={cards[0]} position="flex-none hover:scale-42 -mb-20 duration-200" marginLeft={-160} />
				{playedCards?.map((card, index) => (
					<div key={index}>
						<div className="flex-none border-b-2 border-cobalt-blue w-30 mb-45 -ml-70"></div>
						<GameCard card={card} position="flex-none hover:scale-42 -mb-20 duration-200" marginLeft={-280} />
					</div>
				))}
				<div className="flex-none border-b-2 border-cobalt-blue/20 w-25 -ml-70 mb-45"></div>
				<div className="flex-none border-2 border-cobalt-blue/50 bg-cobalt-blue/5 w-80 mb-20 mr-10 h-50 flex items-center justify-center text-center text-cobalt-blue/60 rounded-xl border-dotted">
					Choisissez ensemble une {playedCards?.length > 0 ? "nouvelle" : "premiere"} carte consequence
				</div>
			</div>

			<div className="flex h-30 w-full gap-30 px-20">
				{room._players.map((player, index) => player._id === playerId && (
					<div key={index} className="grow mx-auto max-w-270 border-2 border-b-0 bg-cobalt-blue/10 border-cobalt-blue rounded-t-xl flex justify-center">
						{player._hand.map((cardID, index) => {
							return (<GameCard isSelected={selectedCardID === cardID} card={cards.find(c => c.id === cardID)} position={`-mt-50 duration-300 absolute hover:scale-80 hover:-translate-y-40 rotate-90`} marginLeft={(index - (player._hand.length - 1) / 2) * 450} />);
						})}
					</div>
				))}
			</div>
			{showEndBtn && (
				<button onClick={handleEndBtn} className={`absolute right-20 bottom-20 w-40 text-center font-black uppercase text-xl bg-cobalt-blue text-light-cream px-9 py-6 cursor-pointer rounded-xl duration-200 peer-focus:shadow-xl hover:shadow-xl shadow-cobalt-blue/20`}>
					<span>Suite...</span>
				</button>
			)}
		</div>
	);
}

export default GamePage;