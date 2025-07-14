import { useIntl } from "react-intl";
import "./StatusTag.css"

const StatusTag = ({ status }) => {
	const intl = useIntl();
	const mapper = {
		"En camino": "#34c759",
		"Procesando pedido": "#00c7bd",
		"Entregado": "#007aff"
	}
	const trans = {
		"En camino": "Shipped",
		"Procesando pedido": "Processing",
		"Entregado": "Delivered"
	}
	const color = mapper[status];

	return intl.locale.startsWith('es')
		? <span className="status-tag" style={{ backgroundColor: color }}>{status}</span>
		: <span className="status-tag" style={{ backgroundColor: color }}>{trans[status]}</span>
}

export default StatusTag;
