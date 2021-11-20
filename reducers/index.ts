import { combineReducers } from "redux";
import { auth } from "./auth";
import { swatches } from "./swatches";
export default combineReducers({ auth, swatches });
