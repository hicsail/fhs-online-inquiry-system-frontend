import { Slider, Box, Typography } from '@mui/material';
import { FC, useState } from 'react';

interface TableSliderFilterProps {
  filterName: string;
  variableName: string;
  maxValue: number;
  minValue: number;
  step?: number;
  npCatagory: boolean;
  value?: number[];
  applyFilter: (name: string, value: any, removeFilter: boolean, npCatagory: boolean) => void;
}

export const TableSliderFilter: FC<TableSliderFilterProps> = (props) => {
  const [value, setValue] = useState<number[]>(props.value ? props.value : [props.minValue, props.maxValue]);

  const step = props.step ?? 1;

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);

    props.applyFilter(props.filterName, newValue as number[], false, props.npCatagory);
  };

  const marks = [
    {
      value: props.minValue,
      label: props.minValue.toFixed()
    },
    {
      value: props.maxValue,
      label: props.maxValue.toString()
    }
  ];

  return (
    <Box paddingX="1rem">
      <Typography textAlign="start" variant="body2">
        {props.variableName}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        marks={marks}
        min={props.minValue}
        max={props.maxValue}
        step={step}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => fixFloatingPointDisplay(step, `${value}`)}
        disableSwap
      />
    </Box>
  );
};

function fixFloatingPointDisplay(precision: number, value: string): number {
  const decimalPlaces = precision.toString().split('.')[1]?.length || 0;

  return parseFloat(parseFloat(value).toFixed(decimalPlaces));
}
