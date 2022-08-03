import './App.css';
import {Gate} from './component/Gate.js'
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    let yeeyStyle = {
        'display': 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        'margin-left': '10px'
    }

    return (
        <div className="App" style={{'background-color': '#5B5EA6'}}>
            <header style={{'margin-bottom': '20px'}} >
                <nav className="navbar navbar-dark bg-dark" style={{'align-text': 'center'}}>
                    <a className="navbar-brand" href="#" style={yeeyStyle}>YEEY <div>🙌</div> TEAM</a>
                    <a href="#" onClick={() => window.location.reload()}><i className="fa-solid fa-unlock fa-2x" style={{'color': 'white', 'align-text': 'right', 'margin-right': '10px'}}></i></a>
                </nav>
            </header>
            <body style={{'background-color': '#5B5EA6'}}>
            <Gate/>
            </body>
        </div>
    );
}

export default App;
