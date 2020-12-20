import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import queryString from 'query-string';
import classnames from 'classnames';

import MarkSelect from 'components/sheet/MarkSelect';

import useUser from 'hooks/useUser';
import useSubjects from 'hooks/useSubjects';
import useTeachers from 'hooks/useTeachers';

import createQuery from 'helpers/createQuery';
import { DAYS } from 'helpers/constants';

const SheetPage = () => {
  const { me } = useUser();
  const { subjects } = useSubjects();
  const { teachers } = useTeachers();

  const [notFound, setNotFound] = useState(false);
  const [sheet, setSheet] = useState(null);
  const [students, setStudents] = useState([]);

  const query = useLocation().search;
  const { group, subject, date } = useMemo(() => queryString.parse(query), []);

  useEffect(() => {
    if (!group || !subject || !date) {
      setNotFound(true);
    } else {
      axios
        .get(createQuery(queryString.stringify({ group, subject, date }), '/sheets'))
        .then(({ data }) => {
          setSheet(data[0]);
          setNotFound(false);
        })
        .catch(() => setNotFound(true));
    }
  }, [group, subject, date]);

  useEffect(() => {
    if (group) {
      axios
        .get(createQuery(queryString.stringify({ group, role_like: 'student' }), '/users'))
        .then(({ data }) => setStudents(data));
    }
  }, [group]);

  useEffect(() => {
    if (sheet) axios.patch(createQuery('', '/sheets/' + sheet?.id), sheet);
  }, [JSON.stringify(sheet)]);

  const subjectName = useMemo(() => subjects?.find(({ id }) => id === sheet?.subject)?.name, [subjects, sheet]);

  const currentTeacher = useMemo(() => teachers?.find(({ id }) => id === sheet?.teacher), [sheet, teachers]);

  const mutationAllowed = useMemo(() => {
    if (!sheet && !me) return false;

    if (me?.role.includes('admin')) return true;

    if (sheet.teacher !== undefined && sheet.teacher === me?.id) return true;

    return false;
  }, [me, sheet]);

  const handleSelect = useCallback(
    async (student, day, mark) => {
      if (!sheet || !mutationAllowed) return;
      if (mark === 'none') {
        return setSheet({
          ...sheet,
          marks: {
            ...sheet.marks,
            [day]: [...sheet.marks[day].filter(({ student: studentId }) => studentId !== student)],
          },
        });
      }

      const mutateMark = () => {
        setSheet({
          ...sheet,
          marks: {
            ...sheet.marks,
            [day]: [...sheet.marks[day].filter(({ student: studentId }) => studentId !== student), { student, mark }],
          },
        });
      };

      if (!sheet.marks?.[day]) {
        setSheet({
          ...sheet,
          marks: {
            ...sheet.marks,
            [day]: [{ student, mark }],
          },
        });
      } else {
        mutateMark();
      }
    },
    [sheet, mutationAllowed],
  );

  if (notFound || !sheet) return <div>Not found</div>;

  return (
    <div className="page sheet">
      <h3>{[subjectName, currentTeacher?.name, currentTeacher?.login].join(' | ')}</h3>
      <table className="table">
        <thead className="table-head">
          <tr>
            <th>Студент / День</th>
            {DAYS.map(day => (
              <th key={`day-${day}`}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students?.map(({ id, name }) => (
            <tr key={id}>
              <td className="table-cell-container">
                <div className="table-cell table-cell-name">{name}</div>
              </td>
              {DAYS.map(day => {
                const mark = sheet?.marks?.[day]?.find(({ student }) => student === id)?.mark;

                return (
                  <td className="table-cell-container" key={`${id}-day-${day}`}>
                    <MarkSelect
                      disabled={!mutationAllowed}
                      value={mark}
                      className={classnames('table-cell', 'table-mark')}
                      onChange={markValue => handleSelect(id, day, markValue)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SheetPage;
