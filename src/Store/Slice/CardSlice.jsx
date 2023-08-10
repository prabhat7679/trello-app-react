import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name:'cards',
    initialState:{
        cardName:{}
    },
    reducers:{
        setCards:(state, action)=>{
            state.cardName[action.payload.id]=action.payload.data;
        },
        addCard: (state, action) => {
            state.cardName[action.payload.id] = [...state.cardName[action.payload.id], action.payload.data]
        },
        deleteCard: (state, action) => {
            state.cardName[action.payload.id]=action.payload.data;
        }
        
    }
})

export const {setCards, addCard, deleteCard} = cardSlice.actions;
export default cardSlice.reducer;