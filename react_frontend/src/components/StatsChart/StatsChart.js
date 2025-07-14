import React from "react";
import { Line } from "react-chartjs-2";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./StatsChartMessages";
import "chart.js/auto";
import "./StatsChart.css";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

const StatsChart = () => {
    const locale = getBrowserLanguage();

    const data = {
        labels: [
            messages[locale].jan, messages[locale].feb, messages[locale].mar,
            messages[locale].apr, messages[locale].may, messages[locale].jun,
            messages[locale].jul
        ],
        datasets: [
            {
                label: messages[locale].active_users,
                data: [20, 30, 45, 60, 75, 90, 100],
                borderColor: "#ff7300",
                fill: false,
            },
        ],
    };

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="stats-chart">
                <h3><FormattedMessage id="active_users" /></h3>
                <Line data={data} />
            </div>
        </IntlProvider>
    );
};

export default StatsChart;
