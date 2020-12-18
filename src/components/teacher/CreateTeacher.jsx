import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import Modal from 'components/common/Modal';
import Form from 'components/common/Form';
import Input from 'components/common/Input';
import RoleMultiSelect from 'components/teacher/RoleMultiSelect';
import GroupMultiSelect from 'components/group/GroupMultiSelect';
import SubjectMultiSelect from 'components/subject/SubjectMultiSelect';

import useModal from 'hooks/useModal';
import useTeachers from 'hooks/useTeachers';
import useGroups from 'hooks/useGroups';

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
    component: <RoleMultiSelect limit={2} label="Преподаватель" />,
  },
  {
    type: 'multiselect',
    name: 'subjects',
    component: <SubjectMultiSelect limit={3} label="Предметы" />,
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
  const { close, context } = useModal();

  const { refetchTeachers } = useTeachers();
  const { refetchGroups } = useGroups();

  const [initialValues, setInitialValues] = useState(null);

  const fetchTeacher = () => {
    return axios
      .get(createQuery(queryString.stringify({ id: context.id }), '/users'))
      .then(({ data }) => setInitialValues(data?.[0]));
  };

  const handleSubmit = values => {
    if (context?.id) {
      return axios.patch(createQuery('', `/users/${context.id}`), values).then(() => {
        close();
        fetchTeacher();
        refetchTeachers();
        refetchGroups();
      });
    }

    return axios.post(createQuery('', '/users'), values).then(() => {
      close();
      refetchTeachers();
    });
  };

  useEffect(() => {
    if (context?.id) {
      fetchTeacher();
    }
  }, [context?.id]);

  if (context?.id && !initialValues) return null;

  return (
    <Modal className="create-teacher" name="CreateTeacher" label={context.label}>
      <Form initialValues={initialValues} fields={fields} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default CreateTeacher;
