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

function CreateCheckList({id, setChecklistName}) {

    const [tempName, setTempName] = useState('');
    const apiKey = 'c194712381db71b3c67ec4558c35d43b';
    const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';
    
  function createCheckList(tempName){
    if(tempName.length >1){
    axios.post(`https://api.trello.com/1/checklists?idCard=${id}&key=${apiKey}&token=${apiToken}`,
    {name:tempName})
    .then(response => {

      setChecklistName(response.data);
    })
    .catch(error => {
      console.error('Error creating board:', error);
    });
    }
    console.log(tempName);
  }


  return (
    <Card className="card" height="fit-content" background={'transparent'} cursor={'pointer'}>
    <InputGroup>
        <Input placeholder="Enter CheckListName..." onChange={(event)=>{setTempName(event.target.value)}} value={tempName}/>
        <InputRightElement >
          <Button onClick={()=>{
            createCheckList(tempName);
            setTempName('');
          }}>Add</Button>
        </InputRightElement>
      </InputGroup>
  </Card>
  )
}

export default CreateCheckList