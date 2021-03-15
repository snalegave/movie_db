import React from "react";
import "./Home.css";
import FormControl from 'react-bootstrap/FormControl'

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Search</h1>
      </div>
      <div className="search-bar">
        <FormControl size="lg" type="text" placeholder="Movie Name" />
      </div>
    </div>
  );
}
