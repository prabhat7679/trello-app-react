import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import Header from './components/Header'
import Lists from './components/Lists';
import Boards from './components/Boards'
import { Route, Routes } from 'react-router-dom';


function App() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mainUrl = 'https://api.trello.com/1/members/me/boards?key=c194712381db71b3c67ec4558c35d43b&token=ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

  useEffect(() => {
    axios.get(mainUrl)
      .then(Response => {
        return Response.data;
      })
      .then(data => {
        // console.log(data)
        setProjects(data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);

      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  const handleAddBoard = (name) => {
    const newBoard = {
      id: Math.random().toString(),
      name: name,
      prefs: {
        backgroundImage: '', // Set the background image URL if needed
      },
    };

    setProjects([...projects, newBoard]);
  };


  return (
    <>
      <Routes>

        <Route path='/' element={
          <>
            <Header />
            <Boards projects={projects} onAddBoard={handleAddBoard} />
          </>
        }>
        </Route>

        <Route path='/Board/:id' element={
          <>
            <Header />
            <Lists projects={projects}/>
          </>
        }></Route>

      </Routes>
    </>
  )
}

export default App
