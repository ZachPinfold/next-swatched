import { combineReducers } from "redux";
import { auth } from "./auth";
import { swatches } from "./swatches";
import { layout } from "./layout";

export default combineReducers({ auth, swatches, layout });
