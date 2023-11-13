import { Link, Typography } from '@mui/material';

export function HomePage() {
  return (
    <>
      <Typography variant="h4">FHS-BAP Data Portal: An integrated Data Query System</Typography>
      <br />
      <Typography variant="body1" textAlign="start">
        Welcome to the Framingham Heart Study (FHS) Brain Aging Program (<Link href="https://www.bumc.bu.edu/fhs-bap/">FHS-BAP</Link>) Data Query System, your gateway to
        investigating brain aging and disease. The FHS-BAP Database is a valuable resource for scientific exploration into the connections between genetics, environmental factors,
        neurological diseases, and healthy aging.
      </Typography>
      <br />

      <Typography variant="body1" textAlign="start">
        Our data query system is a user-friendly platform designed to facilitate the efficient retrieval of relevant information for your research projects focused on brain aging
        data and biospecimen availability within the esteemed Framingham Heart Study (FHS). It offers the following key features:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1" textAlign="start">
            <b>Search and Discover:</b> Easy navigation through our database to ascertain the availability of brain aging data and biospecimens to align with your research
            requirements.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" textAlign="start">
            <b>Data Summary:</b> Obtain summary statistics from our extensive database and export as spreadsheets for proposal and grant applications.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" textAlign="start">
            <b>Request Portal:</b> Streamline the process of submitting data and biospecimen requests through Framingham Heart Study research application, while our experienced
            team assists you throughout the procedure.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" textAlign="start">
            <b>Collaboration Opportunities:</b> Engage with FHS-BAP researchers to explore collaborative projects and harness collective expertise in your research endeavors.
          </Typography>
        </li>
      </ul>
    </>
  );
}
