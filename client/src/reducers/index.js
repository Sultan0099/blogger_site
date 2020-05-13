import { combineReducers } from "redux";

import testReducer from "./testReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  test: testReducer,
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
