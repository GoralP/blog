import { combineReducers, createStore, applyMiddleware } from "redux";
// import loginReducer from "./auth/reducers/loginReducer";
// import RegistrationReducer from "./auth/reducers/registrationReducer";
// import tagReducers from "./tags/reducers";
// import categoryReducers from "./categories/reducers";
// import postReducers from "./posts/reducers";
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
