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

function RemoveCheckBox({checkListId,itemId,checkItems, setCheckItems}) {

    const apiKey = 'c194712381db71b3c67ec4558c35d43b';
    const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

    function deleteCheckItem(){
        axios
        .delete(
          `https://api.trello.com/1/checklists/${checkListId}/checkItems/${itemId}?key=${apiKey}&token=${apiToken}`
        )
        .then((response) => {
            const newData = checkItems.filter((item)=>{
                return item.id!==itemId
            })
            setCheckItems(newData);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
      }
    const initRef = React.useRef()
  return (
    <Popover closeOnBlur={false} placement="bottom" initialFocusRef={initRef}>
    {({ isOpen, onClose }) => (
      <>
        <PopoverTrigger>
          <Button colorScheme="red" size="sm" >
            x
          </Button>
        </PopoverTrigger>
        <PopoverContent  color="black" borderColor="red.500">
          <PopoverArrow />
          <PopoverCloseButton color="white" />
          <PopoverHeader fontWeight="bold">Want to Delete!</PopoverHeader>
          <PopoverBody>
            <Box>
              Are you sure you want to delete this checkitem?
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
                deleteCheckItem()
              }}
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

export default RemoveCheckBox;