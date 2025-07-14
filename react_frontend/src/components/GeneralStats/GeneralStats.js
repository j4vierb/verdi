import React from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./GeneralStatsMessages";
import "./GeneralStats.css";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

const GeneralStats = () => {
    const locale = getBrowserLanguage();

    const stats = [
        { label: "total_users", value: "89,935", change: "+1.01%" },
        { label: "total_active_orders", value: "23,283", change: "+0.49%" },
        { label: "total_active_users", value: "46,827", change: "-0.91%" },
        { label: "completed_orders", value: "124,854", change: "+1.51%" }
    ];

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="general-stats">
                {stats.map((stat) => (
                    <div key={stat.label} className="stat-box">
                        <h3>{stat.value}</h3>
                        <p><FormattedMessage id={stat.label} /></p>
                        <span className={stat.change.startsWith("+") ? "positivo" : "negativo"}>
                            {stat.change} <FormattedMessage id="weekly_change" />
                        </span>
                    </div>
                ))}
            </div>
        </IntlProvider>
    );
};

export default GeneralStats;
