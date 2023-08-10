import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, CardHeader} from '@chakra-ui/react';
import {  Button, ButtonGroup } from '@chakra-ui/react';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
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
import { useDispatch, useSelector } from 'react-redux';
import { addCard, deleteCard, setCards } from '../Store/Slice/CardSlice';

export default function AddCard({ id }) {

    const dispatch = useDispatch();
    const cardName = useSelector((state) => state.cards.cardName);

    const [isOpen, setIsOpen] = useState(false)
    const [newCard, setNewCard] = useState('')
    const [deleteCardId, setDeleteCardId] = useState(null);
    const cancelRef = React.useRef()

    const apiKey = 'c194712381db71b3c67ec4558c35d43b';
    const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

    useEffect(() => {
        axios.get(
            `https://api.trello.com/1/lists/${id}/cards?key=${apiKey}&token=${apiToken}`)
            .then((response) => {
                dispatch(setCards({ 'id': id, 'data': response.data }));
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const addCardFn = async () => {

        if (newCard.trim() !== '') {
            const card = newCard.trim();
            try {
                const response = await axios.post(

                    `https://api.trello.com/1/cards?idList=${id}&key=${apiKey}&token=${apiToken}`, { name: newCard })

                dispatch(addCard({ 'id': id, 'data': response.data }))

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

            let newData = cardName[id].filter((card) => {

                return card.id !== deleteCardId
            })
            dispatch((deleteCard({ 'id': id, 'data': newData })))

        } catch (error) {
            console.error('Error deleting list from Trello:', error);
        } finally {
            setDeleteCardId(null)
        }
    };

    return (
        <>
            {cardName[id] && cardName[id].map((card) => {
                return (
                    card.idList == id &&
                    <Card key={card.id} className='Card' backgroundColor='whiteAlpha.300' margin='5px'>
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
