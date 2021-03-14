import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";

function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand href="/" className="font-weight-bold text-muted">
          Movie_DB
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content">
          <Nav>
            <Nav.Link href="/netflix">Netflix</Nav.Link>
            <Nav.Link href="/hulu">Hulu</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}
export default App;
