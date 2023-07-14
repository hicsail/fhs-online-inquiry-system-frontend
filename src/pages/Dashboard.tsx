import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Switch, Typography } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import { TableSliderFilter } from '../components/Filters/TableSliderFilter';
import { TableOptionFilter } from '../components/Filters/TableOptionFilter';
import axios from 'axios';

type Filter = {
  name: string;
  variableName: string;
  type: 'slider' | 'option';
  max?: number;
  min?: number;
  step?: number;
  minDistance?: number;
  optionType?: 'checkbox' | 'radio' | 'select';
  options?: string[];
};

export const DashboardPage: FC = () => {
  const [data, setData] = useState(useLoaderData());

  const [filter, setFilter] = useState({});

  // demographic filter states
  const [demoExpand, setDemoExpand] = useState(false);
  const [demoChecked, setDemoChecked] = useState(false);
  const [demoDisabled, setDemoDisabled] = useState(true);

  // anthropometric filter states
  const [anthroExpand, setAnthroExpand] = useState(false);
  const [anthroChecked, setAnthroChecked] = useState(false);
  const [anthroDisabled, setAnthroDisabled] = useState(true);

  // unique filter states
  const [expand, setExpand] = useState(false);

  const changeFilter = (name: string, removeFilter: boolean, value: any) => {
    if (removeFilter) {
      setFilter((prevState) => {
        const newState = { ...prevState };
        delete newState[name];
        return newState;
      });
    } else {
      setFilter((prevState) => {
        const newState = { ...prevState };
        newState[name] = value;
        return newState;
      });
    }
  };

  const filters: Filter[] = [
    { name: 'nppmih_hours', variableName: 'Postmortem Interval (Hours)', type: 'slider', max: 160, min: 0 },
    { name: 'age_death', variableName: 'Age of Death', type: 'slider', max: 100, min: 0 },
    { name: 'nprin', variableName: 'RNA Integrity Number', type: 'slider', max: 10, min: 0, minDistance: 0.1, step: 0.1 }
  ];

  const handleDemoExpand = (event: any) => {
    if (event.target.checked === undefined) {
      setDemoExpand(!demoExpand);
    } else {
      setDemoChecked(event.target.checked);
      setDemoDisabled(!event.target.checked);
      setDemoExpand(event.target.checked);
    }
  };

  const handleAnthroExpand = (event: any) => {
    if (event.target.checked === undefined) {
      setAnthroExpand(!anthroExpand);
    } else {
      setAnthroChecked(event.target.checked);
      setAnthroDisabled(!event.target.checked);
      setAnthroExpand(event.target.checked);
    }
  };

  const handleExpand = (event: any) => {
    if (event.target.checked === undefined) {
      setExpand(!expand);
    } else {
      setExpand(event.target.checked);
    }
  };

  const handleApplyFilters = async () => {
    console.log(filter);
    const response = await axios.post('http://localhost:3000/brain-data', filter);

    setData(response.data);
  };

  return (
    <Box width="calc(100vw - 4rem)" display="flex">
      <Box width="80%">
        <SummaryTable name="Brain Tissue Analytics" data={data} />
        <Box display="flex" justifyContent="flex-end" width="100%" paddingTop="1rem">
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Box>
      </Box>
      <Box width="20%" paddingLeft="2rem">
        <Accordion expanded={demoExpand} onChange={handleDemoExpand}>
          <AccordionSummary>
            <Typography variant="h6">Demographics</Typography>
            <Switch checked={demoChecked} onClick={handleDemoExpand} sx={{ position: 'absolute', right: 10 }} />
          </AccordionSummary>
          <AccordionDetails>
            <TableSliderFilter filterName="age_core1" variableName="Age Range" maxValue={100} minValue={0} disabled={demoDisabled} applyFilter={changeFilter} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={anthroExpand} onChange={handleAnthroExpand}>
          <AccordionSummary>
            <Typography variant="h6">Anthropometric</Typography>
            <Switch checked={anthroChecked} onClick={handleAnthroExpand} sx={{ position: 'absolute', right: 10 }} />
          </AccordionSummary>
          <AccordionDetails>
            <TableSliderFilter filterName="bmi" variableName="BMI Range" maxValue={100} minValue={0} disabled={anthroDisabled} applyFilter={changeFilter} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expand} onChange={handleExpand}>
          <AccordionSummary>
            <Typography variant="h6">Brain Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {filters.map((filter) =>
              filter.type === 'slider' ? (
                <TableSliderFilter
                  key={filter.name}
                  filterName={filter.name}
                  variableName={filter.variableName}
                  maxValue={filter.max!}
                  minValue={filter.min!}
                  minDistance={filter.minDistance}
                  step={filter.step}
                  applyFilter={changeFilter}
                />
              ) : (
                <TableOptionFilter
                  key={filter.name}
                  filterName={filter.name}
                  variableName={filter.variableName}
                  optionType={filter.optionType!}
                  options={filter.options!}
                  applyFilter={changeFilter}
                />
              )
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export async function loader() {
  const response = await axios.post('http://localhost:3000/brain-data');

  return response.data;
}
