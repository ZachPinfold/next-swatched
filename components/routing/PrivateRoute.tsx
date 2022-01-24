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

  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    if (!isAuthenticatedLoading && !isAuthenticated) {
      router.push("/");
    }
    if (!isAuthenticatedLoading && isAuthenticated) setLoaded(false);
  }, [isAuthenticatedLoading, isAuthenticated]);

  if (!loaded) {
    console.log("loaded");

    return <>{Component} </>;
  } else {
    return <h1>loading</h1>;
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
