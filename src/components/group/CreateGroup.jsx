import React from 'react';
import axios from 'axios';

import Modal from 'components/common/Modal';
import Form from 'components/common/Form';
import Input from 'components/common/Input';
import SubjectMultiSelect from 'components/subject/SubjectMultiSelect';
import TeacherSelect from 'components/teacher/TeacherSelect';

import useModal from 'hooks/useModal';
import useGroups from 'hooks/useGroups';

import createQuery from 'helpers/createQuery';

const fields = [
  {
    type: 'text',
    name: 'name',
    component: <Input type="text" placeholder="ПОКС-11" />,
  },
  {
    type: 'multiselect',
    name: 'subjects',
    component: <SubjectMultiSelect limit={10} />,
  },
  {
    name: 'curator',
    component: <TeacherSelect label="Куратор" role="curator" />,
  },
];

const CreateGroup = () => {
  const { close } = useModal();

  const { refetchGroups } = useGroups();

  const handleSubmit = values => {
    return axios.post(createQuery('', '/groups'), values).then(() => {
      close();
      refetchGroups();
    });
  };

  return (
    <Modal className="create-group" name="CreateGroup" label="Создать группу">
      <Form fields={fields} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default CreateGroup;
