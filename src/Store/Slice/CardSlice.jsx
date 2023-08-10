import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name:'cards',
    initialState:[],
    reducers:{
        setCards:(state, action)=>action.payload,
        addCard :(state, action)=>[...state, action.payload],
        deleteCard :(state, action)=>
        state.filter((card)=>{
            return card.id !== action.payload
        })
    }
})

export const {setCards, addCard, deleteCard} = cardSlice.actions;
export default cardSlice.reducer;