import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FC, useState } from 'react';

const minDistance = 0;

interface TableSliderFilterProps {
  filterName: string;
  filterDisplayedName: string;
  variableName: string;
  maxValue: number;
  minValue: number;
  minDistance?: number;
}

export const TableSliderFilter: FC<TableSliderFilterProps> = (props) => {
  const [value, setValue] = useState<number[]>([props.minValue, props.maxValue]);

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
      value: 0,
      label: '0'
    },
    {
      value: 100,
      label: '100'
    }
  ];
  return (
    <Box sx={{ width: 300 }}>
      <Slider value={value} onChange={handleChange} marks={marks} min={props.minValue} max={props.maxValue} valueLabelDisplay="auto" disableSwap />
    </Box>
  );
};
