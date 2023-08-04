import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const ErrorPage = () => {
  return (
    <Box textAlign="center" mt="20">
      <Heading size="xl" color="red.500" mb="4">
        404 - Page not found
      </Heading>
      <Text fontSize="lg">The requested page does not exist.</Text>
    </Box>
  );
};

export default ErrorPage;
