import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NextRouter, useRouter } from "next/router";

interface Actions {
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  Component: JSX.Element;
}

const PrivateRoute = ({
  isAuthenticated,
  isAuthenticatedLoading,
  Component,
}: Actions) => {
  const router: NextRouter = useRouter();

  const [loading, setLoaded] = useState(true);

  useEffect(() => {
    if (!isAuthenticatedLoading && !isAuthenticated) {
      router.push("/");
    }
    if (!isAuthenticatedLoading && isAuthenticated) setLoaded(false);
  }, [isAuthenticatedLoading, isAuthenticated]);

  console.log("loading", loading);

  if (!loading) {
    console.log("loaded");

    return <>{Component} </>;
  } else {
    console.log("loading");

    return <h1 style={{ marginTop: "200px" }}>loading</h1>;
  }
};

interface StateProps {
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
}

const mapStateToProps = (state: any): StateProps => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthenticatedLoading: state.auth.loading,
});

export default connect(mapStateToProps, {})(PrivateRoute);
