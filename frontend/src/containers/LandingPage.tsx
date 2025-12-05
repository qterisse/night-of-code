import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { socket } from "../services/socket";

function LandingPage() {
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = (evt: any) => {
    evt.preventDefault();
    setLoading(true);
    const formData = new FormData(evt.target);
    socket.emit('join-room', {
      username: formData.get('username')
    });
  }

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center font-montserrat">
      <div className="mb-15 z-10">
        <h1 className="font-black font-gasoek-one text-[80px]">Faites la <mark className="bg-cobalt-blue text-light-cream px-6">connexion</mark></h1>
        <p className="text-lg text-right mr-5">Apprendre la sobriété numérique en quelques clics</p>
      </div>

      <form onSubmit={handleOnSubmit} className="flex items-stretch h-13">
        <input name="username" maxLength={25} placeholder="Comment tu t'appelles ?" className="peer border rounded-l-xl focus:outline-none px-4" />
        <button type="submit" className={`w-30 text-center font-black uppercase text-xl bg-cobalt-blue text-light-cream px-6 py-3 cursor-pointer rounded-r-xl duration-200 peer-focus:shadow-xl hover:shadow-xl shadow-cobalt-blue/20`}>
          {loading ? (<LoaderCircle className={loading ? "animate-spin mx-auto" : ""}/>) : (<span>Jouer</span>)}
        </button>
      </form>

      <div className="max-w-250 mt-15 text-center w-9/10 space-y-4 z-20">
        <p>Chaque foyer français dispose en 2023 d'environ 10 équipements numériques dotés d'un écran, qu'ils soient utilisés ou non, 
        ce qui représente près de 300 millions d'appareils en France métropolitaine. Cette présence massive soulève une 
        question essentielle : quel est l'impact réel de tous ces dispositifs sur notre environnement ?</p>
        <p>Inspiré du travail de <a className="hover:underline font-semibold" target="_blank" href="https://www.fresquedunumerique.org/">La Fresque du Numérique</a>,
        ce petit jeu de cartes en ligne t'invite à découvrir de façon ludique l'empreinte environnementale de nos usages numériques.
        Mais surtout, il te proposera plusieurs actions concrètes que nous pouvons mettre en place pour changer la donne.</p>
      </div>

      <div className="absolute bottom-10 text-xs border rounded-full opacity-80 px-3 py-1 border-cobalt-blue/50">
        fait avec ❤︎ par <strong>milo niemaz</strong>, <strong>hugo lopez</strong> et <strong>quentin terisse</strong>
      </div>
    </div>
  )
}

export default LandingPage;