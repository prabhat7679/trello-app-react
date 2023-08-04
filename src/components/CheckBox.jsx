import React, { useEffect, useState } from "react";
import { Checkbox, List, ListItem } from "@chakra-ui/react";
import axios from "axios";
import CreateCheckBox from "./CreateCheckBox";
import RemoveCheckBox from "./RemoveCheckBox";


function CheckBox({ checkListId, cardId }) {
  const [checkItems, setCheckItems] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState("");

  const apiKey = 'c194712381db71b3c67ec4558c35d43b';
  const apiToken = 'ATTA1c252a69417363daf13b310d3e4cdcfabd6b6edbdecfca215fd3ff8207d6befa5C3B7B4C';

  useEffect(() => {
    axios
      .get(`https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${apiToken}`)
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
        `https://api.trello.com/1/cards/${cardId}/checkItem/${checkId}?key=${apiKey}&token=${apiToken}`,
        { state: check }
      )
      .then((response) => {
        setUpdateTrigger(response);
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
            onChange={(e) => {
              changeCheck(e, item.id);
            }}
          >
            {item.name}
          </Checkbox>
          <RemoveCheckBox checkListId={checkListId} itemId={item.id} setUpdateTrigger={setUpdateTrigger} />
        </ListItem>
      ))}

      <CreateCheckBox checkListId={checkListId} setUpdateTrigger={setUpdateTrigger} />

    </List>
  );
}

export default CheckBox;
