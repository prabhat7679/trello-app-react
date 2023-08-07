import { useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import './App.css'
import Header from './components/Header'
import Lists from './components/Lists';
import Boards from './components/Boards'
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import ErrorPage from './components/ErrorPage';

const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';
const ADD_BOARD ='ADD_BOARD';
const reducer =(state, action)=>{
  switch(action.type)
  {
    case FETCH_SUCCESS :
      return{
        ...state,
        projects: action.payload,
        loading: false,
      };
      case FETCH_ERROR :
      return{
        ...state,
        error: action.payload,
        loading: false,
      }
      case ADD_BOARD :
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
      default:
        return state;
  }
}
function App() {

 const [state, dispatch]= useReducer(reducer,{
  projects:[],
  loading:true,
  error:null
 })

//  const {projects, loading, error} = state;

  const mainUrl = 'https://api.trello.com/1/members/me/boards?key=c194712381db71b3c67ec4558c35d43b&token=ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

  useEffect(() => {
    axios.get(mainUrl)
      .then(Response => {
        dispatch( {type: FETCH_SUCCESS, payload: Response.data});
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        dispatch( {type: FETCH_ERROR, payload: error});

      })
  }, []);

  const handleAddBoard = (name, backgroundImage) => {
    const newBoard = {
      id: Math.random().toString(),
      name: name,
      prefs: {
        backgroundImage
      },
    };

    dispatch({type:'ADD_BOARD', payload:newBoard});

  };

  
  return (
    <>
      {state.loading ? (<Loader />) :
        (
          <Routes>
            <Route path='/' element={
              <>
                <Header />
                <Boards projects={state.projects} onAddBoard={handleAddBoard} />
              </>
            }>
            </Route>

            <Route path='/Board/:id' element={
              <>
                <Header />
                <Lists />
              </>
            }></Route>
            <Route path='*' element={<ErrorPage/>}/>

          </Routes>
        )
      }
    </>
  )
}

export default App
