const getDefaultValue = type => {
  switch (type) {
    case 'text':
      return '';
    case 'number':
      return 0;
    case 'multiselect':
      return [];
    default:
      return null;
  }
};

export default getDefaultValue;
