import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";

function App() {
  return (
    <div>
      <Navbar collapseOnSelect bg="light" expand="md">
        <Navbar.Brand href="/" className="font-weight-bold text-muted">
          Movie_DB
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content">
          <Nav activeKey={window.location.pathname}>
            <Nav.Link href="/netflix" eventKey="/netflix">Netflix</Nav.Link>
            <Nav.Link href="/hulu" eventKey="/hulu">Hulu</Nav.Link>
            <Nav.Link href="/disney" eventKey="/disney">Disney</Nav.Link>
            <Nav.Link href="/prime" eventKey="/prime">Prime</Nav.Link>
            <Nav.Link href="/peacock" eventKey="/peacock">Peacock</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}
export default App;
