import React from 'react'
import {Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Box,
    } from "@chakra-ui/react";
import axios from "axios";


function RemoveCheckList({id, setUpdate}) {

    const apiKey = 'c194712381db71b3c67ec4558c35d43b';
    const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';
 
    function deleteCheckList(listID){
      axios
      .delete(
        `https://api.trello.com/1/checklists/${listID}?key=${apiKey}&token=${apiToken}`
      )
      .then((response) => {
        setUpdate(response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
    }

    const initRef = React.useRef()
  return (
  <Popover closeOnBlur={false} placement='bottom' initialFocusRef={initRef}>
  {({ isOpen, onClose }) => (
    <>
      <PopoverTrigger>
        <Button>Delete</Button>
      </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Want to Delete!</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Box>
              Deleting a checklist 
            </Box>
            <Button
              colorScheme='red'
              onClick={
                ()=>{ onClose(), deleteCheckList(id)}}
              ref={initRef}
            >
              Delete
            </Button>
          </PopoverBody>
        </PopoverContent>
    </>
  )}
</Popover>
  )
}

export default RemoveCheckList