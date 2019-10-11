import React from "react";
import history from "../history";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const AppAside = props => {
  function handleClick() {
    history.goBack();
  }

  return (
    <div className="App__Aside">
      <div className="float-left">
        {props.visible === true && (
          <span>
            <ArrowBackIcon
              style={{
                fontSize: "60px",
                margin: "20px 0 0 20px",
                cursor: "pointer"
              }}
              fontSize="inherit"
              onClick={handleClick}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default AppAside;
