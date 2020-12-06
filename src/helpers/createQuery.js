const createQuery = (query, ...values) => `${process.env.REACT_APP_API_URL}${values.join()}?${query}`;

export default createQuery;
