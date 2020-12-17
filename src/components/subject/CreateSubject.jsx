import React from 'react';
import axios from 'axios';

import Modal from 'components/common/Modal';
import Form from 'components/common/Form';
import Input from 'components/common/Input';
import TeacherSelect from 'components/teacher/TeacherSelect';

import useModal from 'hooks/useModal';
import useSubjects from 'hooks/useSubjects';

import createQuery from 'helpers/createQuery';

const fields = [
  {
    type: 'text',
    name: 'name',
    component: <Input type="text" placeholder="Основы некоторой деятельности ..." />,
  },
  {
    name: 'teacher',
    component: <TeacherSelect label="Преподаватель" role="teacher" />,
  },
];

const CreateSubject = () => {
  const { close } = useModal();

  const { refetchSubjects } = useSubjects();

  const handleSubmit = values => {
    return axios.post(createQuery('', '/subjects'), values).then(() => {
      refetchSubjects();
      close();
    });
  };

  return (
    <Modal className="create-subject" name="CreateSubject" label="Создать дисциплину">
      <Form fields={fields} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default CreateSubject;
