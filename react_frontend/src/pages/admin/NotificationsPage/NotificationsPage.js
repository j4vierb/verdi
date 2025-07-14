import { FormattedMessage } from "react-intl"
import { useEffect, useState } from "react"
import Notification from "../../../components/NotificationCard/Notification"
import NOTIFICATIONS from "./notifications.json"

import "./NotificationsPage.css"

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    useEffect(() => {
        if (navigator.onLine) {
            fetch('http://localhost:3000/api/v1/eventualidad/')
                .then((res) => res.json())
                .then((data) => {
                    if (data.statusCode === 412) {
                        console.error("Error fetching notifications:", data.message);
                        return;
                    }
                    setNotifications([...notifications, data])
                    localStorage.setItem("notifications", JSON.stringify(NOTIFICATIONS));
                })
                .catch((error) => {
                    console.error("Error fetching notifications:", error);
                });
        } else {
            const cachedNotifications = localStorage.getItem("notifications");
            if (cachedNotifications) {
                setNotifications(JSON.parse(cachedNotifications));
            }
        }
    }, [notifications]);

    return <>
        <div className="purchases-title">
            <h2 className="notifications-admin-panel">
                <FormattedMessage id="admin-notifications-page.title" />
            </h2>
        </div>

        <div className="notifications-body">
            <h3>
                <FormattedMessage id="admin-notifications-page.subtitle" />
            </h3>

            <section className="notifications-list">
                {notifications.map(not => {
                    return <Notification key={not.id} notification={not} />
                })}
            </section>
        </div>
    </>
}

export default NotificationsPage;