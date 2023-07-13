import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SelectedConditionBox = (props: any) => {
  // Container for selected conditions
  const { deselectCondition } = props;
  return (
    <Box
      sx={{
        m: '.5em',
        borderColor: 'primary.main',
        borderStyle: 'solid',
        borderWidth: '2px'
      }}
    >
      {props.children}
      <IconButton onClick={deselectCondition}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

const AutoTextBox = () => {
  const [value, setValue] = React.useState<string | null>(brainConditions[0]);
  // value changes if inputValue is matched with list of brainConditions
  const [inputValue, setInputValue] = React.useState<string | null>('');
  // value of text within box - doesn't need to match

  const [selectedConditions, setSelectedConditions] = React.useState<Set<string | null>>(new Set<string | null>());
  // This state will probably have to be raised for making calls to API

  const renderSelectedConditions = (conditions: Set<string | null>) => {
    return Array.from(conditions).map((condition: string | null) => {
      return (
        <SelectedConditionBox
          key={condition}
          deselectCondition={() => {
            selectedConditions.delete(condition);
            setSelectedConditions(new Set(selectedConditions));
          }}
        >
          {condition}
        </SelectedConditionBox>
      );
    });
  };

  return (
    <Paper
      sx={{
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        float: 'left',
        textAlign: 'center',
        verticalAlign: 'middle',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
        padding: '10px'
      }}
    >
      <Box> {renderSelectedConditions(selectedConditions)}</Box>
      <Box sx={{ display: 'flex' }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={brainConditions}
          sx={{ width: 300, backgroundColor: 'white', pr: '2vh' }}
          renderInput={(params) => <TextField {...params} label="NP Conditions" />}
          ListboxProps={{
            style: {
              maxHeight: '12vh'
            }
          }}
          inputValue={inputValue !== null ? inputValue : undefined}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
        />
        <Button
          color="primary"
          variant="contained"
          onMouseDown={() => {
            setSelectedConditions(new Set(selectedConditions.add(value !== null ? value : '')));
          }}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
};

const mapping = {
  'Frozen tissue present': { Right: 1, Left: 2, NA: 3 },
  Fixative: { Formalin: 1, Paraformaldehyde: 2, Other: 7 },
  'Observed infarcts': {
    No: 0,
    Yes: 1
  },
  'Chronic Traumatic Encephalopathy': {
    No: 0,
    Yes: 1
  },
  'Atherosclerosis severity': {
    None: 0,
    Mild: 1,
    Moderate: 2,
    Severe: 3,
    Not_Assessed: 8,
    Missing_Unknown: 9
  },
  'ALS/Motor neuron disease': {
    No: 0,
    Yes_TDP43: 1,
    Yes_FUS: 2,
    Yes_SOD1: 3,
    Yes_other: 4,
    Not_Assessed: 8,
    Missing_Unknown: 9
  },
  'Derived AD dementia': {
    No: 0,
    Yes: 1
  },
  'Age-related tauopathy': {
    No: 0,
    Yes: 1
  },
  'FTLD with Tau pathology': {
    No: 0,
    Yes: 1
  },
  'FTLD with TDP-43': {
    No: 0,
    Yes: 1
  },
  'Hippocampal Sclerosis': {
    None: 0,
    Unilateral: 1,
    Bilateral: 2,
    Present: 3,
    Missing_Unknown: 9
  }
};

const brainConditions = Object.entries(mapping)
  .map((entry) => {
    const prefix = entry[0];
    const statuses = entry[1];
    const statusNames = Object.keys(statuses);
    return statusNames.map((statusName) => {
      return prefix + ' - ' + statusName;
    });
  })
  .flat();

export default AutoTextBox;
