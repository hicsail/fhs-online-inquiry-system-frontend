import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
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
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { Filter, brainDataFilters } from '../types/Filter';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
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
  const [openFilterSideBar, setFilterSideBar] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [filters, setFilters] = useState<Filter[]>([]);

  // Filter side bar handler
  const handleFilterSideBarOpen = () => setFilterSideBar(!openFilterSideBar);
  const handleFilterSideBarClose = () => setFilterSideBar(false);

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
  };

  useEffect(() => {
    const newFilter = filters[filters.length - 1];
    if (!newFilter) return;

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
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <Box display={'flex'} width={'100%'}>
        {/* Change hover silhoutte */}
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleFilterSideBarOpen} sx={{ marginLeft: 'auto' }}>
          <Typography marginRight={1}>All Filters</Typography>
          <MenuIcon />
        </IconButton>
      </Box>
      {/* this might need to be smaller to be closer to figma design */}
      <Box display={'flex'} flexDirection={'column'} bgcolor={'white'} textAlign={'left'} sx={{ minHeight: '25%', maxHeight: '50%', minWidth: '50%', maxWidth: '90%' }}>
        <Typography variant="h4" color={'black'}>
          Introduction
        </Typography>
        <Divider sx={{ width: '80%', marginLeft: 1 }} />
        <Typography variant="body1" color={'black'}>
          The purpose of this dataset is to enable researchers to inquiry brain bio-sample availability at the Framingham Heart Study archive.
          <br />
          You can use the filters provided to narrow down the criteria of the sample and discover whether there are sample that fit your requirements and if there are, how many
          unique samples are available.
        </Typography>
        <Typography variant="h4" color={'black'}>
          Instructions
        </Typography>
        <Divider sx={{ width: '80%', marginLeft: 1 }} />
        <Typography variant="body1" color={'black'}>
          Using this inquiry system is very simple and intuitive. In essence, you would choose the criteria of the biosample by applying the filters that are available for this
          dataset. Additional information regarding the filters can be found by hovering over the information icon beside each filter. To achieve a summary of the inquiry based on
          the filters, you can follow the following steps
        </Typography>
        <ol>
          <li key={1}>
            <Typography variant="body1" color={'black'}>
              Click "All Filters" on the top right of the screen to see every available filter for this dataset.
            </Typography>
          </li>
          <li key={2}>
            <Typography variant="body1" color={'black'}>
              Use the '+' icon to add filter and then click anywhere to close the side bar.
            </Typography>
          </li>
          <li key={3}>
            <Typography variant="body1" color={'black'}>
              Adjust the values for individual filters under "Current Filters"
            </Typography>
          </li>
          <li key={4}>
            <Typography variant="body1" color={'black'}>
              Click "Apply Filter" to send the request. A table will pop up with the result
            </Typography>
          </li>
          <li key={5}>
            <Typography variant="body1" color={'black'}>
              Additional data columns can be added by clicking the '+' on top of the table
            </Typography>
          </li>
          <li key={6}>
            <Typography variant="body1" color={'black'}>
              Data are available for download in CSV or JSON format using the respective button. Click "DISMISS" when done
            </Typography>
          </li>
        </ol>
      </Box>
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
      <Box display="flex" flexDirection="column" paddingTop={4} sx={{ minHeight: '20%', maxHeight: '50%', minWidth: '50%', maxWidth: '90%' }}>
        <Box display={'flex'} width="fit-content" minWidth={600} maxWidth="100%" maxHeight="100%" marginLeft={'auto'}>
          <Button variant="contained" onClick={handleApplyFilters} sx={{ marginLeft: 'auto', marginBottom: 1 }}>
            Apply Filters
          </Button>
        </Box>
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
                      description={filter.description}
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
                      description={filter.description}
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
      </Box>

      {/* Table dialog */}
      <Modal open={tableDialogOpen} onClose={() => setTableDialogOpen(false)}>
        <Box sx={{ position: 'absolute', top: '30%', left: '25%', right: 'auto', bottom: 'auto', width: '50%', height: '50%' }}>
          <SummaryTable
            name="Brain Tissue Analytics"
            data={data}
            closeTable={() => {
              setTableDialogOpen(false);
            }}
          />
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
    </Box>
  );
};

export async function loader() {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/brain-data`);

  return response.data;
}
