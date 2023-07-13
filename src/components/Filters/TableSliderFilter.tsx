import { Slider, Box, Typography } from '@mui/material';
import { FC, useState } from 'react';

interface TableSliderFilterProps {
  filterName: string;
  variableName: string;
  maxValue: number;
  minValue: number;
  minDistance?: number;
  disabled?: boolean;
}

export const TableSliderFilter: FC<TableSliderFilterProps> = (props) => {
  const [value, setValue] = useState<number[]>([props.minValue, props.maxValue]);

  const minDistance = props.minDistance ?? 10;

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const marks = [
    {
      value: props.minValue,
      label: props.minValue.toString()
    },
    {
      value: props.maxValue,
      label: props.maxValue.toString()
    }
  ];

  return (
    <Box>
      <Typography textAlign="start" variant="body2">
        {props.variableName}
      </Typography>
      <Slider disabled={props.disabled} value={value} onChange={handleChange} marks={marks} min={props.minValue} max={props.maxValue} valueLabelDisplay="auto" disableSwap />
    </Box>
  );
};
