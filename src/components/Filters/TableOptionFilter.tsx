import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface TableOptionFilterProps {
  filterName: string;
  variableName: string;
  optionType: 'radio' | 'select' | 'checkbox';
  options: { [key: string]: number };
  npCatagory: boolean;
  values?: number[];
  applyFilter: (name: string, value: any, removeFilter: boolean, npCatagory: boolean) => void;
}

export const TableOptionFilter: FC<TableOptionFilterProps> = (props) => {
  const [checked, setChecked] = useState<number[]>(props.values ? props.values : []);

  const handleSelectChange = (event: SelectChangeEvent) => {
    props.applyFilter(props.filterName, event.target.value, false, props.npCatagory);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.applyFilter(props.filterName, event.target.value, false, props.npCatagory);
  };

  const handleToggle = (value: number) => () => {
    const currentValue = checked.includes(value);
    const newChecked = [...checked];

    if (!currentValue) newChecked.push(value);
    else newChecked.splice(newChecked.indexOf(value), 1);

    setChecked(newChecked);
  };

  useEffect(() => {
    if (props.optionType !== 'checkbox') return;

    if (checked.length === 0) props.applyFilter(props.filterName, null, true, props.npCatagory);
    else props.applyFilter(props.filterName, checked as number[], false, props.npCatagory);
  }, [checked]);

  return (
    <Box paddingX={5} paddingY={1} width="80%">
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Typography textAlign="start">{props.variableName}</Typography>
        </Grid>
        <Grid item xs={6} md={8}>
          <FormControl fullWidth>
            {props.optionType === 'select' && (
              <Select onChange={handleSelectChange} value={props.values ? String(props.values[0]) : String(Object.values(props.options)[0])} style={{ textAlign: 'left' }}>
                {Object.entries(props.options).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            )}
            {props.optionType === 'radio' && (
              <RadioGroup onChange={handleRadioChange} value={props.values ? props.values[0] : Object.values(props.options)[0]}>
                {Object.entries(props.options).map(([key, value]) => (
                  <FormControlLabel key={key} value={value} control={<Radio />} label={key} />
                ))}
              </RadioGroup>
            )}
            {props.optionType === 'checkbox' && (
              <List sx={{ width: 300 }}>
                {Object.entries(props.options).map(([key, value]) => (
                  <ListItem key={key} disablePadding>
                    <ListItemButton onClick={handleToggle(value)} dense>
                      <ListItemText primary={key} />
                      <ListItemIcon>
                        <Checkbox edge="end" checked={props.values ? props.values.includes(value) : false} tabIndex={-1} disableRipple />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
