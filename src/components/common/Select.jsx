import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';

const Select = ({ options, onChange, onAdd, name, label, value, addLabel = 'Добавить элемент' }) => {
  const [open, setOpen] = useState(false);

  const selectRef = useRef(null);

  const activeOptionValue = useMemo(() => (value ? value : options[0]?.value), [value]);

  const activeOptionLabel = useMemo(
    () => options.find(({ value: optionValue }) => activeOptionValue === optionValue)?.label,
    [value],
  );

  const isUnderneath = false;

  const handleBlur = useCallback(
    e => {
      const { classList } = e.target;

      if (!open && classList.contains('select-option')) return;

      return handleClose();
    },
    [open],
  );

  const handleClose = () => setOpen(false);

  const toggle = useCallback(() => setOpen(value => !value), []);

  const handleSelect = value => onChange({ value, name });

  useEffect(() => {
    onChange({ value: activeOptionValue, name });
  }, [activeOptionValue]);

  const handleAdd = () => {
    handleClose();
    onAdd();
  };

  useEffect(() => setOpen(false), [activeOptionValue]);

  useEffect(() => {
    const deselect = document.addEventListener('mousedown', handleBlur);

    return document.removeEventListener('mousedown', deselect);
  }, []);

  return (
    <div ref={selectRef} className="custom-select-container">
      <button className="custom-select" name={name} onClick={toggle}>
        <div className="select-label">{label}</div>
        <div className="select-value">{activeOptionLabel}</div>
      </button>
      {open && (
        <div className={`select-options ${isUnderneath ? 'select-option-bottom' : 'select-option-top'}`}>
          {onAdd && (
            <div role="button" onMouseDown={handleAdd} className="select-option">
              {addLabel} +
            </div>
          )}
          {options?.map(({ label, value }) => (
            <div
              role="button"
              key={`${label}-${value}`}
              className="select-option"
              onMouseDown={() => handleSelect(value)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
