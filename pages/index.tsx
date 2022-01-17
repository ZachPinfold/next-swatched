import styles from "../styles/Home.module.css";
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
import { startGetHomepageSwatches } from "../actions/homepage";

interface InitialSwatch {
  swatches: any[];
  startGetUserSwatches: (
    userUid: string,
    colorFilter: string,
    isInitialLoad: boolean
  ) => void;
  startGetHomepageSwatches: () => void;
}

const Home = ({
  swatches,
  startGetUserSwatches,
  startGetHomepageSwatches,
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

  useEffect(() => {
    startGetHomepageSwatches();
  }, []);

  useEffect(() => {
    store.dispatch(startLoadUser() as any);
  }, []);

  useEffect(() => {
    startGetUserSwatches("", "all", true);
  }, [startGetUserSwatches]);

  useEffect(() => {
    getInititalSwatches();
  }, []);

  // const [modal, showModal] = useState(false);

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
    } catch (error) {
      console.log(error);
    }
  };

  const getInititalSwatches = async () => {
    let result;

    try {
      const url = "http://colormind.io/api/";
      const data = {
        model: "default",
      };
      const headers = {
        "Content-Type": "text/plain",
      };
      const colorPallete = await axios.post(url, data, { headers });
      result = colorPallete.data.result;
      setSwatchesUi(result);
      result && setInitialLoad(true);
    } catch (error) {
      console.log("error", error);
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

// export async function getServerSideProps() {
//   let result;

//   try {
//     const url = "http://colormind.io/api/";
//     const data = {
//       model: "default",
//     };
//     const headers = {
//       "Content-Type": "text/plain",
//     };
//     const colorPallete = await axios.post(url, data, { headers });
//     result = colorPallete.data.result;
//   } catch (error) {
//     console.log("error", error);
//   }

//   return {
//     props: {
//       swatches: result,
//     },
//   };
// }

interface StateProps {
  swatches: SwatchObject[];
}

const mapStateToProps = (state: any): StateProps => ({
  swatches: state.swatches.swatches,
});

export default connect(mapStateToProps, {
  startGetUserSwatches,
  startGetHomepageSwatches,
})(Home);
