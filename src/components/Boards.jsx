import React, { useState } from 'react';
import { Card, CardBody, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';


const Boards = ({ projects, onAddBoard }) => {

  const [addBoardInput, setAddBoardInput] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleShowAddBoardInput = () => {
    // setAddBoardInput(true);
    setModalIsOpen(true)
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleCancelAddBoard = () => {
    // setAddBoardInput(false);
    setNewBoardName('');
    closeModal()
  };

  const handleBoardNameChange = (e) => {
    setNewBoardName(e.target.value);
  };

  const handleAddBoard = async () => {
    if (newBoardName.trim() !== '') {
      onAddBoard(newBoardName);

      const apiKey = 'c194712381db71b3c67ec4558c35d43b';
      const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';
      const boardName = newBoardName.trim();

      try {
        // Make the API request to create a new board on Trello
        const response = await axios.post(
          `https://api.trello.com/1/boards?key=${apiKey}&token=${apiToken}&name=${boardName}`
        );

        // The response will contain the details of the newly created board on Trello
        console.log('New board created on Trello:', response.data);
      } catch (error) {
        console.error('Error creating board on Trello:', error);
      }

      closeModal();
      // setAddBoardInput(false);
      setNewBoardName('');
    }
  };


  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns='repeat(auto-fill, minmax(400px, 1fr))'
        padding='1em'
      // height='300px'
      >
        {/* Existing boards */}
        {projects.map((board) => {
          // {console.log(board.id)}
          return (
            <Link to={`/Board/${board.id}`}>
              <Card key={board.id} backgroundImage={board.prefs.backgroundImage} height='200px' >
                <CardBody>{board.name}</CardBody>

              </Card>
            </Link>

          );
        })}

        {/* Create new board */}
        {projects.length < 10 ? (
          <Card backgroundColor='gray' onClick={handleShowAddBoardInput}>
            <CardBody >
              <p>Add new Board</p>
              <p>{10 - projects.length}remaning</p>
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
          onChange={handleBoardNameChange}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1em' }}>

          <button onClick={handleAddBoard}>Add</button>

          <button onClick={handleCancelAddBoard}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default Boards;
