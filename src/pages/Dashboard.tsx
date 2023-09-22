import {
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
  Paper,
  TextField
} from '@mui/material';
import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { Filter, brainDataFilters } from '../types/Filter';
import { ExpandableChip } from '../components/ExpandableChip';
import ClearIcon from '@mui/icons-material/Clear';

// options for the autocomplete filter
// the value of it shouldn't be changed
const categories = brainDataFilters.map((filter) => filter.variableName);

// HTTP request body type for the filter request
type FilterRequest = {
  categories: { [key: string]: number[] };
  [key: string]: number[] | { [innerKey: string]: number[] };
};

export const DashboardPage: FC = () => {
  const [data, setData] = useState(useLoaderData()); // HTTP response.data returned from the loader() function at the bottom of this file
  const [filterRequest, setFilterRequest] = useState<FilterRequest>({ categories: {} }); // HTTP request body to be sent to the backend
  const [loading, setLoading] = useState(false); // state for displaying the loading backdrop on the table
  const [displayClearFilters, setDisplayClearFilters] = useState(false); // state for displaying the clear filters button

  /**
   * The following states are used for the autocomplete filter
   *
   * @const selectedCategories: A list of selected filters. It only stores the name of the filter. AutoComplete will use it to filter out
   *    options. Chips will be rendered based on what are in the list.
   * @const inputValue: The value of the input text field in the AutoComplete.
   */
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string | undefined>('');

  /**
   * @const filters: A list of selected filters. You should manually keep it in sync with selectedCategories. It is used to render
   *    filter panels. It is also used to generate the HTTP request body.
   */
  const [filters, setFilters] = useState<Filter[]>([]);

  // states for the dialog which will be displayed when there is an error
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogContent, setDialogContent] = useState<string>('');

  /**
   * This function will be passed to the filter panels. Therefore, when the user changes the filter value or remove the filter, we can
   * update the filter HTTP request body at the same time.
   */
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

  // handler for autocomplete to add new filter to the list
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

  // handler for chips to remove filter from the list
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

  /**
   * This effect is mainly used to keep autocomplete, chips, filter request body and filter panels in sync.
   */
  useEffect(() => {
    // Based on trust. The last element in the list should be the newly added filter.
    const newFilter = filters[filters.length - 1];
    if (!newFilter) return;

    // clear filters only make sense when there are more than 1 filter
    if (filters.length > 1) setDisplayClearFilters(true);
    else setDisplayClearFilters(false);

    // add new filter to filter HTTP request body
    setFilterRequest((prevState) => {
      const newState: FilterRequest = { ...prevState, categories: prevState.categories ?? {} };

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

  /**
   * <Autocomplete>:
   *    - @prop options: The list of options that will be displayed in the dropdown. Value should not be changed.
   *    - @prop renderTags: Should returns null which will hide the selected chips in the text field.
   *    - @prop renderInput: How the input text field is rendered.
   *    - @prop renderOption: How each option is rendered in the dropdown.
   *    - @prop filterOptions: Should filter out the selected options.
   *    - @prop onChange: Autocomplete does not add/delete by itself. You should do that here manually.
   *    - @prop value: Autocomplete does not tell which option is newly added. It will give you all selected
   *        options. Any newly added option will be the last element in the array. So we can use this to get
   *        the newly added option.
   */
  return (
    <Paper sx={{ width: 'fit-content', maxWidth: '100%' }}>
      <Box display="flex" flexDirection="column" padding={4}>
        <Box display="flex">
          <Autocomplete
            disablePortal
            disableClearable
            multiple
            size="small"
            renderTags={() => null}
            id="combo-box-demo"
            options={categories}
            sx={{ minWidth: 300, width: 300, marginRight: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filters"
                onKeyDown={(event: KeyboardEvent) => {
                  if (event.key === 'Backspace' || event.key === 'Delete') event.stopPropagation();
                }}
              />
            )}
            renderOption={(props, option) => {
              // how each option is rendered in the dropdown
              return (
                <li {...props} aria-selected="false">
                  {option}
                </li>
              );
            }}
            filterOptions={() => {
              // what will be displayed in the dropdown
              const filtered = categories.filter((option) => {
                // exclude the selected filters
                return !selectedCategories.includes(option);
              });

              return filtered;
            }}
            ListboxProps={{
              style: {
                textAlign: 'start',
                maxHeight: '20vh'
              }
            }}
            onInputChange={(_event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            inputValue={inputValue}
            value={selectedCategories}
            onChange={handleAddFilter}
          />
          {displayClearFilters && (
            <Button onClick={handleClearFilters} startIcon={<ClearIcon />} sx={{ marginRight: 1 }}>
              Clear
            </Button>
          )}
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
            {filters.map((filter) => (
              <ExpandableChip
                key={filter.name}
                filter={filter}
                filterRequest={filterRequest}
                label={`${filter.variableName}`}
                applyFilter={changeFilter}
                onDelete={() => handleRemoveFilter(filter.name, filter.variableName, filter.npCategory)}
              />
            ))}
          </Box>
        </Box>
        <Divider sx={{ m: 2 }} />
        <Box width="fit-content" minWidth={600} maxWidth="100%" maxHeight="100%">
          <Box>
            <Backdrop open={loading} sx={{ position: 'absolute', zIndex: 9999 }}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <SummaryTable name="Brain Tissue Analytics" data={data} />
          </Box>
          <Box display="flex" justifyContent="flex-end" paddingTop="1rem">
            <Button variant="contained" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </Box>
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
    </Paper>
  );
};

export async function loader() {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/brain-data`);

  return response.data;
}
