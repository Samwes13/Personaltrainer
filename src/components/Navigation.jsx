import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/personaltrainer">Asiakkaat</Link>
        </li>
        <li>
          <Link to="/trainings">Harjoitukset</Link>
        </li>
        <li>
            <Link to="/calendar">Kalenteri</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
