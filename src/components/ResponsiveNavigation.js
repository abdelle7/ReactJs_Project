import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";

function ResponsiveNavigation({
  background,
  hoverBackground,
  linkColor,
  navLinks,
  logo
}) {
  // eslint-disable-next-line
  const [navOpen, setNavOpen] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const email = localStorage.getItem("email");
  const nom = localStorage.getItem("nom");

  const logout = () => {
    localStorage.clear();
    window.location = "/sign-in";
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav
      className="responsive-toolbar"
      style={{ background: background, listStyleType: "non" }}
    >
      <Accordion defaultActiveKey="0">
        <ul
          style={{ background: background }}
          className={navOpen ? "active px-0" : "px-0"}
        >
          {/*<figure className="image-logo" onClick={ () => { setNavOpen(!navOpen) } }>
                    <img src={ logo } height="40px" width="40px" alt="toolbar-logo" />
                </figure>
                */}
          <div style={{ backgroundColor: "#535353" }}>
            <Button
              style={{
                backgroundColor: "#535353",
                color: "#fff",
                width: "300px",
                fontSize: "12px",
                borderRadius: "0px"
              }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Image
                src="https://www.w3schools.com/howto/img_avatar.png"
                style={{ widows: "40px", height: "40px", marginRight: "10px" }}
                rounded
              />
              {nom}
              <br></br>
              {email}
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profil</MenuItem>
              <MenuItem onClick={handleClose}>Annes support</MenuItem>
              <MenuItem onClick={handleClose}>Changer la langue</MenuItem>
              <MenuItem onClick={logout}>Se deconnecter</MenuItem>

              <hr
                style={{
                  color: "#686E77",
                  backgroundColor: "#686E77",
                  height: 0.2
                }}
              />
              <MenuItem onClick={handleClose}>Passe en mode terminal</MenuItem>
            </Menu>
          </div>

          {navLinks.map((link, index) => (
            <li
              className="Navli pl-5"
              key={index}
              onMouseEnter={() => {
                setHoverIndex(index);
              }}
              onMouseLeave={() => {
                setHoverIndex(-1);
              }}
              style={{
                background:
                  hoverIndex === index ? hoverBackground || "#999" : ""
              }}
            >
              <Accordion.Toggle as={Button} eventKey={index}>
                <Link
                  className="FormField__LinkDiable"
                  to={link.path}
                  style={{ color: linkColor, fontSize: "18px" }}
                >
                  {" "}
                  {link.text}
                  <i className={`float-left pr-4 ${link.icon}`} />
                </Link>
              </Accordion.Toggle>
              {(() => {
                switch (link.text) {
                  case "Parametres":
                    return (
                      <Accordion.Collapse eventKey={index}>
                        <ul
                          className="Navli"
                          key={index}
                          onMouseEnter={() => {
                            setHoverIndex(index);
                          }}
                          onMouseLeave={() => {
                            setHoverIndex(-1);
                          }}
                          style={{
                            background:
                              hoverIndex === index
                                ? hoverBackground || "#999"
                                : ""
                          }}
                        >
                          <li>
                            <Link
                              style={{ color: linkColor, fontSize: "18px" }}
                              to="/details"
                            >
                              Detail du compte
                            </Link>
                          </li>
                          <li style={{ marginTop: "10px" }}>
                            <Link
                              style={{ color: linkColor, fontSize: "18px" }}
                              to="/users"
                            >
                              Utilisateurs
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Collapse>
                    );
                  case "Platforms":
                    return (
                      <Accordion.Collapse eventKey={index}>
                        <ul
                          className="Navli"
                          key={index}
                          onMouseEnter={() => {
                            setHoverIndex(index);
                          }}
                          onMouseLeave={() => {
                            setHoverIndex(-1);
                          }}
                          style={{
                            background:
                              hoverIndex === index
                                ? hoverBackground || "#fff"
                                : ""
                          }}
                        >
                          <li style={{ listStyleType: "non", color: "green" }}>
                            <Link
                              style={{ color: linkColor, fontSize: "18px" }}
                              to="/datatable"
                            >
                              test
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Collapse>
                    );
                  default:
                    return null;
                }
              })()}
            </li>
          ))}
        </ul>
      </Accordion>
    </nav>
  );
}

export default ResponsiveNavigation;
