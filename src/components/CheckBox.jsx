import React, { useEffect, useState } from "react";
import { Checkbox, List, ListItem } from "@chakra-ui/react";
import axios from "axios";
import CreateCheckBox from "./CreateCheckBox";
import RemoveCheckBox from "./RemoveCheckBox";

const {VITE_KEY, VITE_TOKEN} =import.meta.env;

function CheckBox({ checkListId ,cardId}) {
  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${VITE_KEY}&token=${VITE_TOKEN}`)
      .then((response) => {
        setCheckItems(response.data);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]);

  function changeCheck(event, checkId) {
    let check = "incomplete";
    if (event.target.checked) {
      check = "complete";
    }
    axios
      .put(
        `https://api.trello.com/1/cards/${cardId}/checkItem/${checkId}?key=${VITE_KEY}&token=${VITE_TOKEN}`,
        { state: check }
      )
      .then((response) => {
        // setUpdateTrigger(response);
        setCheckItems((checkItem)=>[...checkItem])
        // console.log(updateTrigger)

      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  }


  return (
    <List>
      {checkItems.map((item) => (
        <ListItem key={item.id} display="flex" width="2xs" margin="auto" padding='5px' justifyContent="space-between">
          <Checkbox defaultChecked={item.state == "complete"}
            onChange={(event ) => {
              changeCheck(event, item.id);
            }}
          >
            {item.name}
          </Checkbox>

          <RemoveCheckBox checkListId={checkListId} itemId={item.id} checkItems={checkItems} setCheckItems={setCheckItems} />
        </ListItem>
      ))}

      <CreateCheckBox checkListId={checkListId} setCheckItems={setCheckItems} />

    </List>
  );
}

export default CheckBox;
