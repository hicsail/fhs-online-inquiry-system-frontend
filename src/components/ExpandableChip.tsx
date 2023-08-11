import { Chip, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

export interface ExpandableChipProps {
  label: string;
  expendedLabel: string;
  variant?: 'outlined' | 'filled' | undefined;
  color?: 'primary' | 'default' | undefined;
  onClick?: () => void;
  onDelete?: () => void;
}

export const ExpandableChip: FC<ExpandableChipProps> = (props) => {
  const [displayedLabel, setDisplayedLabel] = useState<string>(props.label);

  const handleMouseEnter = () => {
    setDisplayedLabel(props.expendedLabel);
  };

  const handleMouseLeave = () => {
    setDisplayedLabel(props.label);
  };

  const handleDelete = (event: any) => {
    event.stopPropagation();
    setDisplayedLabel(props.label);
    props.onDelete && props.onDelete();
  };

  return (
    <Chip
      label={displayedLabel}
      variant={props.variant}
      color={props.color}
      icon={
        <IconButton size="small" sx={{ padding: 0 }} onClick={handleDelete}>
          <CancelIcon sx={{ color: 'gray' }} />
        </IconButton>
      }
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};
