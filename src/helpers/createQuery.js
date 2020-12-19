const createQuery = (query, ...values) => {
  return `${process.env.REACT_APP_API_URL}${values.join('')}${query ? '?' + query : ''}`;
};

export default createQuery;
