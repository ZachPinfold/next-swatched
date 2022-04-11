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

  if (!loading) {
    return <>{Component} </>;
  } else {
    return (
      <div className="outer_loader">
        <div className="loader page_loader"></div>
      </div>
    );
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
