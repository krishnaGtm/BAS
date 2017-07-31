
//using updated hot reloader but a bit hacky right now
//but it's good enough for dev purpose
import { AppContainer } from 'react-hot-loader';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './approutes';


//styles sheed imports
import "../css/normalize.css"
import "../css/fixed-data-table.min.css"
import '../css/styles.scss'

const rootElement= document.getElementById('app')
ReactDOM.render(
    <AppContainer>
        <AppRoutes />
    </AppContainer>,
    rootElement
);

if (module.hot) {
    module.hot.accept('./approutes', () => {
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextApp = require('./approutes').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootElement
        );
    });
}
