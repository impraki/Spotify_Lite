import React from 'react';
import Home from "./Pages/Home";
import Addsong from './Pages/Addsong';
import './App.css';
import { BrowserRouter as  Router,Routes, Route} from "react-router-dom";
import {Link} from "react-router-dom";


function App() {
    return (
      <Router>
        <nav className="navbar">
                <div>
                  <Link to='/'>
                    <h1>
                      <b>
                        Spotify Lite
                      </b>
                    </h1>
                  </Link>
                </div>
                <div className="btn">
                    <Link to='/Addsong'>
                      <button className="button">Add Song</button>
                    </Link>
                </div>
          </nav>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/Addsong" element={<Addsong />} />
          </Route>
        </Routes>
      </Router>
    );
    }

export default App;
