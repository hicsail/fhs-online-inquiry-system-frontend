import { Autocomplete, Backdrop, Box, Button, Card, CircularProgress, Divider, Paper, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import { TableSliderFilter } from '../components/Filters/TableSliderFilter';
import { TableOptionFilter } from '../components/Filters/TableOptionFilter';
import axios from 'axios';
import { Filter, brainDataFilters } from '../types/Filter';
import { ExpandableChip } from '../components/ExpandableChip';

const categories = brainDataFilters.map((filter) => filter.variableName);

type FilterRequest = {
  categories: { [key: string]: number[] };
  [key: string]: number[] | { [innerKey: string]: number[] };
};

export const DashboardPage: FC = () => {
  const [data, setData] = useState(useLoaderData());
  const [filterRequest, setFilterRequest] = useState<FilterRequest>({ categories: {} });
  const [loading, setLoading] = useState(false);

  // filters dropdown states
  const [filterDropdowns, setFilterDropdowns] = useState<{ [key: string]: boolean }>({});

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string | undefined>('');

  const [filters, setFilters] = useState<Filter[]>([]);

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

  const handleFilterDropdown = (name: string) => {
    // set all dropdowns to false except the one clicked
    setFilterDropdowns((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        if (key !== name) acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean });
      newState[name] = !prevState[name];

      return newState;
    });
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

    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    const newFilter = filters[filters.length - 1];
    if (!newFilter) return;

    // set all categories to false
    setFilterDropdowns((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean });

      return newState;
    });

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
    <Paper>
      <Box display="flex" flexDirection="column" padding={4}>
        <Box display="flex">
          <Autocomplete
            disablePortal
            multiple
            filterSelectedOptions
            size="small"
            renderTags={() => null}
            id="combo-box-demo"
            options={categories}
            sx={{ minWidth: 300, width: 300, marginRight: 2 }}
            renderInput={(params) => <TextField {...params} label="Filters" />}
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
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} minWidth="30vw">
            {filters.map((filter) => {
              // add filter value to chip extended label
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

              return (
                <div key={filter.name}>
                  <ExpandableChip
                    label={`${filter.variableName}`}
                    expendedLabel={expandText}
                    onClick={() => handleFilterDropdown(filter.variableName)}
                    onDelete={() => handleRemoveFilter(filter.name, filter.variableName, filter.npCategory)}
                  />
                  {filterDropdowns[filter.variableName] && (
                    <Box component={Card} zIndex={1} position="absolute" padding={2} minWidth={300}>
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
                    </Box>
                  )}
                </div>
              );
            })}
          </Box>
        </Box>
        <Divider sx={{ m: 2 }} />
        <Box width="fit-content" maxWidth="100%">
          <Backdrop open={loading} sx={{ position: 'absolute', zIndex: 9999 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <SummaryTable name="Brain Tissue Analytics" data={data} />
        </Box>
        <Box display="flex" justifyContent="flex-end" width="100%" paddingTop="1rem">
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export async function loader() {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/brain-data`);

  return response.data;
}
