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

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import PopUpCard from './PopUp';

export default function AddCard({ id }) {

    const [isOpen, setIsOpen] = useState(false)
    const [cardName, setCardName] = useState([]);
    const [newCard, setNewCard] = useState('')

    const [deleteCardId, setDeleteCardId] = useState(null);
    const cancelRef = React.useRef()

    // const id = useParams().id;
    // console.log(id)

    const apiKey = 'c194712381db71b3c67ec4558c35d43b';
    const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

    useEffect(() => {
        axios.get(
            `https://api.trello.com/1/lists/${id}/cards?key=${apiKey}&token=${apiToken}`)
            .then((response) => {
                setCardName(response.data);
                // console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const addCardFn = async () => {

        if (newCard.trim() !== '') {
            const card = newCard.trim();
            // console.log(newCard)
            try {
                const response = await axios.post(

                    `https://api.trello.com/1/cards?idList=${id}&key=${apiKey}&token=${apiToken}`, { name: newCard })

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

    const deleteConfirmation = async () => {
        try {
            await axios.delete(`https://api.trello.com/1/cards/${deleteCardId}?key=${apiKey}&token=${apiToken}`);
            // Update state to remove the deleted list from the 'list' array
            setCardName((prevCard) => prevCard.filter((item) => item.id !== deleteCardId));
        } catch (error) {
            console.error('Error deleting list from Trello:', error);
        } finally {
            setDeleteCardId(null)
        }
    };


    return (
        <>
            {cardName.map((card) => {
                return (
                    <Card key={card.id} className='Card' backgroundColor='#e9e9f0'>
                        <CardHeader display='flex' justifyContent='space-between' alignItems='center'>
                            
                            <PopUpCard id={card.id} name={card.name} />

                            <Button size='sm' colorScheme='red' onClick={() => setDeleteCardId(card.id)}>
                                x
                            </Button>
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
                        <PopoverTrigger>
                            <Button
                                onClick={() => {
                                    addCardInputFn();
                                    onToggle();
                                }}
                                width='100%'
                                colorScheme='teal'
                            >
                                + Add card here
                            </Button>
                        </PopoverTrigger>
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

            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={deleteCardId !== null}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Delete Card?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to delete this card?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={() => setDeleteCardId(null)}>Cancel</Button>
                        <Button colorScheme="red" ml={3} onClick={deleteConfirmation}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
