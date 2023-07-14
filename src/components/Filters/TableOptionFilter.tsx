import { Box, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
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
  return (
    <Box paddingX="1rem">
      <Typography textAlign="start" variant="body2">
        {props.variableName}
      </Typography>
      <FormControl fullWidth>
        {props.optionType === 'select' && (
          <Select>
            {props.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
        {props.optionType === 'radio' && (
          <RadioGroup>
            {props.options.map((option) => (
              <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        )}
      </FormControl>
    </Box>
  );
};
