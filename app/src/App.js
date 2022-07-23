import './App.css';
import {Chat} from './component/Chat.js'
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <header style={{'margin-bottom' : '20px'}}>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">YEEY</a>
                </nav>
            </header>
            <body>
            <Chat/>
            </body>
        </div>
    );
}

export default App;
