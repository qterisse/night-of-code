import GameCard from "../components/GameCard";
import { useAppContext } from "../contexts/AppContext";
import { cards } from "../data/cards";
import { socket } from "../services/socket";

const GamePage = () => {
  const { room, playerId, playedCards, selectedCardID, setSelectedCardID } = useAppContext();

  if (!room) {
    return (
      <div className="relative w-screen h-screen flex flex-col items-center justify-center font-montserrat">
        Loading...
      </div>
    );
  }

  const handlePlayCard = (cardID: number | null) => {
		if (!cardID) return ;
    socket.emit("play-card", { cardID });
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center font-montserrat overflow-hidden">
      <div className="hidden mr-200 mr-100 mr-0 ml-100 ml-200"></div>
      <div className="flex h-30 w-full gap-30 px-20">
        {room._players.map(
          (player, index) =>
            player._id !== playerId && (
              <div
                key={index}
                className="grow border-2 border-t-0 bg-cobalt-blue/10 border-cobalt-blue rounded-b-xl flex justify-center"
              >
                {player._hand.map((cardID, index) => {
                  return (
                    <GameCard
                      card={cards.find((c) => c.id === cardID)}
                      position={`duration-300 -mt-60 absolute hover:scale-80 hover:translate-y-50 -rotate-90`}
                      marginLeft={(index - (player._hand.length - 1) / 2) * 450}
                    />
                  );
                })}
              </div>
            )
        )}
      </div>

      <div className="flex-1 flex items-end justify-start w-full mb-50 overflow-x-auto px-10">
        <GameCard
          card={cards[0]}
          position="flex-none hover:scale-50 -mb-20 duration-200"
          marginLeft={-160}
        />
        {playedCards?.map((card, index) => (
          <div key={index}>
            <div className="flex-none border-b-2 border-cobalt-blue w-30 mb-45 -ml-70"></div>
            <GameCard
              card={card}
              position="flex-none hover:scale-50 -mb-20 duration-200"
              marginLeft={-420}
            />
          </div>
        ))}
        <div className="flex-none border-b-2 border-cobalt-blue/20 w-25 -ml-70 mb-45"></div>
        <div className="flex-none border-2 border-cobalt-blue/50 bg-cobalt-blue/5 w-80 mb-20 mr-10 h-50 flex items-center justify-center text-center text-cobalt-blue/60 rounded-xl border-dotted">
          Choisissez ensemble une{" "}
          {playedCards?.length > 0 ? "nouvelle" : "premiere"} carte consequence
        </div>
      </div>

      <div className="flex h-30 w-full gap-30 px-20">
        {room._players.map(
          (player, index) =>
            player._id === playerId && (
              <div
                key={index}
                className="grow mx-auto max-w-270 border-2 border-b-0 bg-cobalt-blue/10 border-cobalt-blue rounded-t-xl flex justify-center"
              >
                {player._hand.map((cardID, index) => {
                  return (
                    <GameCard
                      handleOnClick={() =>
                        setSelectedCardID(
                          cardID === selectedCardID ? null : cardID
                        )
                      }
                      isSelected={selectedCardID === cardID}
                      card={cards.find((c) => c.id === cardID)}
                      position={`-mt-50 duration-300 absolute hover:scale-80 hover:-translate-y-40 rotate-90`}
                      marginLeft={(index - (player._hand.length - 1) / 2) * 450}
                    />
                  );
                })}
              </div>
            )
        )}

        <button
					onClick={() => handlePlayCard(selectedCardID)}
          className="cursor-pointer bg-cobalt-blue text-light-cream h-16 px-6 rounded-xl font-bold uppercase disabled:bg-cobalt-blue/10 disabled:text-cobalt-blue/20 disabled:curor-disabled"
          disabled={selectedCardID === null}
        >
          Poser la carte
        </button>
      </div>
    </div>
  );
};

export default GamePage;
