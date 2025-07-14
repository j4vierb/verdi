import "./CosechasPage.css";

import Cultivo from "../../../components/CultivoCard/Cultivo";

import images from "../../../assets/images";
import { FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
const { cafe2, mandarina, tomate_arbol } = images;

const CULTIVOS = [
	{
		id: 1,
		imagen: cafe2,
		nombre: "Café Barako",
		ubicacion: "Armenia, Quindío",
		diasRestantes: 5,
		cantidad: "7-10 Toneladas",
		estado: "Sin verificar"
	},
	{
		id: 2,
		imagen: mandarina,
		nombre: "Mandarina Oneco",
		ubicacion: "Yondó, Antioquia",
		diasRestantes: 60,
		cantidad: "12 Toneladas",
		estado: "Verificado"
	},
	{
		id: 3,
		imagen: tomate_arbol,
		nombre: "Tomate de árbol",
		ubicacion: "Acacías, Meta",
		diasRestantes: 8,
		cantidad: "5 Toneladas",
		estado: "Publicado"
	},
	{
		id: 4,
		imagen: cafe2,
		nombre: "Café Barako",
		ubicacion: "Armenia, Quindío",
		diasRestantes: 5,
		cantidad: "7-10 Toneladas",
		estado: "Sin verificar"
	},
	{
		id: 5,
		imagen: mandarina,
		nombre: "Mandarina Oneco",
		ubicacion: "Yondó, Antioquia",
		diasRestantes: 60,
		cantidad: "12 Toneladas",
		estado: "Verificado"
	},
	{
		id: 6,
		imagen: tomate_arbol,
		nombre: "Tomate de árbol",
		ubicacion: "Acacías, Meta",
		diasRestantes: 8,
		cantidad: "5 Toneladas",
		estado: "Publicado"
	},
	{
		id: 7,
		imagen: cafe2,
		nombre: "Café Barako",
		ubicacion: "Armenia, Quindío",
		diasRestantes: 5,
		cantidad: "7-10 Toneladas",
		estado: "Sin verificar"
	},
	{
		id: 8,
		imagen: mandarina,
		nombre: "Mandarina Oneco",
		ubicacion: "Yondó, Antioquia",
		diasRestantes: 60,
		cantidad: "12 Toneladas",
		estado: "Verificado"
	},
	{
		id: 9,
		imagen: tomate_arbol,
		nombre: "Tomate de árbol",
		ubicacion: "Acacías, Meta",
		diasRestantes: 8,
		cantidad: "5 Toneladas",
		estado: "Publicado"
	}
]

const CosechasPage = () => {
	const mapper = {
		"Sin verificar": "verify",
		"Verificado": "publish",
		"Publicado": "withdraw"
	}

	const [harvest, setHarvest] = useState([]);

	useEffect(() => {
			if (navigator.onLine) {
					setHarvest(CULTIVOS);
					localStorage.setItem("harvests", JSON.stringify(CULTIVOS));
			} else {
					const cachedHaversts = localStorage.getItem("harvests");
					if (cachedHaversts) {
							setHarvest(JSON.parse(cachedHaversts));
					}
			}
	}, []);

	return (<>
		<div className="purchases-title">
			<h2>
				<FormattedMessage id="admin-harvest-page.title" />
			</h2>
		</div>

		<div className="admin-cosechas-list">
			<h3>
				<FormattedMessage id="admin-harvest-page.subtitle" />
			</h3>
			<div className="container-cosechas-list">
				<section className="cosechas-list">
					{harvest.map(cosecha => {
						const status = mapper[cosecha.estado];
						return (<Cultivo admin={true} key={cosecha.id} info={cosecha} className="status-cosecha-tag">
							<button>
								<FormattedMessage id="admin-harvest-page.detail" />
							</button>
							<button>
								<FormattedMessage id={`admin-harvest-page.status-button.${status}`} />
							</button>
						</Cultivo>)
					})}
				</section>
			</div>
		</div>
	</>)
}

export default CosechasPage;
