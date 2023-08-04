import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

function CreateCheckBox({checkListId, setCheckItems}) {

    const apiKey = 'c194712381db71b3c67ec4558c35d43b';
    const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

    const [tempName, setTempName] = useState('');
    
  function createCheckItem(tempName){
    if(tempName.length >1){
    axios.post(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${tempName}&key=${apiKey}&token=${apiToken}`)
    .then(response => {
      console.log('CheckItem created:');
      setCheckItems((oldData)=>[...oldData,response.data]);
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