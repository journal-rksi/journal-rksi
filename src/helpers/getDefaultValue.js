const getDefaultValue = type => {
  switch (type) {
    case 'text':
      return '';
    case 'number':
      return 0;
    default:
      return null;
  }
};

export default getDefaultValue;
