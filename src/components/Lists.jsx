import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  SimpleGrid,
  CardHeader,
  Heading,
  useDisclosure,
  Box,
  Flex,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton } from '@chakra-ui/react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton } from '@chakra-ui/react';
import AddCard from './AddCard';

export default function Lists() {
  const { onOpen } = useDisclosure();
  const cancelRef = React.useRef();

  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const id = useParams().id;

  const apiKey = 'c194712381db71b3c67ec4558c35d43b';
  const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

  useEffect(() => {
    axios.get(`https://api.trello.com/1/boards/${id}/lists/?key=${apiKey}&token=${apiToken}`)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addListFn = async () => {
    if (newListName.trim() !== '') {
      const listName = newListName.trim();
      try {
        const response = await axios.post(
          `https://api.trello.com/1/lists?name=${listName}&idBoard=${id}&key=${apiKey}&token=${apiToken}`
        );
        setList([...list, response.data]);
      } catch (error) {
        console.error('Error creating list on Trello:', error);
      }
      setNewListName('');
      onClose();
    }
  };

  function cancelListFn() {
    setNewListName('');
    setIsOpen(false);
  }

  function addListInputFn() {
    setIsOpen(true);
  }

  const listNameChangeFn = (event) => {
    setNewListName(event.target.value);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const [deleteListId, setDeleteListId] = useState(null);

  const deleteConfirmation = async () => {
    try {
      await axios.put(
        `https://api.trello.com/1/lists/${deleteListId}/closed?key=${apiKey}&token=${apiToken}`,
        { value: true }
      );
      // Update state to remove the deleted list from the 'list' array
      setList((prevList) => prevList.filter((item) => item.id !== deleteListId));
    } catch (error) {
      console.error('Error deleting list from Trello:', error);
    } finally {
      setDeleteListId(null);
    }
  };

  return (
    <Flex direction="column" alignItems="center">
     
      {/* List elements */}
      <Box flex='1' w="100%" overflowX="auto">
        
        <SimpleGrid
          key={id}
          spacing={4}
          margin={20}
          height={'75vh'}
          // templateColumns="repeat(auto-fill, minmax(300px, 10fr))"
          display="flex"
          width="100%"
        >
          {list.map((board) => (
            <Card key={board.id} className="List" height="fit-content" minW="300px">
              <CardHeader>
                <Heading size="sm" margin={4} display="flex" justifyContent="space-between">
                  {board.name}
                  <Button onClick={() => setDeleteListId(board.id)} colorScheme="red" variant="outline" size="sm">
                    x
                  </Button>
                </Heading>
                <AddCard id={board.id} />
              </CardHeader>
            </Card>
          ))}
          <Card className="List" height="fit-content" background="transparent" cursor="pointer" minWidth={300}>
            <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} placement="right" closeOnBlur={false}>
              <CardHeader>
                <Heading size="sm" margin={4}>
                  <PopoverTrigger>
                    <Button onClick={onToggle} width="100%" colorScheme="blue">
                      + Add New List
                    </Button>
                  </PopoverTrigger>
                </Heading>
              </CardHeader>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">LIST</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Enter List Name..."
                      value={newListName}
                      onChange={listNameChangeFn}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={addListFn} colorScheme="red">
                        Add
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </PopoverBody>
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <ButtonGroup size="sm">
                    <Button onClick={cancelListFn} variant="outline">
                      Cancel
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Card>
        </SimpleGrid>
      </Box>
      {/* Delete List Confirmation Dialog */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={deleteListId !== null}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete List?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to delete this list?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setDeleteListId(null)}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3} onClick={deleteConfirmation}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
}
