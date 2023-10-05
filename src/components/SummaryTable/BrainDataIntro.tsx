import { Box, Divider, Typography } from '@mui/material';
import { FC } from 'react';

export const BrainDataIntro: FC = () => {
  return (
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
  );
};
