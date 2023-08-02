import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Card, SimpleGrid, CardHeader, Heading, useDisclosure } from '@chakra-ui/react';
import { InputGroup, Input, InputRightElement, Button, ButtonGroup } from '@chakra-ui/react';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'


export default function AddCard({id}) {

    const [isOpen, setIsOpen] = useState(false)
    const [cardName, setCardName] = useState([]);
    const [newCard, setNewCard]=useState('')

    // const id = useParams().id;
    // console.log(id)

    const apiKey = 'c194712381db71b3c67ec4558c35d43b';
    const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

    useEffect(() => {
        axios.get(
            `https://api.trello.com/1/lists/${id}/cards?key=${apiKey}&token=${apiToken}`)
            .then((response) => {
                setCardName(response.data);
               console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const addCardFn = async()=>{
       
        if (newCard.trim() !== '') {
            const card = newCard.trim();
            console.log(newCard)
            try {
                const response = await axios.post(

                    `https://api.trello.com/1/cards?idList=${id}&key=${apiKey}&token=${apiToken}`,{name:newCard})

                setCardName([...cardName, response.data]);

            } catch (error) {
                console.error('Error creating list on Trello:', error);
            }

        setNewCard('')
        onClose()
    }
}

    function cancelCardFn() {
        setNewCard('')
        setIsOpen(false)
    }

    function addCardInputFn() {
        setIsOpen(true);
        // setNewListName(''); 
    }

    const listNameChangeFn = (event) => {
        setNewCard(event.target.value)
    }

    const onClose = () => {
        setIsOpen(false);
    };


    const onToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* <Button onClick={AddCardFn} width='100%' colorScheme="gray" color='black'>+ Add card here</Button> */}
            {cardName.map((card, index) => {
                return (
                    <Card key={index} className="Card" height="fit-content"  backgroundColor='#e9e9f0' margin='3px'>
                        <CardHeader>
                            <Heading size="sm" margin={4}>
                                {card.name}
                            </Heading>

                        </CardHeader>
                    </Card>
                )
            })}
            <Card className="List" height="fit-content" background={'transparent'} cursor={'pointer'}>
                <Popover
                    returnFocusOnClose={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    placement='right'
                    closeOnBlur={false}
                >
                    <CardHeader>
                        <Heading size="sm" margin={4}>
                            <PopoverTrigger>
                                <Button onClick={() => { addCardInputFn(),onToggle()}}
                                    width='100%' colorScheme="gray" color='black'>+ Add card here</Button>
                            </PopoverTrigger>
                        </Heading>
                    </CardHeader>
                    <PopoverContent>
                        <PopoverHeader fontWeight='semibold'>Card</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody >

                            <input type="text" placeholder='Enter Card Name... ' style={{ padding: '10px', width: '100%' }}
                                value={newCard}
                                onChange={listNameChangeFn}
                            />

                        </PopoverBody>
                        <PopoverFooter display='flex' justifyContent='flex-end'>
                            <ButtonGroup size='sm'>
                                <Button onClick={cancelCardFn} variant='outline'>Cancel</Button>
                                <Button onClick={addCardFn} colorScheme='red'>Add</Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Card>
        </>
    )
}
