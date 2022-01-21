import React, { useEffect } from "react";
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
  useEffect(() => {
    if (isAuthenticatedLoading) {
      //auth is initialized and there is no user
      if (!isAuthenticated) {
        // remember the page that user tried to access

        router.push("/");
      }
    }
  }, []);

  console.log(isAuthenticatedLoading);

  if (isAuthenticatedLoading) {
    return null;
  } else return <>{Component} </>;
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
