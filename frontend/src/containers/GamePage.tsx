import { useAppContext } from "../contexts/AppContext";

const GamePage = () => {
    
	const { room, playerId } = useAppContext();

	if (!room) {
		return (
			<div className="relative w-screen h-screen flex flex-col items-center justify-center font-montserrat">
				Loading...
			</div>
		)
	}

	return (
		<div className="relative w-screen h-screen flex flex-col items-center justify-center font-montserrat">
			<div className="flex max-w-">
				{room._players.map((player, index) => console.log(player, playerId) || player._id !== playerId && (
					<div key={index} className="flex-grow">{player._username}</div>
				))}
			</div>
			<div>

			</div>
			<div>

			</div>
		</div>
	);
}

export default GamePage;