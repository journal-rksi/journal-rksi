import React from 'react';
import classnames from 'classnames';

const Input = ({ onChange, ...props }) => {
  const handleChange = e => {
    const { name, value } = e.target;

    return onChange({ name, value });
  };

  return <input {...props} className={classnames('input', props.className)} onChange={handleChange} />;
};

export default Input;
