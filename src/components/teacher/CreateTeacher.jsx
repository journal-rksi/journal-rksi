import React from 'react';
import axios from 'axios';

import Modal from 'components/common/Modal';
import Form from 'components/common/Form';
import Input from 'components/common/Input';
import RoleMultiSelect from 'components/teacher/RoleMultiSelect';
import GroupMultiSelect from 'components/group/GroupMultiSelect';
import SubjectMultiSelect from 'components/subject/SubjectMultiSelect';

import useModal from 'hooks/useModal';
import useTeachers from 'hooks/useTeachers';

import createQuery from 'helpers/createQuery';

const fields = [
  {
    type: 'text',
    name: 'name',
    component: <Input label="ФИО" type="text" placeholder="Иванов Иван Иванович" />,
  },
  {
    type: 'multiselect',
    name: 'role',
    component: <RoleMultiSelect limit={2} />,
  },
  {
    type: 'multiselect',
    name: 'subjects',
    component: <SubjectMultiSelect limit={3} />,
    condition: form => form['role']?.includes('teacher'),
  },
  {
    type: 'multiselect',
    name: 'groups',
    component: <GroupMultiSelect limit={8} label="Группы" />,
    condition: form => form['role']?.includes('teacher'),
  },
];

const CreateTeacher = () => {
  const { close } = useModal();
  const { refetchTeachers } = useTeachers();

  const handleSubmit = values => {
    axios.post(createQuery('', '/users'), values).then(() => {
      close();
      refetchTeachers();
    });
  };

  return (
    <Modal className="create-subject" name="CreateTeacher" label="Добавить сотрудника">
      <Form fields={fields} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default CreateTeacher;
