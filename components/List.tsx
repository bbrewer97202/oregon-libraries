import * as React from 'react';
import ListItem from './ListItem';
import { Library } from '../types';

type Props = {
  libraries: Library[];
};

const List: React.FunctionComponent<Props> = ({ libraries }) => {
  return (
    <ul>
      {libraries.map((library) => (
        <li key={library.slug}>
          <ListItem data={library} />
        </li>
      ))}
    </ul>
  );
};

export default List;
