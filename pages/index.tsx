import store from "../store";
import Login from "../components/auth/Login/Login";
import Signup from "../components/auth/Signup/Signup";
import { useEffect, useRef, useState } from "react";
import { startLoadUser } from "../actions/auth";
import ModalWrapper from "../components/auth/Modal/ModalWrapper";
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
}

const Home = ({
  swatches,
  startGetUserSwatches,
  startGetHomepageSwatches,
  discoverSwatches,
  startClearHomepageSwatches,
}: InitialSwatch) => {
  const [swatchesUi, setSwatchesUi] = useState<(number[] | string)[]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [lockedSwatches, setLockedSwatches] = useState<number[][]>([]);
  const [refreshClick, setRefreshClick] = useState<boolean>(false);
  const [refreshClickRotation, setRefreshClickRotation] = useState<number>(0);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const discoverSwatchRef = useRef<Boolean>(false);
  const refreshRef = useRef<Boolean>(false);

  useEffect(() => {
    discoverSwatches.length == 0 && startGetHomepageSwatches();
  }, []);

  useEffect(() => {
    store.dispatch(startLoadUser() as any);
  }, []);

  useEffect(() => {
    startGetUserSwatches("", "all", true);
  }, [startGetUserSwatches]);

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

  console.log(swatchesUi);

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
        <FeaturedSwatches swatches={swatches} />

        {/* <h1>Get started by editing</h1> */}
        {/* <Signup /> */}
        {/* {modal && <ModalWrapper Component={<Login />} showModal={showModal} />} */}
        {/* <button onClick={() => showModal(true)}>Login</button> */}
      </div>
    </div>
  );
};

interface StateProps {
  swatches: SwatchObject[];
  discoverSwatches: number[][];
}

const mapStateToProps = (state: any): StateProps => ({
  swatches: state.swatches.swatches,
  discoverSwatches: state.homepage.discoverSwatches,
});

export default connect(mapStateToProps, {
  startGetUserSwatches,
  startGetHomepageSwatches,
  startClearHomepageSwatches,
})(Home);
