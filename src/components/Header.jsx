import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';

function Header() {
  return (
    <Box w="100%" bg="blue.500" color="white" px={4} py={2} display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/" color="white" textDecoration="underline">
        <Heading as="h1" size="lg" >
          Trello Board 
        </Heading>       
        </Link>
      </Box>
     
    </Box>
  );
}

export default Header;
