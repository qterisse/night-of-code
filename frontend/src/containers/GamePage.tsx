import { useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { socket } from "../services/socket";



const GamePage = () => {

	const { room } = useAppContext();

	
	// let totoroom = {
	// 	players: [],
	// 	state: "", 
	// 	whoamiID: 1 // besoin de savoir qui je suis

	// }

	useEffect(() => {
		if (!room) return;
		console.log('my room:', room);
		if (room?._players.size >= 4) {
			socket.emit("start");
		}
	}, [room]);



	return (
    <div className="relative w-screen px-30 h-screen flex flex-col items-center justify-center font-montserrat">
    	<div className="border border-2 my-30 rounded-md flex-1 w-full items-center justify-center font-montserrat">
				{room?._state == "waiting" && (
					<p>
						Waiting for players...
					</p>
				)}
			</div>

		</div>
	)
}

export default GamePage;