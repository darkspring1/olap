// add your logic
const empty = (state = [], action) => {
  switch (action.type) {
    case 'SOME_ACTION':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];

    default:
      return state;
  }
};
export default empty;
