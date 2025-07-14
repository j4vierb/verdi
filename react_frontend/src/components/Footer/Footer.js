import React from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./FooterMessages";
import "./Footer.css";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

const Footer = () => {
    const locale = getBrowserLanguage();

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">verdi</div>
                    <div className="footer-info">
                        <p><FormattedMessage id="address" /></p>
                        <p><FormattedMessage id="phone" /></p>
                    </div>
                    <div className="footer-links">
                        <a href="/enconstruccion"><FormattedMessage id="contact_us" /></a>
                        <a href="/enconstruccion"><FormattedMessage id="help" /></a>
                        <a href="/enconstruccion"><FormattedMessage id="privacy_policy" /></a>
                        <a href="/enconstruccion"><FormattedMessage id="disclaimer" /></a>
                    </div>
                    <div className="footer-social">
                        <a href="/enconstruccion"><i className="fab fa-facebook"></i></a>
                        <a href="/enconstruccion"><i className="fab fa-twitter"></i></a>
                        <a href="/enconstruccion"><i className="fab fa-linkedin"></i></a>
                        <a href="/enconstruccion"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </footer>
        </IntlProvider>
    );
};

export default Footer;
