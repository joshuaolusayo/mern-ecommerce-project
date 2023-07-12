export const formatTime = (timestamp) => {
  const now = new Date();
  const messageTime = new Date(timestamp);

  if (now.toDateString() === messageTime.toDateString()) {
    // Message sent/received today
    return messageTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  } else {
    // Message sent/received on a different day
    return messageTime.toLocaleString();
  }
};
