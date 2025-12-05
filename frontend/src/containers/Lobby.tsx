import { useCallback, useEffect, useRef } from "react";
import { useAppContext } from "../contexts/AppContext";
import { socket } from "../services/socket";
import type { Room } from "../types/Room";


const MAX_PLAYERS = 4;

export const Lobby = () => {
  const { room, playerId } = useAppContext() as {
		room: Room | null,
		playerId: number

	}
  

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
    <div className="relative w-screen h-screen flex flex-col items-center justify-center font-montserrat overflow-hidden">
      <div className="flex flex-col items-stretch w-full max-w-xl">
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
      </div>

    </div>
  );


};

export default Lobby;