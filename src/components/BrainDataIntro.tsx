import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { VideoPopup } from './VideoPopup';

export const BrainDataIntro: FC = () => {
  // video popup state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box display={'flex'} flexDirection={'column'} bgcolor={'white'} textAlign={'left'} sx={{ minHeight: '25%', maxHeight: '50%', minWidth: '50%', maxWidth: '90%' }}>
      <Typography variant="h4" fontWeight="bold" fontSize={30}>
        Introduction
      </Typography>
      <Divider />
      <Typography variant="body1" fontSize={15}>
        <p>
          In 1997, Framingham Heart Study (FHS) began a postmortem brain tissue donation program to allow investigators to explore the environmental and genetic links to
          neurological diseases as well as healthy aging. Thanks to the immense generosity of participants in the FHS, researchers have been able to make significant strides in the
          field of brain research. By donating their brains to science, FHS participants have opened up a new realm of possibilities for investigators.{' '}
          <Link href="https://reporter.nih.gov/project-details/10670334">
            In 2020, the National Institute on Aging (NIA) established the FHS-BAP through a cooperative U19 grant.
          </Link>{' '}
          Today, qualified investigators can request brain tissue for their studies.
        </p>
        <p>
          A differential of the FHS brain collection is the availability of longitudinal clinical, imaging, genetic data, lifestyles, and other health-related changes available for
          each case. By relating FHS clinical information to neuropathological findings, the opportunity to identify risk factors for disease is enhanced. With the advent of new
          technologies such as single cell molecular profiling, cryo-EM, etc., there are many new scientific opportunities for the use of autopsy brain tissue to gain deeper
          mechanistic insights about brain aging and dementia.
        </p>
        <p>
          The "Brain Tissue" data query system aims to facilitate researchers' inquiries regarding the availability of biosamples, particularly pertaining to brain tissue, within
          the cohort of FHS brain donor participants.
        </p>
      </Typography>
      <Typography variant="h4" fontWeight="bold" fontSize={30}>
        Instructions
      </Typography>
      <Divider />
      <Typography variant="body1" fontSize={15}>
        <p>
          The data query system is designed to be straightforward and user-friendly. You can select the desired biosample criteria by employing the available dataset filters.
          In-depth details regarding the filters can be accessed by hovering over the information icon adjacent to each filter or simply clicking on it. To generate a summary of
          the inquiry based on the selected filters, please follow the prescribed steps:
        </p>
        <ol>
          <li key={1}>Click "All Filters" on the top right of the screen to see every available filter for this dataset.</li>
          <li key={2}>Use the '+' icon to add filter and then click anywhere to close the side bar.</li>
          <li key={3}>Adjust the values for individual filters under "Current Filters"</li>
          <li key={4}>Click "Apply Filter" to send the request. A table will pop up with the result</li>
          <li key={5}>Additional data columns can be added by clicking the '+' on top of the table</li>
          <li key={6}>Data are available for download in CSV or JSON format using the respective button. Click "DISMISS" when done</li>
        </ol>
        <p>
          Click{' '}
          <Link sx={{ cursor: 'pointer' }} onClick={handleOpen}>
            here
          </Link>{' '}
          for a step-by-step visual demonstration.
        </p>
      </Typography>
      <VideoPopup open={open} onClose={handleClose} />
    </Box>
  );
};
