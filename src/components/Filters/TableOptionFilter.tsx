import { FC } from 'react';

interface TableOptionFilterProps {
  filterName: string;
  filterDisplayedName: string;
  variableName: string;
  optionType: 'checkbox' | 'radio' | 'select';
  options: string[];
}

export const TableOptionFilter: FC<TableOptionFilterProps> = () => {
  return <></>;
};
