import {
  RECEIVE_MESSAGE,
  RETRIEVE_MESSAGES,
  SEND_MESSAGE,
} from "../Constants/ChatConstants";

// CHAT
export const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return { loading: false, success: true, chatInfo: action.payload };
    case RECEIVE_MESSAGE:
      return { loading: false, success: true, chatInfo: action.payload };
    case RETRIEVE_MESSAGES:
      return { loading: false, success: true, chatInfo: action.payload };
    default:
      return state;
  }
};
