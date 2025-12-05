import image0 from "../assets/image0.png";
import image from "../assets/image.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import type { Card } from "../types/Card";

export const cards: Card[] = [
	{
		id: 0,
		title: "Réviser",
		image: image0,
		facts: [
			{
				text: "En France, une récente étude a dévoilé que déja 72% des étudiants utilisaient activement l'IA dans leurs révisions", 
				sourceURL: "https://www.ispeakspokespoken.com/sondage-chagpt/",
				source: "ispeakspokespoken",
			},
		]
	},
	{
		id: 1,
		title: "Consommation d'énergies fossiles",
		image: image,
		facts: [
			{
				text: "À l'échelle mondiale en 2023, les combustibles fossiles (charbon, pétrole, gaz) représentaient environ 81,5 % de l'énergie primaire consommée", 
				sourceURL: "https://dieselnet.com/news/2024/06energyreview.php",
				source: "dieselnet.com",
			},
		]
	},
	{
		id: 2,
		title: "Extraction de metaux rares",
		image: image1,
		imageSource: "Jean-Marc MONTEL/CNRS Photothèque",
		facts: [
			{
				text: "Entre 2012 et 2022, on observe que le ratio « roche extraite / métal utile obtenu » (parfois appelé « stripping ratio » ou ratio minerai/stérile + minerai) tend à s'aggraver. Par exemple, dans les mines d'or et de métaux de base, le ratio moyen global en 2023 est estimé à ~2,51 tonnes de roche déplacées pour 1 tonne de minerai traité — un des plus hauts niveaux récents", 
				sourceURL: "https://www.spglobal.com/market-intelligence/en/news-insights/research/gold-mine-stripping-ratios-rise-on-high-prices-grades-continue-declining",
				source: "S&P Global",
			},
			{
				text: "Du côté des métaux « critiques » ou « rares » (comme les terres rares, métaux stratégiques pour l'électronique, les batteries, etc.), certaines ressources encore existantes présentent des concentrations trop faibles pour être « économiquement viables » — ce qui complique leur exploitation à grande échelle",
				sourceURL: "https://www.cnrs.fr/sites/default/files/page/2025-11/R%C3%A9sume_Terres_rares_2025.pdf",
				source: "CNRS"
			}
		]
	},
	{
		id: 3,
		title: "Faire une fiche de révision grâce à l’IA",
		image: image2,
		facts: [
			{
				text: "L’usage d’un modèle d’IA pour réviser ou générer du contenu déclenche des requêtes sur des serveurs distants — qui consomment de l’électricité et augmentent l’empreinte carbone associée au numérique.", 
				sourceURL: "https://institut-superieur-environnement.com/blog/lintelligence-artificielle-une-pollution-cachee-au-coeur-de-linnovation/",
				source: "Institut supérieur environnement"
			},
			{
				text: "L’impact du secteur numérique (ordinateurs, serveurs, réseaux) serait responsable de 3 à 4 % des émissions mondiales de gaz à effet de serre.", 
				sourceURL: "https://institut-superieur-environnement.com/blog/lintelligence-artificielle-une-pollution-cachee-au-coeur-de-linnovation/",
				source: "Institut supérieur environnement"
			}
		]
	},
	{
		id: 4,
		title: "Utiliser un LLM",
		image: image3,
		facts: [
			{
				text: "Les centres de données utilisent aujourd’hui environ 415 TWh par an, soit ~1.5 % de la consommation électrique mondiale. L’essor des services basés sur l’IA (LLM, cloud, etc.) contribue fortement à cette demande. ", 
				sourceURL: "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai",
				source: "IEA"
			},
			{
				text: "Avec l’essor de l’intelligence artificielle, la demande en calcul et énergie dans les datacenters devrait fortement augmenter dans les prochaines années.", 
				sourceURL: "https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks",
				source: "IEA"
			}
		]
	},
	{
		id: 5,
		title: "Utiliser un ordinateur",
		image: image4,
		facts: [
			{
				text: "Le numérique représente environ 2.5 % de l’empreinte carbone en France (tous usages confondus : fabrication, réseaux, serveurs, usage).", 
				sourceURL: "https://infos.ademe.fr/magazine-avril-2022/faits-et-chiffres/numerique-quel-impact-environnemental/",
				source: "ADEME"
			},
			{
				text: "Une part importante de l’impact carbone du numérique provient de la fabrication des terminaux (smartphones, ordinateurs...), bien plus que de leur usage.", 
				sourceURL: "https://www.arcep.fr/la-regulation/grands-dossiers-thematiques-transverses/lempreinte-environnementale-du-numerique.html",
				source: "ARCEP / ADEME"
			}
		]
	},
	{
		id: 6,
		title: "Internet et réseaux",
		image: image5,
		facts: [
			{
				text: "Les réseaux et infrastructures de transmission de données participent à l’impact global du numérique — aux côtés des centres de données et des terminaux — pour le gaz à effet de serre.", 
				sourceURL: "https://lecese.fr/sites/default/files/pdf/Avis/2024/2024_14_IA_Environnement.pdf",
				source: "CESE"
			},
			{
				text: "Quand on prend en compte l’ensemble du cycle de vie (fabrication, usages, transport, serveurs, réseaux), le numérique pèse plusieurs pourcents des émissions mondiales de gaz à effet de serre.", 
				sourceURL: "https://institut-superieur-environnement.com/blog/limpact-du-numerique-sur-lenvironnement-comprendre-les-enjeux-et-trouver-des-solutions-durables/",
				source: "Institut supérieur environnement"
			}
		]
	},
	{
		id: 7,
		title: "Construction de datacenters",
		image: image6,
		facts: [
			{
				text: "Les datacenters consomment en 2024 environ 415 TWh/an — leur consommation pourrait doubler d’ici 2030 selon les prévisions, accentuant fortement leur impact énergétique.", 
				sourceURL: "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai",
				source: "IEA"
			},
			{
				text: "Cette consommation énergétique des datacenters pourrait fortement augmenter avec la montée de l’IA et des services cloud.", 
				sourceURL: "https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks",
				source: "IEA"
			}
		]
	},
	{
		id: 8,
		title: "Construction d'infrastructures réseau",
		image: image7,	
		facts: [
			{
				text: "Le développement mondial des infrastructures réseau (fibre, antennes, câbles, équipements) augmente la consommation énergétique globale du numérique, à un moment où la demande de données explose.", 
				sourceURL: "https://lecese.fr/sites/default/files/pdf/Avis/2024/2024_14_IA_Environnement.pdf",
				source: "CESE"
			},
			{
				text: "Alors que la demande de données explose, l’énergie nécessaire pour faire transiter, stocker et traiter ces données augmente de façon continue.", 
				sourceURL: "https://communication-responsable.ademe.fr/comprendre-limpact-du-numerique",
				source: "ADEME"
			}
		]
	},
	{
		id: 9,
		title: "Pénuries des ressources",
		image: image8,
		facts: [
			{
				text: "La fabrication des équipements numériques utilise des métaux rares et ressources critiques — leur extraction a des impacts importants en matière d’environnement et de disponibilité des ressources.", 
				sourceURL: "https://institut-superieur-environnement.com/blog/lintelligence-artificielle-une-pollution-cachee-au-coeur-de-linnovation/",
				source: "Institut supérieur environnement"
			},
			{
				text: "L’extraction minière pour ces métaux rares peut entraîner pollution, destruction d’écosystèmes, consommation d’eau et dégradation de l’environnement dans les zones concernées.", 
				sourceURL: "https://www.greenpeace.fr/la-pollution-numerique/",
				source: "Greenpeace"
			}
		]
	},
	{
		id: 10,
		title: "Tensions géopolitiques sur les ressources",
		image: image9,
		facts: [
			{
				text: "La concurrence mondiale pour les métaux rares nécessaires à l’électronique et aux batteries exacerbe les tensions géopolitiques et soulève des enjeux de durabilité et d’équité dans l’accès aux ressources.", 
				sourceURL: "https://institut-superieur-environnement.com/blog/lintelligence-artificielle-une-pollution-cachee-au-coeur-de-linnovation/",
				source: "Institut supérieur environnement"
			},
			{
				text: "La pression croissante sur ces ressources critiques rend leur exploitation parfois moins contrôlée, ce qui soulève des questions d’éthique, d’environnement et de justice sociale.", 
				sourceURL: "https://www.greenpeace.fr/la-pollution-numerique/",
				source: "Greenpeace"
			}
		]
	}
];

/*






*/