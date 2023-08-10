import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import Header from './components/Header'
import Lists from './components/Lists';
import Boards from './components/Boards'
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import ErrorPage from './components/ErrorPage';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards, addBoards} from './Store/Slice/BoardSlice';
import { setLoading, setError} from './Store/Slice/LoadingError';
function App() {


  const dispatch =useDispatch();
  const projects = useSelector((state)=>state.boards)
  const { isLoading, error } = useSelector((state) => state.loadingError); 
  
  // const [projects, setProjects] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const mainUrl = 'https://api.trello.com/1/members/me/boards?key=c194712381db71b3c67ec4558c35d43b&token=ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

  useEffect(() => {
    axios.get(mainUrl)
      .then(Response => {
        return Response.data;
      })
      .then(data => {
        // console.log(data)
        dispatch(setBoards(data));

      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // setError(error);
        dispatch(setError(error.message))

      })
      .finally(() => {
        // setLoading(false);
        dispatch(setLoading(false))
      })
  }, [dispatch]);


  const handleAddBoard = (name, backgroundImage) => {
    const newBoard = {
      id: Math.random().toString(),
      name: name,
      prefs: {
        backgroundImage
      },
    };

   dispatch(addBoards(newBoard))

  };

  return (
    <>
      {isLoading? (<Loader />) :
        (
          <Routes>
            <Route path='/' element={
              <>
                <Header />
                <Boards />
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
