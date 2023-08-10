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

function CreateCheckBox({checkListId, setCheckItems}) {
  const toast = useToast()
  const [tempName, setTempName] = useState('');
    
  function createCheckItem(tempName){
    if(tempName.length >1){
    axios.post(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${tempName}&key=${VITE_KEY}&token=${VITE_TOKEN}`)
    .then(response => {
      console.log('CheckItem created:');
      setCheckItems((oldData)=>[...oldData,response.data]);
   
      toast({
        title: 'CheckItem Created ',
        description: 'The checkitem has been created successfully .',
        status: 'success',
        duration: 2000, 
        isClosable: true,
      });

    })
    .catch(error => {
      console.error('Error creating box:', error);
    });
    }
    console.log(tempName);
  }
  return (
    <Card width={'2xs'} margin={'auto'} className="card" height="fit-content" background={'transparent'} cursor={'pointer'} marginTop={5}>
    <InputGroup>
        <Input placeholder="Enter Check Item.." onChange={(event)=>{setTempName(event.target.value)}} value={tempName}/>
        <InputRightElement >
          <Button onClick={()=>{
            createCheckItem(tempName);
            setTempName('');
          }}>+</Button>
        </InputRightElement>
      </InputGroup>
  </Card>
  )
}

export default CreateCheckBox