import React from "react";

import Typography from "@material-ui/core/Typography";

function GoogleBtn() {
  return (
    <a
      href="http://localhost:3001/api/user/auth/google"
      style={{ color: "white", textDecoration: "none", textAlign: "center" }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          backgroundColor: "#3EA0EB",
          alignItems: "center",
          // justifyContent: "center"
          padding: 5,
          marginBottom: 10
        }}
      >
        <img
          src="./images/google-icon.png"
          alt="google icon"
          style={{ width: 40 }}
        />
        <Typography
          component="h1"
          style={{
            fontSize: "20px",
            textTransform: "uppercase",
            marginLeft: 72
          }}
        >
          Sign In with Google
        </Typography>
      </div>
    </a>
  );
}

export default GoogleBtn;
