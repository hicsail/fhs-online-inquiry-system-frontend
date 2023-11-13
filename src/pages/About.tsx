import { Box, Divider, Link, Typography } from '@mui/material';
import brainAgingProgram from '../assets/brain-aging-program.png';
import framinghamHeartStudy from '../assets/framingham-heart-study.jpg';

export function AboutPage() {
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Box display="flex" gap={8}>
        <Box>
          <Typography variant="h4" textAlign="left" fontWeight="bold" fontSize={30}>
            Framingham Heart Study Brain Aging Program
          </Typography>
          <Divider />
          <Typography variant="body1" textAlign="left">
            <p>
              In 2019, the Boston University Aram V. Chobanian & Edward Avedisian School of Medicine (BUSM) received an infrastructure grant from the National Institute on Aging
              (NIA) to establish the FHS Brain Aging Program (<Link href="https://www.bumc.bu.edu/fhs-bap/">FHS-BAP</Link>). The following year, NIA established the FHS-BAP through
              a cooperative U19 grant (<Link href="https://grantome.com/grant/NIH/U19-AG068753-01">NIH 2020 U19 AG</Link>). The aim, to continue the surveillance and evaluation of
              FHS participants for dementia (including cognitive assessments and brain imaging), invigorate the FHS brain donation program and provide sufficient support for the
              FHS brain bank. The program is also establishing a platform to promote data sharing that will accelerate AD research using FHS data.
            </p>
            <p>
              FHS-BAP activities are orchestrated by a leadership team of accomplished investigators who collectively have expertise in neurology, neuropsychology, neuropathology,
              AD biology, epidemiology, biomarkers, genetics, biostatistics and advanced computational analytics and data management. An external advisory board composed of
              internationally renowned experts in a diversity of AD-related areas reviews these activities and provides guidance to the leadership team.
            </p>
          </Typography>
        </Box>
        <Box component="img" src={brainAgingProgram} height={250} alignSelf="center"></Box>
      </Box>
      <Box display="flex" gap={8}>
        <Box>
          <Typography variant="h4" textAlign="left" fontWeight="bold" fontSize={30}>
            Framingham Heart Study
          </Typography>
          <Divider />
          <Typography variant="body1" textAlign="left">
            <p>
              Since our beginning in 1948, the Framingham Heart Study (<Link href="https://www.framinghamheartstudy.org/">FHS</Link>), under the direction of the National Heart,
              Lung, and Blood Institute (NHLBI), formerly known as the National Heart Institute, has been committed to identifying the common factors or characteristics that
              contribute to cardiovascular disease (CVD). We have followed CVD development over a long period of time in three generations of participants. Since 1971, the Boston
              University School of Medicine has served as NHLBI contractor and academic partner for the study.
            </p>
            <p>
              Over the years, careful monitoring of the Framingham Study population has led to the identification of major CVD risk factors, as well as valuable information on the
              effects of these factors such as blood pressure, blood triglyceride and cholesterol levels, age, gender, and psychosocial issues. Risk factors for other physiological
              conditions such as dementia have been and continue to be investigated. In addition, the relationships between physical traits and genetic patterns are being studied.
            </p>
            <p>
              For new research projects, data/biospecimen requests, please go to: <Link href="https://wwwapp.bumc.bu.edu/fhsresapp">https://wwwapp.bumc.bu.edu/fhsresapp</Link>
            </p>
          </Typography>
        </Box>
        <Box component="img" src={framinghamHeartStudy} height={250} alignSelf="center"></Box>
      </Box>
    </Box>
  );
}
