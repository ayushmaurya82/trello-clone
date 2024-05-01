import { createStore, combineReducers, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { reducer as boardReducer } from "./boardReducer";
import { enableMapSet } from 'immer'

enableMapSet()
const rootReducer = combineReducers({
  boardReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
