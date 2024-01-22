import { useMemo, useState } from 'react';

import { Button, Icon, SemanticICONS } from 'semantic-ui-react';

export type TSortType = 'asc' | 'desc' | 'none';

type TSortButtonIconType = {
  [key in TSortType]: SemanticICONS;
};

export type TSortButtonProps<T> = {
  title: string;
  sortKey: T;
  onSortChanged: (sortKey: T, sort: TSortType) => void;
};

const SortButton = <T extends keyof Record<string, unknown>>({
  title,
  sortKey,
  onSortChanged,
}: TSortButtonProps<T>) => {
  const [sort, setSort] = useState<TSortType>('none');

  const onSortChange = () => {
    const sortChangeConfig = {
      none: 'asc',
      asc: 'desc',
      desc: 'none',
    } satisfies Record<TSortType, TSortType>;

    const newSort = sortChangeConfig[sort];

    onSortChanged(sortKey, newSort);
    setSort(newSort);
  };

  const sortIcon = useMemo(() => {
    const iconConfig = {
      none: 'sort',
      desc: 'long arrow alternate down',
      asc: 'long arrow alternate up',
    } satisfies TSortButtonIconType;

    return iconConfig[sort];
  }, [sort]);

  return (
    <Button onClick={onSortChange} icon className="!flex !items-center">
      {title}
      <Icon className="!ml-1" name={sortIcon} />
    </Button>
  );
};

export default SortButton;
