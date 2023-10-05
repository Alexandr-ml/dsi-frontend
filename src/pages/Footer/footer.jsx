import React from "react";

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#f1f1f1",
    bottom: 0,
  };

  return (
    <footer className="text-center text-white" style={footerStyle}>
      <div className="container-fluid pt-4" style={{width:100,bottom:0}}>
        <section className="row">
          <div className="col">
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
          <div className="col">
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <div className="col">
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-google"></i>
            </a>
          </div>
          <div className="col">
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="col">
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <div className="col">
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>
      </div>

      <div
        className="text-center text-white p-5"
        style={{ backgroundColor: "#214A87" }}
      >
        © 2023 Copyright:
        <a className="text-white" href="#!">
          SGDP.com
        </a>
      </div>
    </footer>
  );
}
