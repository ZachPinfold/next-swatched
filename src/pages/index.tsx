import Login from "../components/auth/Login/Login";
import Signup from "../components/auth/Signup/Signup";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import ModalWrapper from "../components/Modal/ModalWrapper";
import SwatchPicker from "../components/swatch picker/SwatchPicker";
import axios from "axios";
import TitleArea from "../components/swatch picker/left title area/TitleArea";
import RefreshButton from "../components/swatch picker/button/RefreshButton";
import FeaturedSwatches from "../components/featured swatches/FeaturedSwatches";
import { SwatchObject } from "../types/swatches";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../actions/swatch";
import Instructions from "../components/swatch picker/Instructions";
import {
  startClearHomepageSwatches,
  startGetHomepageSwatches,
} from "../actions/homepage";
import { startIsResponsive, startShowModal } from "../actions/layout";
import { buildNoneAuthColors } from "../utils/swatch";
import Responsive from "../components/utils/Responsive";

interface InitialSwatch {
  swatches: any[];
  startGetUserSwatches: (
    userUid: string,
    colorFilter: string,
    isInitialLoad: boolean
  ) => void;
  startGetHomepageSwatches: () => void;
  discoverSwatches: number[][];
  startClearHomepageSwatches: () => void;
  startShowModal: (modal: boolean, type: string) => void;
  modal: boolean;
  modalType: string;
  isAuthenticatedLoading: boolean;
  isAuthenticated: boolean;
  userID: string;
  startIsResponsive: (isLarge: boolean) => void;
}

const Home = ({
  swatches,
  startGetUserSwatches,
  startGetHomepageSwatches,
  discoverSwatches,
  startClearHomepageSwatches,
  modal,
  startShowModal,
  modalType,
  isAuthenticated,
  isAuthenticatedLoading,
  startIsResponsive,
  userID,
}: InitialSwatch) => {
  const [swatchesUi, setSwatchesUi] = useState<(number[] | string)[]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const noneAuthColours = buildNoneAuthColors();

  const [lockedSwatches, setLockedSwatches] = useState<number[][]>([]);
  const [refreshClick, setRefreshClick] = useState<boolean>(false);
  const [refreshClickRotation, setRefreshClickRotation] = useState<number>(0);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const discoverSwatchRef = useRef<Boolean>(false);
  const refreshRef = useRef<Boolean>(false);

  Responsive(startIsResponsive);

  useEffect(() => {
    discoverSwatches.length == 0 && startGetHomepageSwatches();
  }, []);

  useEffect(() => {
    userID.length > 0 && startGetUserSwatches(userID, "all", true);
  }, [startGetUserSwatches, userID]);

  useEffect(() => {
    if (discoverSwatches.length > 0 && !discoverSwatchRef.current) {
      setSwatchesUi(discoverSwatches);
      setInitialLoad(true);
      discoverSwatchRef.current = true;
    }
  }, [discoverSwatches]);

  useEffect(() => {
    return () => {
      refreshRef.current && startClearHomepageSwatches();
    };
  }, []);

  // handleRefresh handles the refreshing of the colour palette from the client.
  // Checks for locked colours and retains they're position

  const handleRefresh = async () => {
    try {
      let swatchesForRefresh;

      if (lockedSwatches) {
        swatchesForRefresh = swatchesUi.map((s) =>
          typeof s !== "string" && !lockedSwatches.includes(s)
            ? (s = "N")
            : (s = s)
        );
      } else swatchesForRefresh = swatchesUi;

      const data = {
        model: "default",
        input: swatchesForRefresh,
      };

      const apiResponse = await axios.post("/api/colorMind", data);

      const result = swatchesForRefresh.map((a, index) => {
        if (a === "N") a = apiResponse.data.colourData[index];
        return a;
      });

      typeof result[0] !== "string" && setSwatchesUi(result);

      setRefreshClick(false);
      refreshRef.current = true;
    } catch (error) {
      console.log(error);
    }
  };

  let AuthFunc: FunctionComponent;

  modalType === "login" ? (AuthFunc = Login) : (AuthFunc = Signup);

  return (
    <div className="wrapper">
      <div className="home_column">
        <TitleArea />

        <div className="outer_area">
          <div className="wrapper_inner">
            <h1 className="sub_title">Discover</h1>

            <Instructions refreshClick={refreshClick} />
            <SwatchPicker
              swatches={swatchesUi}
              setLockedSwatches={setLockedSwatches}
              lockedSwatches={lockedSwatches}
              initialLoadRef={initialLoad}
            />
            <RefreshButton
              refreshClick={refreshClick}
              setRefreshClick={setRefreshClick}
              refreshClickRotation={refreshClickRotation}
              setRefreshClickRotation={setRefreshClickRotation}
              handleRefresh={handleRefresh}
            />
          </div>
        </div>
        {!isAuthenticatedLoading && (
          <FeaturedSwatches
            isAuthenticated={isAuthenticated}
            swatches={
              isAuthenticatedLoading
                ? noneAuthColours
                : !isAuthenticated && !isAuthenticatedLoading
                ? noneAuthColours
                : swatches
            }
          />
        )}

        {modal && (
          <ModalWrapper Component={<AuthFunc />} showModal={startShowModal} />
        )}
      </div>
    </div>
  );
};

interface StateProps {
  swatches: SwatchObject[];
  discoverSwatches: number[][];
  modal: boolean;
  modalType: string;
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  userID: string;
}

const mapStateToProps = (state: any): StateProps => ({
  swatches: state.swatches.swatches,
  discoverSwatches: state.homepage.discoverSwatches,
  modal: state.layout.modal,
  modalType: state.layout.modalType,
  isAuthenticated: state.auth.isAuthenticated,
  isAuthenticatedLoading: state.auth.loading,
  userID: state.auth.userID,
});

export default connect(mapStateToProps, {
  startGetUserSwatches,
  startGetHomepageSwatches,
  startClearHomepageSwatches,
  startShowModal,
  startIsResponsive,
})(Home);
