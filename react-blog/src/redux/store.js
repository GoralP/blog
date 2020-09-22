import { combineReducers, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import {
  loginReducer,
  categoryReducers,
  postReducers,
  tagReducers,
} from "./reducers";

const rootReducer = combineReducers({
  loginReducer,
  postReducers,
  tagReducers,
  categoryReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
