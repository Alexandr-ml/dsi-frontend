import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";


export default function Footer() {
  const footerStyle = {
    backgroundColor: "#f1f1f1",
    bottom: 0,
  };

  return (
    <footer className="text-center text-white" style={footerStyle}>
      <div className="container-fluid pt-4" style={{ width: 100, bottom: 0 }} >
        <section className="row justify-content-center">
          <table className="justify-content-center">
            <tr>
              <td>
                <div className="col-auto">
                  <a
                    className="btn btn-link btn-floating btn-lg text-dark m-1"
                    href="#!"
                    role="button"
                    data-mdb-ripple-color="dark"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </div>
              </td>
              <td>
                <div className="col-auto">
                  <a
                    className="btn btn-link btn-floating btn-lg text-dark m-1"
                    href="#!"
                    role="button"
                    data-mdb-ripple-color="dark"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              </td>
              <td>
                <div className="col-auto">
                  <a
                    className="btn btn-link btn-floating btn-lg text-dark m-1"
                    href="#!"
                    role="button"
                    data-mdb-ripple-color="dark"
                  >
                    <FontAwesomeIcon icon={faGoogle} />
                  </a>
                </div>
              </td>
              <td>
                <div className="col-auto">
                  <a
                    className="btn btn-link btn-floating btn-lg text-dark m-1"
                    href="#!"
                    role="button"
                    data-mdb-ripple-color="dark"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </td>
              <td>
                <div className="col-auto">
                  <a
                    className="btn btn-link btn-floating btn-lg text-dark m-1"
                    href="#!"
                    role="button"
                    data-mdb-ripple-color="dark"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
              </td>
              <td>
                <div className="col-auto">
                  <a
                    className="btn btn-link btn-floating btn-lg text-dark m-1"
                    href="#!"
                    role="button"
                    data-mdb-ripple-color="dark"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </section>
      </div>
      <div className="text-center text-white p-5" style={{ backgroundColor: "#214A87" }}>
        © 2023 Copyright:
        <a className="text-white" href="https://listatareasdeproyectoespecifico--fluffy-caramel-bdfa25.netlify.app/">
          SGDP.com
        </a>
      </div>
    </footer>



  );
};