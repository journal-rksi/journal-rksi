import React from 'react';

import Modal from 'components/common/Modal';
import Form from 'components/common/Form';
import Input from 'components/common/Input';

const fields = [
  {
    type: 'text',
    name: 'name',
    initialValue: 'Test',
    component: <Input type="text" placeholder="Иван Иванов" />,
  },
];

const CreateGroup = () => {
  return (
    <Modal className="create-group" center name="CreateGroup" label="Создать группу">
      <Form fields={fields} onSubmit={console.log} />
    </Modal>
  );
};

export default CreateGroup;
