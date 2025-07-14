import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import StatusButton from "../../components/StatusButton/StatusButton"
import StatusTag from "../../components/StatusTag/StatusTag"

import PURCHASES from './compras.json';
import "./ComprasPage.css"

import images from '../../assets/images';
const { cafe } = images;

const ComprasPage = () => {
	const [purchases, setPurchases] = useState([]);
	const intl = useIntl();

	let buttonHist = "Historial";
	let buttonDet = "Detalles de pedido";
	if (intl.locale.startsWith('en')) {
		buttonHist = "History";
		buttonDet = "Order details";
	}

	useEffect(() => {
		if (navigator.onLine) {
			setPurchases(PURCHASES);
			localStorage.setItem("purchases", JSON.stringify(PURCHASES));
		} else {
			const cachedNotifications = localStorage.getItem("purchases");
			if (cachedNotifications) {
				setPurchases(JSON.parse(cachedNotifications));
			}
		}
	}, []);

	return (<>
		<div className="purchases-title">
			<h2>
				<FormattedMessage id="compras-page.title" />
			</h2>
		</div>

		<div className="purchases-section">
			{purchases.map(compra => {
				return (
					<div className="purchases-card" key={compra.id}>
						<img src={cafe} alt="" />
						<div className="info-section">
							<div className="info-section-title">
								<h3>{compra.nombre}</h3>
								<p>
									<FormattedMessage id="compras-page.status" />:
									<StatusTag status={compra.estado} />
								</p>
							</div>
							<div className="links">
								<StatusButton
									href={"/app/purchases/" + compra.id}
									text={buttonHist}
								/>
								<StatusButton
									href={"/app/purchases/" + compra.id}
									text={buttonDet}
								/>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	</>)
};

export default ComprasPage;