import { Grid, Container, Button } from '@mui/material';
import AppWelcome from './app-welcome';
import { SeoIllustration } from 'src/assets/illustrations';
import AppFeatured from './app-featured';
import { _appFeatured } from 'src/_mock';
import dayjs from 'dayjs';

export default function Header({ currentCoach, settings, newClientsMonth }) {
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} disableGutters>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <AppWelcome
            title={`Hi, ${currentCoach?.firstName} 👋 \n ${
              dayjs().hour() > 12 ? 'Good Afternoon' : 'Good Morning'
            }!`}
            description="Phrase of the day:"
            img={<SeoIllustration />}
            action={
              <>
                {newClientsMonth > 0 && (
                  <Button variant="contained" color="primary">
                    {`🏆 Congratulations you've ${newClientsMonth} new clients`}
                  </Button>
                )}
              </>
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppFeatured
            list={[
              {
                id: 1,
                title: 'Build your best-seller service',
                description: 'Design and launch services that clients can’t resist',
                coverUrl:
                  'https://i.ibb.co/tCjN3TD/freepik-candid-image-photography-natural-textures-highly-r-78673.jpg',
                link: 'https://www.allwyse.io/product?selected=Services',
              },
              {
                id: 1,
                title: 'Turn data into client success stories',
                description: 'Go beyond numbers—unlock the hidden potential in your data',
                coverUrl:
                  'https://i.ibb.co/vkR7qPS/Minimalistic-business-desk-still-life-concept.png',
                link: 'https://www.allwyse.io/product?selected=Analytics',
              },
              {
                id: 1,
                title: 'Be on time, every time with Calendar-sync',
                description: 'Stay effortlessly organized with Allwyse’s seamless Calendar Sync. ',
                coverUrl: 'https://i.ibb.co/wzT4VRV/Professional-freelancer-working-on-laptop.png',
                link: 'https://www.allwyse.io/product?selected=Agenda',
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
