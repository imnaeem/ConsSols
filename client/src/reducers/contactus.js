const contactUsMessagesReducer = (
  state = { messages: [], fetched: false },
  action
) => {
  switch (action.type) {
    case "CONTACTUS_MESSAGES":
      return { messages: action.payload, fetched: true };
    case "GET_ALL_MESSAGES":
      return { messages: action.payload, fetched: true };
    default:
      return state;
  }
};

export default contactUsMessagesReducer;
