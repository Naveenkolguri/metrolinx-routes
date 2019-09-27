import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import routeDataReducer from "../reducer/reducer";

export default createStore(routeDataReducer, {routes: [], directions: [], stops: {}}, applyMiddleware(thunk));