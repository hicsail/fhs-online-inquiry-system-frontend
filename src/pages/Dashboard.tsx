import { Autocomplete, Backdrop, Box, Button, Card, Chip, CircularProgress, Divider, Paper, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import { TableSliderFilter } from '../components/Filters/TableSliderFilter';
import { TableOptionFilter } from '../components/Filters/TableOptionFilter';
import axios from 'axios';
import { Filter, brainDataFilters } from '../types/Filter';

const categories = brainDataFilters.map((filter) => filter.variableName);

type FilterRequest = {
  [key: string]: any;
  categories?: { [key: string]: any };
};

export const DashboardPage: FC = () => {
  const [data, setData] = useState(useLoaderData());
  const [filter, setFilter] = useState<FilterRequest>({});
  const [loading, setLoading] = useState(false);

  // filters dropdown states
  const [filterDropdowns, setFilterDropdowns] = useState<{ [key: string]: boolean }>({});

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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

  const handleFilterDropdown = (name: string) => {
    setFilterDropdowns((prevState) => {
      // set all to false
      const newState = Object.keys(prevState).reduce((acc, key) => {
        if (key !== name) acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean });
      newState[name] = !prevState[name];

      return newState;
    });
  };

  const handleRemoveFilter = (name: string, label: string, npCatagory: boolean) => {
    changeFilter(name, null, true, npCatagory);
    setFilters((prevState) => {
      const newState = prevState.filter((filter) => filter.name !== name);
      return newState;
    });
    setSelectedCategories((prevState) => {
      const newState = prevState.filter((category) => category !== label);
      return newState;
    });
    setFilterDropdowns((prevState) => {
      const newState = { ...prevState };
      delete newState[name];
      return newState;
    });
  };

  const handleApplyFilters = async () => {
    setLoading(true);
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/brain-data`, filter);

    setData(response.data);
    setLoading(false);
  };

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
            sx={{ width: 300, marginRight: 2 }}
            renderInput={(params) => <TextField {...params} label="NP Conditions" />}
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
            onChange={(_event: any, newValue: string[]) => {
              setSelectedCategories(newValue!);
              setFilters((prevState) => {
                const newState = [...prevState];
                const newFilter = brainDataFilters.find((filter) => filter.variableName === newValue[newValue.length - 1]);
                if (newFilter) newState.push(newFilter);
                return newState;
              });
            }}
          />
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} minWidth="30vw">
            {filters.map((filter) => (
              <div key={filter.name}>
                <Chip
                  label={`${filter.variableName}`}
                  onClick={() => handleFilterDropdown(filter.variableName)}
                  onDelete={() => handleRemoveFilter(filter.name, filter.variableName, filter.npCategory)}
                  variant="outlined"
                />
                {filterDropdowns[filter.variableName] && (
                  <Box component={Card} zIndex={1} position="absolute" padding={2} minWidth={300}>
                    {filter?.type === 'slider' ? (
                      <TableSliderFilter
                        filterName={filter.name}
                        variableName={`${filter.variableName}`}
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
                )}
              </div>
            ))}
          </Box>
        </Box>
        <Divider sx={{ m: 2 }} />
        <Box>
          <Box>
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
      </Box>
    </Paper>
  );
};

export async function loader() {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/brain-data`);

  return response.data;
}
