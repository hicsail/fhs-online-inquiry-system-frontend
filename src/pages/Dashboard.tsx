import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { Filter, brainDataFilters } from '../types/Filter';
import { ExpandableChip } from '../components/ExpandableChip';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { TableSliderFilter } from '../components/Filters/TableSliderFilter';
import { TableOptionFilter } from '../components/Filters/TableOptionFilter';

const categories = brainDataFilters.map((filter) => filter.variableName);

type FilterRequest = {
  categories: { [key: string]: number[] };
  [key: string]: number[] | { [innerKey: string]: number[] };
};

export const DashboardPage: FC = () => {
  const [data, setData] = useState(useLoaderData());
  const [filterRequest, setFilterRequest] = useState<FilterRequest>({ categories: {} });
  const [loading, setLoading] = useState(false);
  const [displayClearFilters, setDisplayClearFilters] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string | undefined>('');

  const [filters, setFilters] = useState<Filter[]>([]);

  // dialog states
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogContent, setDialogContent] = useState<string>('');

  const changeFilter = (name: string, value: any, removeFilter: boolean, npCatagory: boolean) => {
    if (removeFilter) {
      setFilterRequest((prevState) => {
        if (npCatagory && prevState.categories) {
          const newCategories = prevState.categories;
          delete newCategories[name];

          return { ...prevState, categories: newCategories };
        }

        const newState = { ...prevState };
        delete newState[name];
        return newState;
      });
    } else {
      setFilterRequest((prevState) => {
        if (npCatagory) {
          const newCategories = prevState.categories ?? {};
          newCategories[name] = Array.isArray(value) ? value : [Number(value)];

          return { ...prevState, categories: newCategories };
        }

        const newState = { ...prevState };
        newState[name] = value;
        return newState;
      });
    }
  };

  const handleAddFilter = (_event: any, newValue: string[]) => {
    setSelectedCategories(newValue);

    // add new filter UI element to filters which will be rendered as chips
    setFilters((prevState) => {
      const newState = [...prevState];
      const newFilter = brainDataFilters.find((filter) => filter.variableName === newValue[newValue.length - 1]);
      if (newFilter) newState.push(newFilter);
      return newState;
    });
  };

  const handleRemoveFilter = (name: string, label: string, npCatagory: boolean) => {
    // remove filter from filter request
    changeFilter(name, null, true, npCatagory);

    // remove filter chip UI element
    setFilters((prevState) => {
      const newState = prevState.filter((filter) => filter.name !== name);
      return newState;
    });
    setSelectedCategories((prevState) => {
      const newState = prevState.filter((category) => category !== label);
      return newState;
    });
  };

  const handleApplyFilters = async () => {
    setLoading(true);
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/brain-data`, filterRequest);

    if (response.status === 201) {
      setData(response.data);
    } else if (response.status === 206) {
      setDialogOpen(true);
      setDialogTitle('Failed to retrieve summary data');
      setDialogContent(response.data.error);
    } else {
      setDialogOpen(true);
      setDialogTitle('Something went wrong');
      setDialogContent(JSON.stringify(response.data));
    }

    setLoading(false);
  };

  const handleClearFilters = () => {
    setFilterRequest({ categories: {} });
    setFilters([]);
    setSelectedCategories([]);
    setDisplayClearFilters(false);
  };

  useEffect(() => {
    const newFilter = filters[filters.length - 1];
    if (!newFilter) return;

    if (filters.length > 1) setDisplayClearFilters(true);
    else setDisplayClearFilters(false);

    // add new filter to filter request
    setFilterRequest((prevState) => {
      const newState: FilterRequest = { ...prevState, categories: prevState.categories ?? {} };

      // add new filter to the filter request
      if (newFilter.npCategory) {
        if (!newState.categories[newFilter.name]) {
          if (newFilter.type === 'slider') newState.categories[newFilter.name] = [newFilter.min, newFilter.max];
          else if (newFilter.type === 'option' && newFilter.optionType !== 'checkbox') newState.categories[newFilter.name] = [Object.values(newFilter.options)[0]];
        }
      } else {
        if (!newState[newFilter.name]) {
          if (newFilter.type === 'slider') newState[newFilter.name] = [newFilter.min, newFilter.max];
          else if (newFilter.type === 'option' && newFilter.optionType !== 'checkbox') newState[newFilter.name] = [Object.values(newFilter.options)[0]];
        }
      }

      return newState;
    });
  }, [filters, selectedCategories]);

  return (
    <>
      <Box display="flex" flexDirection="column" padding={4}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h5">
              Current Filter
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {filters.map((filter, index) => {
              const filterValues = filter.npCategory ? (filterRequest.categories[filter.name] as number[]) : (filterRequest[filter.name] as number[]);

              return (
                <div key={filter.name}>
                  <Box textAlign="end">
                    <IconButton onClick={() => handleRemoveFilter(filter.name, filter.variableName, filter.npCategory)} sx={{ height: '30px', width: '30px' }}>
                      <CloseIcon sx={{ height: '20px', width: '20px' }} />
                    </IconButton>
                  </Box>
                  {filter.type === 'slider' ? (
                    <TableSliderFilter
                      filterName={filter.name}
                      variableName={filter.variableName}
                      npCatagory={filter.npCategory}
                      maxValue={filter.max}
                      minValue={filter.min}
                      step={filter.step}
                      value={filterValues}
                      applyFilter={changeFilter}
                    />
                  ) : (
                    <TableOptionFilter
                      filterName={filter.name}
                      variableName={filter.variableName}
                      npCatagory={filter.npCategory}
                      optionType={filter.optionType}
                      options={filter.options}
                      values={filterValues}
                      applyFilter={changeFilter}
                    />
                  )}
                  {index < filters.length - 1 && <Divider sx={{ m: 2 }} />}
                </div>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Box width="fit-content" minWidth={600} maxWidth="100%" maxHeight="100%">
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export async function loader() {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/brain-data`);

  return response.data;
}
