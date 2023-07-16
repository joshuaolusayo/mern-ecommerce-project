import axios from "axios";
import { RETRIEVE_MESSAGES, SEND_MESSAGE } from "../Constants/ChatConstants";

// SEND MESSAGE
export const sendMessage = (message) => async (dispatch) => {
  const existingData = localStorage.getItem("chatInfo");
  const parsedData = existingData
    ? JSON.parse(existingData)
    : [
        {
          sender: "admin",
          message: "Hey, I am Diva, how can I help you...",
          timestamp: new Date(),
        },
      ]; // Parse existing data, or initialize as an empty array if it doesn't exist

  const newData = {
    sender: "user",
    message,
    timestamp: new Date(),
  };
  let updatedData = [...parsedData, newData]; // Combine existing data with new data

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

    if (data?.response) {
      const newData = {
        sender: "admin",
        message: data.response,
        timestamp: new Date(),
      };
      const d_ata = JSON.parse(localStorage.getItem("chatInfo"));
      const updated_data = [...d_ata, newData]; // Combine existing data with new data

      localStorage.setItem("chatInfo", JSON.stringify(updated_data)); // Store the updated data back in localStorage
      dispatch({ type: SEND_MESSAGE, payload: updated_data });
    }
  } catch (error) {
    console.log({ error });
  }
};

export const retrieveMessages = () => (dispatch) => {
  const existingData = localStorage.getItem("chatInfo");
  const parsedData = existingData
    ? JSON.parse(existingData)
    : [
        {
          sender: "admin",
          message: "Hey, I am Diva, how can I help you...",
          timestamp: new Date(),
        },
      ];
  dispatch({ type: RETRIEVE_MESSAGES, payload: parsedData });
};
