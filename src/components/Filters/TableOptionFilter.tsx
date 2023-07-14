import { FC } from 'react';

interface TableOptionFilterProps {
  filterName: string;
  variableName: string;
  optionType: 'checkbox' | 'radio' | 'select';
  options: string[];
  disabled?: boolean;
  applyFilter: (name: string, removeFilter: boolean, value: any) => void;
}

export const TableOptionFilter: FC<TableOptionFilterProps> = (props) => {
  return <></>;
};
