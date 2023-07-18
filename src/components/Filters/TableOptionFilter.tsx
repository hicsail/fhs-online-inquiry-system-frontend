import { Box, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Typography } from '@mui/material';
import { FC, useState } from 'react';

interface TableOptionFilterProps {
  filterName: string;
  variableName: string;
  optionType: 'radio' | 'select';
  options: string[];
  disabled?: boolean;
  npCatagory: boolean;
  applyFilter: (name: string, value: any, removeFilter: boolean, npCatagory: boolean) => void;
}

export const TableOptionFilter: FC<TableOptionFilterProps> = (props) => {
  const [_selectValue, setSelectValue] = useState<number>();
  const [_radioValue, setRadioValue] = useState<number>();

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectValue(Number(event.target.value));
    props.applyFilter(props.filterName, event.target.value, false, props.npCatagory);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(Number(event.target.value));
    props.applyFilter(props.filterName, event.target.value, false, props.npCatagory);
  };

  return (
    <Box paddingX="1rem">
      <Typography textAlign="start" variant="body2">
        {props.variableName}
      </Typography>
      <FormControl fullWidth>
        {props.optionType === 'select' && (
          <Select onChange={handleSelectChange}>
            {Object.entries(props.options).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </Select>
        )}
        {props.optionType === 'radio' && (
          <RadioGroup onChange={handleRadioChange}>
            {Object.entries(props.options).map(([key, value]) => (
              <FormControlLabel key={key} value={value} control={<Radio />} label={key} />
            ))}
          </RadioGroup>
        )}
      </FormControl>
    </Box>
  );
};
