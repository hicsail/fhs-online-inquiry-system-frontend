import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import { TableSliderFilter } from '../components/Filters/TableSliderFilter';

export const DashboardPage: FC = () => {
  const data = useLoaderData();

  // TODO: data should be passed to the table
  console.log(data);

  return (
    <Box width="calc(100vw - 4rem)" display="flex">
      <Box width="80%">
        <SummaryTable />
        <Box display="flex" justifyContent="flex-end" width="100%" paddingTop="1rem">
          <Button variant="contained">Apply</Button>
        </Box>
      </Box>
      <Box width="20%" paddingLeft="2rem">
        <TableSliderFilter filterName="age_core1" filterDisplayedName="Demographics" variableName="Age Range" maxValue={100} minValue={0} />
        <TableSliderFilter filterName="bmi" filterDisplayedName="Anthropometric" variableName="BMI Range" maxValue={100} minValue={0} />
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
