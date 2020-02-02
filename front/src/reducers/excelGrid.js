const excelGrid = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return [
        ...state,
        {
          id: action.counter,
          text: action.text,
        },
      ];

    default:
      return state;
  }
};
export default excelGrid;
