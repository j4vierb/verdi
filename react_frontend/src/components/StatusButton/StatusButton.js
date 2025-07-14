import { Link } from "react-router-dom"
import './StatusButton.css'

const StatusButton = ({ href, text }) => {
	return <Link className="status-button" to={href}>{text}</Link>
}

export default StatusButton;