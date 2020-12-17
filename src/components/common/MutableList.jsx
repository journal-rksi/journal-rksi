import React from 'react';
import axios from 'axios';

import useModal from 'hooks/useModal';

const MutableList = ({ items, editModalName, createModalName, collectionName, refetch }) => {
  const { open: openCreate } = useModal(createModalName);

  const onDelete = (value, name) => {
    const sure = confirm(`Вы действительно хотите удалить элемент ${name}?`);

    if (!sure) return;

    axios
      .delete(`${process.env.REACT_APP_API_URL}/${collectionName}/${value}`)
      .then(refetch)
      .catch(err => alert(`Ошибка: ${err}`));
  };

  return (
    <div className="mutable-list">
      <button onClick={openCreate} className="create-item">
        Добавить элемент
      </button>
      {items?.map(({ label, value }) => (
        <div className="list-item" key={`${label}-${value}`}>
          <div className="item-name">{label}</div>
          <div className="item-actions">
            <button onClick={() => onDelete(value, label)} className="item-action delete-item">
              &times;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MutableList;
