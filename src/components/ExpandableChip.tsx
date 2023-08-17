import { Box, Chip, IconButton, Menu } from '@mui/material';
import { FC, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Filter } from '../types/Filter';
import { TableSliderFilter } from './Filters/TableSliderFilter';
import { TableOptionFilter } from './Filters/TableOptionFilter';

export interface ExpandableChipProps {
  filter: Filter;
  filterRequest: any;
  label: string;
  applyFilter: (name: string, value: any, removeFilter: boolean, npCatagory: boolean) => void;
  onDelete?: () => void;
}

export const ExpandableChip: FC<ExpandableChipProps> = (props) => {
  const { filter, filterRequest } = props;

  const [color, setColor] = useState<'info' | 'default'>('default');
  const [displayedLabel, setDisplayedLabel] = useState<string>(props.label);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  let expandText = filter.variableName;

  // get filter values
  const filterValues = filter.npCategory ? (filterRequest.categories[filter.name] as number[]) : (filterRequest[filter.name] as number[]);

  if (filterValues) {
    if (filter.type === 'slider') {
      expandText += `: ${filterValues[0]} - ${filterValues[1]}`;
    } else if (filter.type === 'option') {
      const filterLabels = [];
      for (const label of Object.keys(filter.options)) {
        if (filterValues.includes(filter.options[label])) filterLabels.push(label);
      }
      expandText += `: ${filterLabels.join(', ')}`;
    }
  }

  const handleMouseEnter = () => {
    setDisplayedLabel(expandText);
  };

  const handleMouseLeave = () => {
    setDisplayedLabel(props.label);
  };

  const handleDelete = (event: any) => {
    event.stopPropagation();
    setDisplayedLabel(props.label);
    props.onDelete && props.onDelete();
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setColor('info');
  };

  const handleClose = () => {
    setAnchorEl(null);
    setColor('default');
  };

  return (
    <>
      <Chip
        label={displayedLabel}
        color={color}
        icon={
          <IconButton size="small" sx={{ padding: 0 }} onClick={handleDelete}>
            <CancelIcon sx={{ color: 'gray' }} />
          </IconButton>
        }
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box paddingX="16px" paddingY="8px" minWidth="300px">
          {filter.type === 'slider' ? (
            <TableSliderFilter
              filterName={filter.name}
              variableName={filter.variableName}
              npCatagory={filter.npCategory}
              maxValue={filter.max}
              minValue={filter.min}
              step={filter.step}
              value={filterValues}
              applyFilter={props.applyFilter}
            />
          ) : (
            <TableOptionFilter
              filterName={filter.name}
              variableName={filter.variableName}
              npCatagory={filter.npCategory}
              optionType={filter.optionType}
              options={filter.options}
              values={filterValues}
              applyFilter={props.applyFilter}
            />
          )}
        </Box>
      </Menu>
    </>
  );
};
