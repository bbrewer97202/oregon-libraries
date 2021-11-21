import * as React from 'react';
import ListItem from './ListItem';
import { Library } from '../types';

type Props = {
  items: Library[];
};

const List: React.FunctionComponent<Props> = ({ items }) => {
  console.log('items', items);
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <ListItem data={item} />
        </li>
      ))}
    </ul>
  );
};

export default List;
