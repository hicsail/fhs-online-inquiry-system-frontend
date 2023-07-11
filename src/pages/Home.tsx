import { Typography } from '@mui/material';

export function HomePage() {
  return (
    <>
      <Typography variant="h3">Home</Typography>
      <br />
      <Typography variant="body1" textAlign="start">
        In 1997, Framingham Heart Study (FHS) began a postmortem brain tissue donation program to allow investigators to explore the environmental and genetic links to neurological
        diseases as well as healthy aging. FHS participants donated their brain to research and now qualified investigators can request brain tissue for their studies. A
        differential of the FHS brain collection is the availability of longitudinal clinical, imaging, genetic data, lifestyles, and other health-related changes available for
        each case. By relating FHS clinical information to neuropathological findings, the opportunity to identify risk factors for disease is enhanced. With the advent of new
        technologies such as single cell molecular profiling, cryo-EM, etc., there are many new scientific opportunities for the use of autopsy brain tissue to gain deeper
        mechanistic insights about brain aging and dementia.
      </Typography>
      <br />
      <Typography variant="body1" textAlign="start">
        In 2020, NIA established the FHS Brain Aging Program (FHS-BAP) through a cooperative agreement, U19 grant. Within the FHS-BAP, the Neuropathology Core is responsible for
        conducting consistent neuropathological workup and assessment of all FHS brain autopsy cases in order to facilitate the storage and distribution of biospecimens,
        comprehensive diagnoses, digital library creation, and the development of novel quantitative neuropathological measures of AD and other neuropathologically-defined
        disorders. FHS’ neuropathological protocol aligns with that of Boston University Alzheimer Disease Research Center (BU ADRC) in biospecimen collection, blocking, staining
        and storage. Visit FHS-BAP website to learn more about the BROC and Neuropath Core.
      </Typography>
    </>
  );
}
