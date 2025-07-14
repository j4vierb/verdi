import "./Notification.css"

const Notification = (props) => {
    const { notification } = props;

    const relevanceColors = {
        2: ["red" , "Alta"],
        1: ["orange", "Media"],
        0: ["green", "Baja"]
    }

    const [color, relevance] = relevanceColors[notification.relevance];

    return <div className="notification-card">
        <div className="notification-title">
            <h4>{notification.title}</h4>

            <span className="notification-relevance-tag" style={{ backgroundColor: color}}>{ relevance }</span>
        </div>

        <div className="notification-text">
            <p>{notification.description}</p>
        </div>
    </div>
}

export default Notification;