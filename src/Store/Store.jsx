import { configureStore } from "@reduxjs/toolkit";
import CardReducer from "./Slice/CardSlice";
import BoardReducer from "./Slice/BoardSlice";
import LoadingError from "./Slice/LoadingError";
import ListSlice from "./Slice/ListSlice";
// import rootReaducer from '.Slice/reducers';

const store =configureStore({
    reducer :{
        loadingError :LoadingError,
        boards :BoardReducer,
        lists: ListSlice,
        cards : CardReducer,
    }
})

export default store;