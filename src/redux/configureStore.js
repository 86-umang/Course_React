import { applyMiddleware, combineReducers, createStore } from "redux";
import { Dishes } from "./dishes";
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
import thunk from "redux-thunk";
import logger from "redux-logger";
import { InitialFeedback } from './forms';
import { createForms } from "react-redux-form";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers ({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store
}