import React from "react";
import { Link } from "react-router-dom";
import logo from "../../wikipedia.jpeg";

export default function Sidenav(props) {
  return (
    <div className="sidenav">
      <section className="Logo">
        <img src={logo} alt="Wikipedia Logo" />
        <h3>SaMapedia</h3>
      </section>
      <hr />
      <section>
        <Link to="/" style={{ textDecoration: "none" }}>
          <li>Main page</li>
        </Link>

        <Link to="/content" style={{ textDecoration: "none" }}>
          <li>Contents</li>
        </Link>

        <Link to="/randomArticle" style={{ textDecoration: "none" }}>
          <li
            onClick={(e) => {
              props.randomDisplay(
                Math.floor(Math.random() * (props.article.length - 1))
              );
            }}
          >
            Random article
          </li>
        </Link>

        <Link to="/about" style={{ textDecoration: "none" }}>
          <li>About SaMapedia</li>
        </Link>

        <li>Contact us</li>
        <li>Donate</li>
      </section>
    </div>
  );
}
