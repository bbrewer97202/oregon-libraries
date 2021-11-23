import * as React from 'react';
import Link from 'next/link';

import { Library } from '../types';

type Props = {
  data: Library;
};

const ListItem: React.FunctionComponent<Props> = ({ data }: Props) => {
  const { name, slug } = data;
  return (
    <Link href="/library/[id]" as={`/library/${slug}`}>
      <a>{name}</a>
    </Link>
  );
};

export default ListItem;
