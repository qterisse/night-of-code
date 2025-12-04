import { useEffect } from "react";



const GamePage = () => {

	useEffect(() => {
		console.log('debug');
	}, []);

	return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center font-montserrat">
			GAME
		</div>
	)
}

export default GamePage;