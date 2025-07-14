import { FormattedMessage } from "react-intl";
import "./Notification.css"

const Notification = (props) => {
    const { notification } = props;

    const relevanceColors = {
        2: ["red" , "high"],
        1: ["orange", "mid"],
        0: ["green", "low"]
    }

    const [color, relevance] = relevanceColors[notification.relevance];

    return <div className="notification-card">
        <div className="notification-title">
            <h4>{notification.title}</h4>

            <span className="notification-relevance-tag" style={{ backgroundColor: color}}>
                <FormattedMessage id={`admin-notifications-page.relevance.${relevance}`} />
            </span>
        </div>

        <div className="notification-text">
            <p>{notification.description}</p>
        </div>
    </div>
}

export default Notification;