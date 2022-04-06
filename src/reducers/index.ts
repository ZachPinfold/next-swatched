import { combineReducers } from "redux";
import { auth } from "./auth";
import { swatches } from "./swatches";
import { layout } from "./layout";
import { homepage } from "./homepage";
import { tutorials } from "./tutorials";

export default combineReducers({ auth, swatches, layout, homepage, tutorials });
