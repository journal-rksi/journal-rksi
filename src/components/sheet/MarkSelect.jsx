import React, { useState, useEffect } from 'react';

import classnames from 'classnames';

const MarkSelect = ({ value, onChange, className, disabled }) => {
  const [selectedMark, setSelectedMark] = useState('none');

  const handleSelect = e => {
    const { value } = e.target;
    setSelectedMark(value);

    return onChange(value);
  };

  useEffect(() => {
    if (value) setSelectedMark(value);
  }, [value]);

  return (
    <select
      onChange={handleSelect}
      className={classnames(className, { error: parseInt(selectedMark) === 0 })}
      value={selectedMark}
      disabled={disabled}
    >
      <option value={'none'}></option>
      <option value={0}>нб</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>
  );
};

export default MarkSelect;
