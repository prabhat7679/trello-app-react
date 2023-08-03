import React, { useEffect, useState } from "react";
import {
  Stack,
  Button,
  Checkbox,
  ButtonGroup,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Progress,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";
import CreateCheckList from "./CreateCheckList";
import RemoveCheckList from "./RemoveCheckList";

function PopUpCard({ id, name }) {
  // console.log(id, 'and', name);
  const [checkListData, setCheckListData] = useState([]);
  const [checklistName, setChecklistName] = useState("");
  const [length, setLength] = useState(0);
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const apiKey = 'c194712381db71b3c67ec4558c35d43b';
    const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/cards/${id}/checklists?key=${apiKey}&token=${apiToken}`
      )
      .then((response) => {
        setCheckListData(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [checklistName]);
  return (
    <>
      <Button
        flexGrow={5}
        colorScheme="gray"
        onClick={() => {
          onOpen();
        }}
      >
        {name}
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{name}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Stack spacing={5} direction="column">
              {checkListData.map((checklist) => {
                return (
                  <>
                    <Heading key={checklist.id}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      as="h5"
                      size="sm"
                    >
                      <p>{checklist.name}</p>
                      <RemoveCheckList
                        id={checklist.id}
                        setChecklistName={setChecklistName}
                      />
                    </Heading>
                    <Progress value={0} />
                    
                  </>
                );
              })}
              <CreateCheckList id={id} setChecklistName={setChecklistName} />
            </Stack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default PopUpCard;