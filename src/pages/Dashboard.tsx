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
  IconButton,
  Paper,
  TextField,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Modal
} from '@mui/material';
import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { Filter, brainDataFilters } from '../types/Filter';
import { ExpandableChip } from '../components/ExpandableChip';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
  const [openFilterSideBar, setFilterSideBar] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string | undefined>('');

  const [filters, setFilters] = useState<Filter[]>([]);

  // Filter side bar handler
  const handleFilterSideBarOpen = () => setFilterSideBar(!openFilterSideBar);
  const handleFilterSideBarClose = () => setFilterSideBar(false);

  // Filter objects

  // dialog states
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogContent, setDialogContent] = useState<string>('');
  const [tableDialogOpen, setTableDialogOpen] = useState<boolean>(false);

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

  // add another handleAddFilter for autocomplete. Code would be the original
  const handleAddFilterAutocomplete = (_event: any, newValue: string[]) => {
    setSelectedCategories(newValue);

    // add new filter UI element to filters which will be rendered as chips
    setFilters((prevState) => {
      const newState = [...prevState];
      const newFilter = brainDataFilters.find((filter) => filter.variableName === newValue[newValue.length - 1]);
      if (newFilter) newState.push(newFilter);
      return newState;
    });
  };

  const handleAddFilter = (newValue: string) => {
    setSelectedCategories((prevState) => {
      return [...prevState, newValue];
    });

    // add new filter UI element to filters which will be rendered as chips
    setFilters((prevState) => {
      const newState = [...prevState];
      const newFilter = brainDataFilters.find((filter) => filter.variableName === newValue);
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
      setTableDialogOpen(true);
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
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleFilterSideBarOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={openFilterSideBar} onClose={handleFilterSideBarClose}>
        <Toolbar />
        <Box sx={{ width: 400 }}>
          <Autocomplete
            disablePortal
            disableClearable
            multiple
            size="small"
            renderTags={() => null}
            id="combo-box-demo"
            options={categories}
            sx={{ minWidth: 300, width: 300, marginLeft: 1, marginTop: 5 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filters"
                onKeyDown={(event: KeyboardEvent) => {
                  if (event.key === 'Backspace' || event.key === 'Delete') event.stopPropagation();
                }}
              />
            )}
            filterOptions={() => {
              const filtered = categories.filter((option) => {
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
            onChange={handleAddFilterAutocomplete}
          />
          <List>
            {brainDataFilters.map((filter) => (
              <ListItem key={filter.name} disablePadding>
                <ListItemButton>
                  <IconButton
                    onClick={() => {
                      handleAddFilter(filter.variableName);
                    }}
                    disabled={filters.includes(filter)}
                  >
                    {filters.includes(filter) ? <CheckBoxIcon /> : <AddIcon />}
                  </IconButton>
                  <ListItemText primary={filter.variableName} />
                  <Tooltip title={filter.description}>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                  </Tooltip>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Paper sx={{ width: 'fit-content', maxWidth: '100%' }}>
        <Box display="flex" flexDirection="column" padding={4}>
          <Box display="flex">
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
            </Box>
            <Box display="flex" justifyContent="flex-end" paddingTop="1rem">
              <Button variant="contained" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Table dialog */}
        <Modal open={tableDialogOpen} onClose={() => setTableDialogOpen(false)}>
          <Box sx={{ position: 'absolute', top: '30%', left: '25%', right: 'auto', bottom: 'auto', width: '50%', height: '50%' }}>
            <SummaryTable name="Brain Tissue Analytics" data={data} />
          </Box>
        </Modal>

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
    </>
  );
};

export async function loader() {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/brain-data`);

  return response.data;
}
