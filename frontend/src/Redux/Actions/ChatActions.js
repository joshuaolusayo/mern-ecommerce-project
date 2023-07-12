import axios from "axios";
import { SEND_MESSAGE } from "../Constants/ChatConstants";

// SEND MESSAGE
export const sendMessage = (message) => async (dispatch) => {
//   console.log({ message });
  const existingData = localStorage.getItem("chatInfo");
  const parsedData = existingData ? JSON.parse(existingData) : []; // Parse existing data, or initialize as an empty array if it doesn't exist

  const newData = {
    sender: "user",
    message,
    date: new Date(),
  };
  const updatedData = [...parsedData, newData]; // Combine existing data with new data

  localStorage.setItem("chatInfo", JSON.stringify(updatedData)); // Store the updated data back in localStorage
  dispatch({ type: SEND_MESSAGE, payload: updatedData });

  // send message to server
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      `https://chatbot-5grq.onrender.com/chat`,
      { message },
      config
    );
    console.log({ data });
  } catch (error) {
    console.log({ error });
  }
};
