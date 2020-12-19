import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import Modal from 'components/common/Modal';
import Form from 'components/common/Form';
import Input from 'components/common/Input';
import GroupSelect from 'components/group/GroupSelect';

import useModal from 'hooks/useModal';
import useGroups from 'hooks/useGroups';
import useStudents from 'hooks/useStudents';

import createQuery from 'helpers/createQuery';
import genId from 'helpers/genId';

const fields = [
  {
    type: 'text',
    name: 'name',
    component: <Input label="ФИО" type="text" placeholder="Иванов Иван Иванович" />,
  },
  {
    type: 'text',
    name: 'group',
    component: <GroupSelect label="Группа" />,
  },
];

const CreateStudent = () => {
  const { close, context } = useModal();
  const { refetchGroups } = useGroups();
  const { refetchStudents } = useStudents();

  const [initialValues, setInitialValues] = useState(null);

  const fetchStudent = () => {
    return axios
      .get(createQuery(queryString.stringify({ id: context.id }), '/users'))
      .then(({ data }) => setInitialValues(data?.[0]));
  };

  const handleSubmit = values => {
    if (context?.id) {
      return axios.patch(createQuery('', `/users/${context.id}`), values).then(() => {
        close();
        fetchStudent();
        refetchGroups();
        refetchStudents();
      });
    }

    return axios.post(createQuery('', '/users'), { id: genId('st'), role: ['student'], ...values }).then(() => {
      close();
      refetchStudents();
    });
  };

  useEffect(() => {
    if (context.id) {
      fetchStudent();
    } else {
      setInitialValues(null);
    }
  }, [context?.id]);

  if (context?.id && !initialValues) return null;

  return (
    <Modal className="create-student" name="CreateStudent" label={context.label}>
      <Form initialValues={initialValues} fields={fields} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default CreateStudent;
