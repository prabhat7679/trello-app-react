import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardBody, SimpleGrid } from '@chakra-ui/react';
import Modal from 'react-modal';

export default function Lists({projects}) {

    const id = useParams().id;
    console.log(id)
   const findBoard= projects.filter((pro)=>{
        return pro.id === id
    })

    console.log(findBoard)
    
  return (
    <div>

         list will be added 
    </div>
  )
}
