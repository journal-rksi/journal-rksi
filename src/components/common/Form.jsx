import React, { useState, useCallback, cloneElement } from 'react';
import classnames from 'classnames';

import useModal from 'hooks/useModal';

import getDefaultValue from 'helpers/getDefaultValue';

const Form = ({
  fields,
  cancel,
  cancelLabel = 'Отмена',
  submitLabel = 'Принять',
  onSubmit,
  actionClassName,
  className,
  initialValues,
}) => {
  const { close } = useModal();

  const [form, setForm] = useState(initialValues || {});

  const preventSubmit = e => e.preventDefault();

  const handleSubmit = useCallback(() => onSubmit(form), [JSON.stringify(form)]);

  const handleChange = useCallback(({ name, value }) => setForm(prev => ({ ...prev, [name]: value })), [
    JSON.stringify(form),
  ]);

  return (
    <form className={classnames('form', className)} onSubmit={preventSubmit}>
      <div className="form-fields">
        {fields.map(({ name, component, type, required, condition = () => true }) =>
          condition(form)
            ? cloneElement(component, {
                required,
                name,
                key: name,
                onChange: handleChange,
                value: form[name] || getDefaultValue(type),
              })
            : null,
        )}
      </div>
      <div className={classnames('form-actions', actionClassName)}>
        {cancel && (
          <button onClick={close} className="form-action cancel">
            {cancelLabel}
          </button>
        )}
        <button onClick={handleSubmit} className="form-action submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default Form;
