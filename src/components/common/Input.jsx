import React from 'react';
import classnames from 'classnames';

const Input = ({ onChange, label, ...props }) => {
  const handleChange = e => {
    const { name, value } = e.target;

    return onChange({ name, value });
  };

  return (
    <div className={classnames('input', props.className)}>
      {label && <div className="input-label">{label}</div>}
      <input {...props} className="input-field" onChange={handleChange} />
    </div>
  );
};

export default Input;
