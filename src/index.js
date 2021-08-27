import React from "react";
import ReactDOM from "react-dom";
import Slider from "./slider";
import "react-id-swiper/src/styles/scss/swiper.scss";
import "./styles.scss";

const App = () => (
  <div className="App">
    <section className="section">
      <div className="container header">
        <h1 className="title">React Id Swiper dynamic slides w lazy load</h1>
        <h3 className="subtitle">
          Adds lazy load support to swiper implementation
        </h3>
      </div>
      <div className="container">
        <Slider />
      </div>
    </section>
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
