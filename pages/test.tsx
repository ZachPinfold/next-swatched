import React from "react";
import PrivateRoute from "../components/routing/PrivateRoute";

const test = () => {
  return (
    <PrivateRoute
      Component={<h1 style={{ marginTop: "400px" }}>Test</h1>}
    ></PrivateRoute>
  );
};

export default test;
