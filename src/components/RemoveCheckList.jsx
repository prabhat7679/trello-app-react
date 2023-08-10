import React from 'react'
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Box,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import axios from "axios";

const { VITE_KEY, VITE_TOKEN } = import.meta.env;

function RemoveCheckList({ id, setChecklistName }) {

  const initRef = React.useRef()
  const toast = useToast();

  // const apiKey = 'c194712381db71b3c67ec4558c35d43b';
  // const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

  async function deleteCheckList(listID) {
    try {
      const response = await axios.delete(
        `https://api.trello.com/1/checklists/${listID}?key=${VITE_KEY}&token=${VITE_TOKEN}`
      );
      setChecklistName(response.data);

      toast({
        title: 'Checklist Deleted',
        description: 'The checklist has been deleted successfully .',
        status: 'success',
        duration: 1000, 
        isClosable: true,
      });

    } catch (error) {
      console.error('Error updating data:', error);
    }
  }


  return (
    <>
    <Popover closeOnBlur={false} placement="bottom" initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button colorScheme="red" size="sm">
              Delete
            </Button>
          </PopoverTrigger>
          <PopoverContent color="black" borderColor="red.500">
            <PopoverArrow />
            <PopoverCloseButton color="white" />
            <PopoverHeader fontWeight="bold">Want to Delete!</PopoverHeader>
            <PopoverBody>
              <Box>
                Are you sure you want to delete this checklist?
              </Box>
            </PopoverBody>
            <PopoverBody display="flex" justifyContent="space-between">

              <Button
                colorScheme="gray"
                size="sm"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                colorScheme="red"
                size="sm"
                onClick={() => {
                  onClose();
                  deleteCheckList(id);
                }}
              >
                Delete
              </Button>



            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>

    
    </>

  )
}

export default RemoveCheckList;