import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Switch, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { SummaryTable } from '../components/SummaryTable/SummaryTable';
import { useLoaderData } from 'react-router-dom';
import { TableSliderFilter } from '../components/Filters/TableSliderFilter';
import { TableOptionFilter } from '../components/Filters/TableOptionFilter';
import axios from 'axios';
import { Data } from '../components/SummaryTable/data';

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
  const responseData = useLoaderData();
  const data = responseData.data.map((row: any) => {
    return {
      type: row.type,
      total: row.total,
      average_age_at_death: row.average_age_at_death,
      hs_grad: row.hs_grad,
      college_grad: row.college_grad,
      mri_1: row.mri_1,
      mri_2: row.mri_2,
      mri_3: row.mri_3,
      dvoice_1: row.dvoice_1,
      dvoice_2: row.dvoice_2,
      dvoice_3: row.dvoice_3,
      smoking_ever: row.smoking_ever,
      overall_dementia_probe: row.overall_dementia_probe,
      hypertension_ever: row.hypertension_ever,
      diabetic_ever: row.diabetic_ever
    };
  });

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

  return (
    <Box width="calc(100vw - 4rem)" display="flex">
      <Box width="80%">
        <SummaryTable name="Brain Tissue Analytics" data={data} />
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
                />
              ) : (
                <TableOptionFilter key={filter.name} filterName={filter.name} variableName={filter.variableName} optionType={filter.optionType!} options={filter.options!} />
              )
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export async function loader() {
  const response = await axios.get('http://localhost:3000/brain-data');

  if (response.status !== 200) {
    throw new Error('Failed to load data');
  } else {
    return response;
  }
}
