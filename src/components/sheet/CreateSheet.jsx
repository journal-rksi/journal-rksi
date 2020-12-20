import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import Modal from 'components/common/Modal';
import Form from 'components/common/Form';
import Input from 'components/common/Input';
import GroupSelect from 'components/group/GroupSelect';
import SubjectSelect from 'components/subject/SubjectSelect';

import useUser from 'hooks/useUser';
import useModal from 'hooks/useModal';
import useSheets from 'hooks/useSheets';

import createQuery from 'helpers/createQuery';
import genId from 'helpers/genId';

const fields = [
  {
    type: 'text',
    name: 'date',
    component: <Input label="Дата (год-месяц)" type="text" placeholder="2020-11" />,
  },
  {
    type: 'text',
    name: 'group',
    component: <GroupSelect label="Группа" />,
  },
  {
    type: 'text',
    name: 'subject',
    component: <SubjectSelect label="Предмет" />,
  },
];

const CreateStudent = () => {
  const { me } = useUser();
  const { close, context } = useModal();
  const { refetchSheets } = useSheets();

  const [initialValues, setInitialValues] = useState(null);

  const fetchSheet = () => {
    return axios
      .get(createQuery(queryString.stringify({ id: context.id }), '/sheets'))
      .then(({ data }) => setInitialValues(data?.[0]));
  };

  const handleSubmit = useCallback(
    values => {
      if (!me) return;
      if (context?.id) {
        return axios.patch(createQuery('', `/sheets/${context.id}`), values).then(() => {
          close();
          fetchSheet();
          refetchSheets();
        });
      }

      return axios.post(createQuery('', '/sheets'), { id: genId('sh'), teacher: me?.id, ...values }).then(() => {
        close();
        refetchSheets();
      });
    },
    [me],
  );

  useEffect(() => {
    if (context.id) {
      fetchSheet();
    } else {
      setInitialValues(null);
    }
  }, [context?.id]);

  if (context?.id && !initialValues) return null;

  return (
    <Modal className="create-sheet" name="CreateSheet" label={context.label}>
      <Form initialValues={initialValues} fields={fields} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default CreateStudent;
