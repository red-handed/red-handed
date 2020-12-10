import React from 'react';
import {Col} from "react-bootstrap";

class TopNavBar extends  React.Component {
    render() {
        return <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <h1 className="text-danger inline-block">Red</h1>
                <h1 className="text-light">Handed</h1>
                <blockquote className="blockquote">
                    <footer className="blockquote-footer">"Their words, not mine"</footer>
                </blockquote>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <br/>
                <br/>
                <div className="collapse navbar-collapse float-right" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="InfoPage.tsx">Info</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">FAQ</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    }
}

export default TopNavBar
