import React, { useState } from 'react';
import { Card, CardBody, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBoards,setModel,setNewBoard} from '../Store/Slice/BoardSlice';


const Boards = () => {

  const projects = useSelector((state)=>state.boards.projects);
  const modalIsOpen = useSelector((state)=>state.boards.setModalIsOpen);
  const newBoardName= useSelector((state)=>state.boards.setNewBoardName);
  
  const dispatch =useDispatch();

  const handleShowAddBoardInput = () => {

    dispatch(setModel(true))
  };

  const closeModal = () => {
    dispatch(setModel(false));
  };

  const boardNameChangeFn = (event) => {
    dispatch(setNewBoard(event.target.value));
  };

  const addBoardFn = async () => {
    if (newBoardName.trim() !== '') {

      const apiKey = 'c194712381db71b3c67ec4558c35d43b';
      const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';
      const boardName = newBoardName.trim();

      try {
        const response = await axios.post(
          `https://api.trello.com/1/boards?key=${apiKey}&token=${apiToken}&name=${boardName}`
        );

        
        dispatch(addBoards([...projects,response.data]))

        // console.log('New board created on Trello:', response.data);

      } catch (error) {
        console.error('Error creating board on Trello:', error);
      }

      closeModal();
    }
  };


  return (
    <>
      <SimpleGrid 
        spacing={4}
        templateColumns='repeat(auto-fill, minmax(400px, 1fr))'
        padding='1em'
      >
        {/* Existing boards */}
        {projects.map((board) => {

          return (
            <Link key={board.id} to={`/Board/${board.id}`}>
              <Card backgroundImage={board.prefs.backgroundImage} height='200px'
              cursor='pointer'
              borderRadius='8px'
              boxShadow='md'
              _hover={{ boxShadow: 'lg' }} >
                <CardBody
                >{board.name}</CardBody>

              </Card>
            </Link>

          );
        })}

        {/* Create new board */}
        {projects.length < 10 ? (
          <Card backgroundColor='gray' onClick={handleShowAddBoardInput}>
            <CardBody display="flex" flexDirection='column' alignItems='center'
              justifyContent='center' gap='10px'>
              <p>Add new Board</p>
              <p>{10 - projects.length} remaning</p>
            </CardBody>
          </Card>) : ''}
      </SimpleGrid>

      {/* Modal for creating a new board */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            maxWidth: '400px',
            margin: 'auto',
            padding: '2em',
            borderRadius: '8px',
            textAlign: 'center',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: '1000',
          },
        }}
      >
        <h2>Set Title</h2>
        <input style={{ width: '100%', padding: '10px' }}
          type='text'
          placeholder='Enter board name'
          value={newBoardName}
          onChange={boardNameChangeFn}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1em' }}>

          <button onClick={addBoardFn}>Add</button>
          

        </div>
      </Modal>
    </>
  );
};

export default Boards;
