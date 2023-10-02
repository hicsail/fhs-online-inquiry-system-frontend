import { Slider, Box, Typography, Grid, Tooltip, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';

interface TableSliderFilterProps {
  filterName: string;
  variableName: string;
  description: string;
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
    <Box paddingX={5} paddingY={1} width="80%">
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Typography textAlign="start">
            {props.variableName}
            <Tooltip title={props.description}>
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item xs={6} md={8}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

function fixFloatingPointDisplay(precision: number, value: string): number {
  const decimalPlaces = precision.toString().split('.')[1]?.length || 0;

  return parseFloat(parseFloat(value).toFixed(decimalPlaces));
}
