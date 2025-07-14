import React from "react";
import { Doughnut } from "react-chartjs-2";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./OrdersChartMessages";
import "chart.js/auto";
import "./OrdersChart.css";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

const OrdersChart = () => {
    const locale = getBrowserLanguage();

    const data = {
        labels: [
            messages[locale].to_pick_up,
            messages[locale].delivering,
            messages[locale].delivered
        ],
        datasets: [
            {
                data: [40, 30, 60],
                backgroundColor: ["#ffcc00", "#ff7300", "#008000"],
            },
        ],
    };

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="orders-chart">
                <h3><FormattedMessage id="orders" /></h3>
                <Doughnut data={data} />
            </div>
        </IntlProvider>
    );
};

export default OrdersChart;
