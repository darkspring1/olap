let counter = 0
export const addRow = text => {
  counter++;
  return {
    type: 'ADD_ROW',
    counter,
    text: `${text} ${counter}`
  }
};
