import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

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
  const { close, context } = useModal();

  const { refetchGroups } = useGroups();

  const [initialValues, setInitialValues] = useState(null);

  const fetchGroup = () => {
    return axios
      .get(createQuery(queryString.stringify({ id: context.id }), '/groups'))
      .then(({ data }) => setInitialValues(data?.[0]));
  };

  const handleSubmit = values => {
    if (context?.id) {
      return axios.patch(createQuery('', `/groups/${context.id}`), values).then(() => {
        close();
        fetchGroup();
        refetchGroups();
      });
    }

    return axios.post(createQuery('', '/groups'), values).then(() => {
      close();
      refetchGroups();
    });
  };

  useEffect(() => {
    if (context?.id) {
      fetchGroup();
    }
  }, [context?.id]);

  if (context?.id && !initialValues) return null;

  return (
    <Modal className="create-group" name="CreateGroup" label={context.label}>
      <Form initialValues={initialValues} fields={fields} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default CreateGroup;
