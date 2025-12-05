import { useCallback, useEffect, useRef } from "react";
import { useAppContext } from "../contexts/AppContext";
import { socket } from "../services/socket";
import type { Room } from "../types/Room";
import { useNavigate } from "react-router"


const MAX_PLAYERS = 4;

export const Lobby = () => {
  const { room, playerId, setRoom } = useAppContext() as {
		room: Room | null,
		playerId: number,
		setRoom: (room: Room | null) => void
	}
	const navigate = useNavigate();
  

  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!room || !socket) return;

    if (
      room._state === "waiting" &&
      room._players.length >= MAX_PLAYERS &&
      !hasStartedRef.current
    ) {
      hasStartedRef.current = true;
      socket.emit("start", { roomID: room._roomID });
    }
  }, [room, socket]);

	const handleStart = useCallback(() => {
		if (!room) return;
		console.log("handleStart");
		hasStartedRef.current = true;
		socket.emit("start", { roomID: room._roomID });
	},[room])

	const handleLeave = useCallback(() => {
		console.log("handleLeave");
		socket.emit("leave-room");
		navigate("/");
	},[])

	useEffect(() => {
		socket.on("start-game", (data: any) => {
			console.log("start game received")
			let newRoom = room;
			console.log("newRoom:", newRoom)
			if (!newRoom) return;
			newRoom._players = data.players;
			setRoom(newRoom);
			console.log("navigating to game")
			navigate("/game");
		});
  }, [room]);

	

  if (!room) {
    return (
      <div className="w-screen h-screen flex items-center justify-center font-montserrat bg-light-cream/60 text-slate-100">
        <p className="text-lg text-cobalt-blue animate-pulse">
          Connexion à la room en cours...
        </p>
      </div>
    );
  }

  const playersCount = room._players.length;

  return (
    <div className="relative w-screen h-screen flex flex-row items-center justify-center font-montserrat overflow-hidden">
      <div className="flex flex-col items-stretch w-full max-w-xl absolute  right-5/10">
        <div className="border rounded-2xl border-cobalt-blue/40 bg-light-cream/60 backdrop-blur-sm px-6 py-5 flex flex-col gap-4">

          <div>
            <p className="text-sm mb-2 text-left">
              Joueurs connectés ({playersCount} / {MAX_PLAYERS}) :
            </p>
            <ul className="space-y-1 text-sm">
              {room._players.map((p) => {
                const isMe = p._id === playerId;
                return (
                  <li
                    key={p._id}
                    className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2 bg-white/70"
                  >
                    <span className="font-medium">
                      {p._username || `Joueur #${p._id}`}
                      {isMe && (
                        <span className="ml-1 text-xs text-cobalt-blue">
                          (toi)
                        </span>
                      )}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </li>
                );
              })}
              {playersCount < MAX_PLAYERS && (
                <li className="flex items-center justify-between border border-dashed border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-500 bg-white/40">
                  <span>En attente de nouveaux joueurs...</span>
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.3s]" />
                  </span>
                </li>
              )}
							<div className={`flex items-center justify-center flex-col gap-2 `}> 
								<button onClick={handleStart} disabled={playersCount < 2 ? true : false} className={` ${playersCount < 2 && "opacity-20"} w-100 self-auto mt-6 text-center font-black uppercase text-xl bg-cobalt-blue text-light-cream px-6 py-3 cursor-pointer rounded-xl duration-200 hover:shadow-xl`}>
									<span>Demarrer la partie</span>
								</button>
								<p>2 joueurs miniumum</p>
							</div>

							
            </ul>
          </div>
        </div>
				<div className={`flex items-center justify-center flex-col gap-2  `}> 
					<button onClick={handleLeave} className={` w-40 self-auto mt-6 text-center font-black uppercase text-xs bg-red-500 text-light-cream px-6 py-3 cursor-pointer rounded-xl duration-200 hover:shadow-xl`}>
						<span>Quitter</span>
					</button>
				</div>
      </div>
      <div className="absolute right-0 bg-cobalt-blue text-light-cream w-150 h-full p-10 flex gap-2 flex-col">
        <div>
          <h2 className="font-gasoek-one text-4xl">Faites la connexion</h2>
          <h3 className="font-medium text-2xl">Les regles du jeu</h3>
          <div className="py-5">
            <p>Chaque joueur possède un ensemble de cartes. Toutes les cartes sont posées collectivement, sans ordre de tour : les joueurs discutent, argumentent et coopèrent pour construire une seule chaîne logique.</p>
            <p className="pt-5">Une règle unique :</p>
            <p><strong>Chaque carte posée doit être la conséquence directe de la carte précédente.</strong></p>
            <p className="pt-5">Les joueurs avancent ainsi étape par étape, en créant une suite causale cohérente — par exemple : « Je construis une maison » → « Donc j’achète des briques » → « Donc je fais venir un camion » → etc.</p>
            <p>La premiere phase de la partie se termine lorsque toutes les cartes ont été posées et que la chaîne forme un enchaînement logique et compréhensible.</p>
            <p className="pt-5">
              Lors de la deuxième phase du jeu, un nouvel ensemble de cartes “actions” est révélé aux joueurs. Ils doivent alors débattre et s’accorder pour choisir, parmi ces cartes, les deux actions à la fois les plus impactantes et les plus faciles à mettre en place.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-auto bottom-10 text-xs border rounded-full opacity-80 px-3 py-1 border-light-cream/50">
          fait avec ❤︎ par <strong>milo niemaz</strong>, <strong>hugo lopez</strong> et <strong>quentin terisse</strong>
        </div>
      </div>
    </div>
  );


};

export default Lobby;