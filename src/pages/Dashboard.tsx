import { Box } from '@mui/material';
import { FC } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import AutoTextBox from '../autocomplete/AutoTextBox';

export const DashboardPage: FC = () => {
  const data = useLoaderData();

  // TODO: data should be passed to the table
  console.log(data);

  return (
    <Box width="calc(100vw - 4rem)" display="flex">
      <Box width="70%">
        <SummaryTable />
      </Box>
      <Box width="30%" paddingRight="2%" paddingLeft="2%">Filters
        <AutoTextBox/>
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
