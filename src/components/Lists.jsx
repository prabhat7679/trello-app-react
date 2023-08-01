import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Card, SimpleGrid,CardHeader,Heading } from '@chakra-ui/react';
import { InputGroup, Input, InputRightElement,Button } from '@chakra-ui/react';

export default function Lists() {

    const [list, setList] = useState([]);

    const id = useParams().id;
    // console.log(id)

    const apiKey = 'c194712381db71b3c67ec4558c35d43b';
    const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';
    
    useEffect(() => {
        axios
          .get(
            `https://api.trello.com/1/boards/${id}/lists/?key=${apiKey}&token=${apiToken}`
          )
          .then((response) => {
            setList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);

      console.log(list)

  return (
    <>
    <SimpleGrid
      spacing={4}
      margin={20}
      templateColumns="repeat(auto-fill, minmax(300px, 10fr))"
    >
      {list.map((board) => {
        return (
          <Card className="List" height="fit-content">
            <CardHeader>
              <Heading size="sm" margin={4}>
                {board.name}
              </Heading>

              <InputGroup>
                <Input placeholder="Enter text here..." />
                <InputRightElement>
                  <Button colorScheme="blue">+</Button>
                </InputRightElement>
              </InputGroup>
            </CardHeader>
          </Card>
        );
      })}
      <Card className="List" height="fit-content" background={'transparent'} cursor={'pointer'}>
            <CardHeader>
              <Heading size="sm" margin={4}>
              <Button colorScheme="blue">+</Button> New List
              </Heading>
            </CardHeader>
          </Card>
  
    </SimpleGrid>
  </>
);
}
