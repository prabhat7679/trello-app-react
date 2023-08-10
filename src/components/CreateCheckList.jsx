import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";

const {VITE_KEY, VITE_TOKEN} =import.meta.env;


function CreateCheckList({id, setChecklistName}) {

    const [tempName, setTempName] = useState('');
    const toast= useToast();
   
    async function createCheckList(tempName) {
      if (tempName.length >= 2) {
        try {
          const response = await axios.post(
            `https://api.trello.com/1/checklists?idCard=${id}&key=${VITE_KEY}&token=${VITE_TOKEN}`,
            { name: tempName }
          );
          setChecklistName(response.data);

          toast({
            title: 'CheckList Created ',
            description: 'The checklist has been created successfully .',
            status: 'success',
            duration: 2000, 
            isClosable: true,
          });


        } catch (error) {
          console.error('Error creating board:', error);
        }
      }
    }
    


  return (
    <Card className="card" height="fit-content" background={'transparent'} cursor={'pointer'}>
    <InputGroup >
        <Input placeholder="Enter CheckList Name..." onChange={(event)=>{setTempName(event.target.value)}} value={tempName}/>
      </InputGroup>
      <Button color='blue'  onClick={()=>{
            createCheckList(tempName);
            setTempName('');
          }}>Add</Button>
  </Card>
  )
}

export default CreateCheckList