import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import Modal from 'components/common/Modal';
import Form from 'components/common/Form';
import Input from 'components/common/Input';

import useModal from 'hooks/useModal';
import useSubjects from 'hooks/useSubjects';

import createQuery from 'helpers/createQuery';
import genId from 'helpers/genId';

const fields = [
  {
    type: 'text',
    name: 'name',
    component: <Input type="text" placeholder="Основы некоторой деятельности ..." />,
  },
];

const CreateSubject = () => {
  const { close, context } = useModal();

  const { refetchSubjects } = useSubjects();

  const [initialValues, setInitialValues] = useState(null);

  const fetchGroup = () => {
    return axios
      .get(createQuery(queryString.stringify({ id: context.id }), '/subjects'))
      .then(({ data }) => setInitialValues(data?.[0]));
  };

  const handleSubmit = values => {
    if (context?.id) {
      return axios.patch(createQuery('', `/subjects/${context.id}`), values).then(() => {
        close();
        fetchGroup();
        refetchSubjects();
      });
    }

    return axios.post(createQuery('', '/subjects'), { id: genId('sb'), ...values }).then(() => {
      close();
      refetchSubjects();
    });
  };

  useEffect(() => {
    if (context?.id) {
      fetchGroup();
    } else {
      setInitialValues(null);
    }
  }, [context?.id]);

  if (context?.id && !initialValues) return null;

  return (
    <Modal className="create-subject" name="CreateSubject" label={context.label}>
      <Form initialValues={initialValues} fields={fields} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default CreateSubject;
