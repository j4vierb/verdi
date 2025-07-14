import React from 'react';
import ReactDOM from 'react-dom/client';
import { flatten } from 'flat';
import { BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import { IntlProvider } from 'react-intl';
import localeEsMessages from './locales/es.json';
import localeEnMessages from './locales/en.json';

import App from './App';
import './index.css';

import { AuthProvider } from './contexts/AuthContext';

const messages = {
	"es": flatten(localeEsMessages),
	"en": flatten(localeEnMessages)
}

const userLanguage = navigator.language.split('-')[0];
console.log("The language of the navigator is: " + userLanguage)
const locale = messages[userLanguage] ? userLanguage : 'en';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<IntlProvider
		locale={locale}
		messages={messages[locale]}
	>
		<React.StrictMode>
			<Router>
				<AuthProvider>
					<App />
				</AuthProvider>
			</Router>
		</React.StrictMode>
	</IntlProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
