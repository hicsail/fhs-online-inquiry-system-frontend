import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { FC, useState } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import { TableSliderFilter } from '../components/Filters/TableSliderFilter';
import { TableOptionFilter } from '../components/Filters/TableOptionFilter';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Filter, brainDataFilters } from '../types/Filter';

const categories = [
  'Postmortem Interval (Hours)',
  'Age of Death',
  'RNA Integrity Number',
  'Frozen tissue present',
  'Fixative',
  'Observed infarcts',
  'Chronic traumatic encephalopathy (CTE)',
  'Atherosclerosis severity',
  'ALS/Motor neuron disease',
  'Derived AD dementia',
  'Age-related tauopathy',
  'FTLD with Tau pathology',
  'FTLD with TDP-43',
  'Hippocampal Sclerosis'
];

type FilterRequest = {
  [key: string]: any;
  categories?: { [key: string]: any };
};

export const DashboardPage: FC = () => {
  const [data, setData] = useState(useLoaderData());
  const [filter, setFilter] = useState<FilterRequest>({});
  const [loading, setLoading] = useState(false);

  // demographic filter states
  const [demoExpand, setDemoExpand] = useState(false);
  const [demoChecked, setDemoChecked] = useState(false);
  const [demoDisabled, setDemoDisabled] = useState(true);

  // unique filter states
  const [expand, setExpand] = useState(false);

  const [value, setValue] = useState<string | undefined>('');
  const [inputValue, setInputValue] = useState<string | undefined>('');

  const [filters, setFilters] = useState<Filter[]>([]);

  const changeFilter = (name: string, value: any, removeFilter: boolean, npCatagory: boolean) => {
    if (removeFilter) {
      setFilter((prevState) => {
        if (npCatagory && prevState.categories) {
          const newCategories = prevState.categories;
          delete newCategories![name];

          return { ...prevState, categories: newCategories };
        }

        const newState = { ...prevState };
        delete newState[name];
        return newState;
      });
    } else {
      setFilter((prevState) => {
        if (npCatagory) {
          const newCategories = prevState.categories ?? {};
          newCategories[name] = [Number(value)];

          return { ...prevState, categories: newCategories };
        }

        const newState = { ...prevState };
        newState[name] = value;
        return newState;
      });
    }
  };

  const handleDemoExpand = (event: any) => {
    if (event.target.checked === undefined) {
      setDemoExpand(!demoExpand);
    } else {
      setDemoChecked(event.target.checked);
      setDemoDisabled(!event.target.checked);
      setDemoExpand(event.target.checked);
    }
  };

  const handleExpand = (event: any) => {
    if (event.target.checked === undefined) {
      setExpand(!expand);
    } else {
      setExpand(event.target.checked);
    }
  };

  const handleRemoveFilter = (name: string, npCatagory: boolean) => {
    changeFilter(name, null, true, npCatagory);
    setFilters((prevState) => {
      const newState = prevState.filter((filter) => filter.name !== name);
      return newState;
    });
  };

  const handleApplyFilters = async () => {
    setLoading(true);
    const response = await axios.post('http://localhost:3002/brain-data', filter);

    setData(response.data);
    setLoading(false);
  };

  return (
    <Box width="calc(100vw - 6rem)" display="flex">
      <Box width="80%">
        <Box>
          <Backdrop open={loading} sx={{ position: 'absolute', zIndex: 9999 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <SummaryTable name="Brain Tissue Analytics" data={data} />
        </Box>
        <Box display="flex" justifyContent="flex-end" width="100%" paddingTop="1rem">
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-start" width="100%" paddingTop="1rem">
          <FormControl sx={{ width: '35%' }}>
            <InputLabel shrink>Categories</InputLabel>
            <Select native multiple label="Categories">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box width="20%" paddingLeft="2rem">
        <Accordion expanded={demoExpand} onChange={handleDemoExpand}>
          <AccordionSummary>
            <Typography variant="h6">Demographics</Typography>
            <Switch checked={demoChecked} onClick={handleDemoExpand} sx={{ position: 'absolute', right: 10 }} />
          </AccordionSummary>
          <AccordionDetails>
            <TableSliderFilter filterName="age_core1" variableName="Age Range" maxValue={100} minValue={0} disabled={demoDisabled} npCatagory={false} applyFilter={changeFilter} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expand} onChange={handleExpand}>
          <AccordionSummary>
            <Typography variant="h6">Brain Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={categories}
              sx={{ width: 300, backgroundColor: 'white', pr: '2vh' }}
              renderInput={(params) => <TextField {...params} label="NP Conditions" />}
              ListboxProps={{
                style: {
                  maxHeight: '12vh'
                }
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              inputValue={inputValue}
              value={value}
              onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
                setFilters((prevState) => {
                  const newState = [...prevState];
                  const newFilter = brainDataFilters.find((filter) => filter.variableName === newValue);
                  if (newFilter) newState.push(newFilter);
                  return newState;
                });
              }}
            />
            {filters.map((filter, index) => (
              <div key={filter.name}>
                <Box>
                  <Box textAlign="end">
                    <IconButton onClick={() => handleRemoveFilter(filter.name, filter.npCategory)} sx={{ height: '5px', width: '5px' }}>
                      <CloseIcon sx={{ height: '15px', width: '15px' }} />
                    </IconButton>
                  </Box>

                  {filter?.type === 'slider' ? (
                    <TableSliderFilter
                      filterName={filter.name}
                      variableName={`${filter.variableName + (index < filters.length)}`}
                      npCatagory={filter.npCategory}
                      maxValue={filter.max!}
                      minValue={filter.min!}
                      minDistance={filter.minDistance}
                      step={filter.step}
                      applyFilter={changeFilter}
                    />
                  ) : (
                    <TableOptionFilter
                      filterName={filter.name}
                      variableName={filter.variableName}
                      npCatagory={filter.npCategory}
                      optionType={filter.optionType!}
                      options={filter.options!}
                      applyFilter={changeFilter}
                    />
                  )}
                </Box>
                {index < filters.length - 1 && <Divider sx={{ m: 1 }} />}
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export async function loader() {
  const response = await axios.post('http://localhost:3002/brain-data');

  return response.data;
}
