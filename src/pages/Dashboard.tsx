import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Switch, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import { TableSliderFilter } from '../components/Filters/TableSliderFilter';

export const DashboardPage: FC = () => {
  const data = useLoaderData();

  // TODO: data should be passed to the table
  console.log(data);

  // demographic filter states
  const [demoExpand, setDemoExpand] = useState(false);
  const [demoChecked, setDemoChecked] = useState(false);
  const [demoDisabled, setDemoDisabled] = useState(true);

  // anthropometric filter states
  const [anthroExpand, setAnthroExpand] = useState(false);
  const [anthroChecked, setAnthroChecked] = useState(false);
  const [anthroDisabled, setAnthroDisabled] = useState(true);

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

  return (
    <Box width="calc(100vw - 4rem)" display="flex">
      <Box width="80%">
        <SummaryTable />
        <Box display="flex" justifyContent="flex-end" width="100%" paddingTop="1rem">
          <Button variant="contained">Apply</Button>
        </Box>
      </Box>
      <Box width="20%" paddingLeft="2rem">
        <Accordion expanded={demoExpand} onChange={handleDemoExpand}>
          <AccordionSummary>
            <Typography variant="h6">Demographics</Typography>
            <Switch checked={demoChecked} onClick={handleDemoExpand} sx={{ position: 'absolute', right: 10 }} />
          </AccordionSummary>
          <AccordionDetails>
            <TableSliderFilter filterName="age_core1" variableName="Age Range" maxValue={100} minValue={0} disabled={demoDisabled} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={anthroExpand} onChange={handleAnthroExpand}>
          <AccordionSummary>
            <Typography variant="h6">Anthropometric</Typography>
            <Switch checked={anthroChecked} onClick={handleAnthroExpand} sx={{ position: 'absolute', right: 10 }} />
          </AccordionSummary>
          <AccordionDetails>
            <TableSliderFilter filterName="bmi" variableName="BMI Range" maxValue={100} minValue={0} disabled={anthroDisabled} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export async function loader() {
  // TODO: change to api call to the backend
  const response = await fetch('https://swapi.dev/api/films');

  if (!response.ok) {
    throw new Error('Failed to load data');
  } else {
    return response;
  }
}
