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
const {VITE_KEY, VITE_TOKEN} =import.meta.env;
import { useToast } from '@chakra-ui/react'

function RemoveCheckBox({checkListId, itemId, checkItems, setCheckItems}) {

  const toast = useToast();

    function deleteCheckItem(){
        axios
        .delete(
          `https://api.trello.com/1/checklists/${checkListId}/checkItems/${itemId}?key=${VITE_KEY}&token=${VITE_TOKEN}`
        )
        .then((response) => {
            const newData = checkItems.filter((item)=>{
                return item.id!==itemId
            })
            setCheckItems(newData);
     
            //     toast
            toast({
              title: 'CheckItem Deleted',
              description: 'The checkitem has been deleted successfully .',
              status: 'success',
              duration: 1000, 
              isClosable: true,
            });

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