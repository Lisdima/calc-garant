export const addSpacesOnInput = (value: string): string => value.split('').reverse()
  .join('')
  .replace(/(\d{3}([,.]\d{1,2})?)/g, '$1 ')
  .split('')
  .reverse()
  .join('')
  .replace(/^ /, '');

export const removeAllSpaces = (value: string): string => value.replace(/[^\d]/g, '');

export default {
  addSpacesOnInput,
  removeAllSpaces,
};
