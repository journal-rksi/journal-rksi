import React, { useMemo, useCallback } from 'react';
import classnames from 'classnames';

const MultiSelect = ({ value, options, limit, name, label, onChange }) => {
  const selectedOptions = useMemo(() => options.filter(({ value: optionValue }) => value.includes(optionValue)), [
    value,
  ]);

  const handleSelect = useCallback(
    inputValue => {
      let newSelected = [...value];

      if (value.includes(inputValue)) {
        newSelected.splice(value.indexOf(inputValue), 1);
      } else {
        newSelected.push(inputValue);
      }

      onChange({
        name,
        value: newSelected,
      });
    },
    [value],
  );

  return (
    <div className="multi-select">
      {label && <label className="multi-select-label">{label}</label>}
      <div className="multi-select-active">
        {selectedOptions.map(({ label, value }) => (
          <button key={label} onClick={() => handleSelect(value)} className="multi-select-active-item">
            {label}
          </button>
        ))}
      </div>
      <div className="multi-select-options">
        {options.map(({ label, value }) => (
          <button
            key={`${label}-${value}`}
            onClick={() => handleSelect(value)}
            disabled={
              selectedOptions.length >= limit &&
              !selectedOptions.some(({ value: optionValue }) => value === optionValue)
            }
            className={classnames('select-option', {
              active: selectedOptions.some(({ value: optionValue }) => value === optionValue),
            })}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
