import React from 'react';

import HomeCard from 'components/common/HomeCard';

import useGroups from 'hooks/useGroups';

const HomePage = () => {
  const groups = useGroups();

  return (
    <div className="page home">
      <HomeCard label="Пропуски">
        <label className="label" htmlFor="group">
          Группа
        </label>
        <select name="group" id="group">
          {JSON.stringify(groups)}
          {groups?.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </HomeCard>
      <HomeCard label="Оценки">ffsdff</HomeCard>
    </div>
  );
};

export default HomePage;
