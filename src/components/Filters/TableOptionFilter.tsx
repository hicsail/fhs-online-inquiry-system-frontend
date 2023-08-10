import { Box, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Typography } from '@mui/material';
import { FC, useState } from 'react';

interface TableOptionFilterProps {
  filterName: string;
  variableName: string;
  optionType: 'radio' | 'select';
  options: { [key: string]: number };
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
          <FormControl fullWidth>
            <Select onChange={handleSelectChange} defaultValue={String(Object.values(props.options)[0])} style={{ textAlign: 'left' }}>
              {Object.entries(props.options).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {props.optionType === 'radio' && (
          <RadioGroup onChange={handleRadioChange} defaultValue={Object.values(props.options)[0]}>
            {Object.entries(props.options).map(([key, value]) => (
              <FormControlLabel key={key} value={value} control={<Radio />} label={key} />
            ))}
          </RadioGroup>
        )}
      </FormControl>
    </Box>
  );
};
