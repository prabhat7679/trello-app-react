import { createSlice } from "@reduxjs/toolkit"

const BoardSlice = createSlice({
    name:'boards',
    initialState:{
        projects :[],
        setModalIsOpen:false,
        setNewBoardName:'',
    },
    reducers:{
        setBoards :( state, action)=>{
            state.projects = action.payload;
        },

        addBoards :(state, action)=>{
            state.projects=action.payload;
        },

        setModel : (state, action)=> {
            state.setModalIsOpen = action.payload;
        },

        setNewBoard :(state, action)=>{
           state.setNewBoardName= action.payload;
        }
       
    }
})

export const {setBoards, addBoards, setModel, setNewBoard} = BoardSlice.actions;
export default BoardSlice.reducer;