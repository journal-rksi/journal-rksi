import React, { useState } from 'react';

import classnames from 'classnames';

import useSubject from 'hooks/useSubject';
import useSubjects from 'hooks/useSubjects';
import useGroups from 'hooks/useGroups';

const ITERATION_FILLER = '-------------------------------'.split('');

const getCellValue = value => {
  switch (value) {
    case 'н':
      return null;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    case 5:
      return 5;
    default:
      return undefined;
  }
};

const highlightCell = (curPos, tarPos) => {
  if (!curPos || !tarPos) return false;

  const { x: curX, y: curY } = curPos;
  const { x: tarX, y: tarY } = tarPos;

  if (curX === tarX && curY < tarY) return true;
  if (curX < tarX && curY === tarY) return true;

  return false;
};

const activeCell = (curPos, tarPos) => {
  if (!curPos || !tarPos) return false;

  const { x: curX, y: curY } = curPos;
  const { x: tarX, y: tarY } = tarPos;

  return curX === tarX && curY === tarY;
};

const SheetPage = () => {
  const subjects = useSubjects();
  const groups = useGroups();

  const [activeCellPosition, setActiveCellPosition] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(subjects?.[0].id);
  const [currentGroup, setCurrentGroup] = useState(groups?.[0].id);

  const { students, marks, loading } = useSubject({
    groupId: currentGroup || 'none',
    subjectId: currentSubject || 'none',
    date_gte: new Date().toISOString(),
  });

  const handleFocus = (x, y) => {
    setActiveCellPosition({ x, y });
  };

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'subject':
        return setCurrentSubject(value);
      case 'group':
        return setCurrentGroup(value);
    }
  };

  const handleCell = (date, value) => {
    console.log(getCellValue(value));
  };

  return (
    <div className="page sheet">
      <div className="sheet-container">
        <select value={currentSubject} onChange={handleChange} name="subject" id="">
          {subjects?.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <select value={currentGroup} onChange={handleChange} name="group" id="">
          {groups?.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th className="name">ФИО</th>
              {ITERATION_FILLER.map((day, index) => (
                <th
                  className={classnames({ ['active']: highlightCell({ x: index, y: -1 }, activeCellPosition) })}
                  key={`day-${index + 1}`}
                >
                  {index + 1}
                </th>
              ))}
              <th>Всего пропусков</th>
              <th>Из них прогулов</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              students?.map(({ id, name }, studentIndex) => (
                <tr key={id}>
                  <td
                    className={classnames({
                      ['active']: highlightCell({ x: -1, y: studentIndex }, activeCellPosition),
                    })}
                  >
                    {studentIndex + 1}
                  </td>
                  <td
                    className={classnames('name', {
                      ['active']: highlightCell({ x: -1, y: studentIndex }, activeCellPosition),
                    })}
                  >
                    {name}
                  </td>
                  {ITERATION_FILLER.map((dash, dayIndex) => {
                    const studentsMarks = marks?.filter(({ student }) => student === id) || [];
                    const currentMark = studentsMarks.find(({ date }) => new Date(date).getDate() === dayIndex + 1);

                    return (
                      <td
                        key={id + dayIndex}
                        className={classnames('mark-cell', {
                          ['highlighted']: highlightCell({ x: dayIndex, y: studentIndex }, activeCellPosition),
                          ['active']: activeCell({ x: dayIndex, y: studentIndex }, activeCellPosition),
                        })}
                      >
                        <input
                          onChange={({ target: { value } }) => handleCell(currentMark?.date, value)}
                          onFocus={() => handleFocus(dayIndex, studentIndex)}
                          value={currentMark?.mark === null ? 'нб' : currentMark?.mark}
                          type="text"
                        />
                      </td>
                    );
                  })}
                  <td>{marks?.filter(({ student, mark }) => student === id && mark === null).length * 2}</td>
                  <td>0</td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <div className="loading-message">Загрзука</div>}
      </div>
    </div>
  );
};

export default SheetPage;
