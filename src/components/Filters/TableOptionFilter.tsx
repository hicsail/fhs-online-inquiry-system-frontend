import { FC } from 'react';

interface TableOptionFilterProps {
  filterName: string;
  variableName: string;
  optionType: 'checkbox' | 'radio' | 'select';
  options: string[];
  disabled?: boolean;
}

export const TableOptionFilter: FC<TableOptionFilterProps> = (props) => {
  return <></>;
};
