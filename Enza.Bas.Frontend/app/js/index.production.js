//production index file, stripped off any dev stuffs.
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './approutes';


//styles sheed imports
import "../css/normalize.css"
import "../css/fixed-data-table.min.css"
import '../css/styles.scss'


ReactDOM.render(<AppRoutes />,document.getElementById('app'));
