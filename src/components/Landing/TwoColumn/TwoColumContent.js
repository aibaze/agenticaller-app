import Image from 'next/image';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TwoColumn from 'src/components/Landing/TwoColumn/TwoColumn/TwoColumn';
import MultiTextLayout from './MultiTextLayout/MultiTextLayout';
import { pay, data, chat, never } from 'src/sections/home/constants';
import RoundedButton from 'src/components/Landing/RoundedButton/RoundedButton';
import { paths } from 'src/routes/paths';

const TwoColumnContent = () => {
  const theme = useTheme();
  const maxWidthImage = 850;

  const Button = (
    <RoundedButton onClick={() => {}} fill="black" href={paths.auth.jwt.register} minWidth={250}>
      Book a Demo
    </RoundedButton>
  );

  return (
    <>
      {/* CALENDAR */}
      <TwoColumn id="calendar" backgroundColor={theme.palette.landing.mintIce} button={Button}>
        <TwoColumn.Text>
          <MultiTextLayout
            label="CALENDAR"
            title="Focus on your clients & Never miss a meeting."
            subtitle=" Stay organized with our integrated calendar system. Manage your agenda effortlessly and never miss a meeting. Our platform unifies everything in one place, including seamless Google Calendar integration, so you can focus on coaching and inspiring your clients."
          />
        </TwoColumn.Text>
        <TwoColumn.Image>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: 4321 / 3239,
              maxWidth: maxWidthImage,
              position: 'relative',
            }}
          >
            <Image
              sizes="100%"
              src={never}
              alt="calendar illustration"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </TwoColumn.Image>
      </TwoColumn>
      {/* STRUCTURE */}
      <TwoColumn id="structure" backgroundColor={theme.palette.landing.forestGreen} button={Button}>
        <TwoColumn.Image>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: 3436 / 3564,
              maxWidth: maxWidthImage,
              position: 'relative',
            }}
          >
            <Image
              sizes="100%"
              src={data}
              alt="calendar illustration"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </TwoColumn.Image>
        <TwoColumn.Text>
          <MultiTextLayout
            label="STRUCTURE"
            title="Total flexibility to organize your Clients-Data."
            subtitle="Easily manage all your clients' data in one place. Our platform lets you organize, update, and access client information anytime, anywhere. With simple tools and seamless integration, you can keep everything at your fingertips. Stay connected, informed, and focused on your clients with our flexible and easy-to-use solution."
          />
        </TwoColumn.Text>
      </TwoColumn>
      {/* INVOICE */}
      <TwoColumn id="invoice" backgroundColor={theme.palette.landing.skyBlue} button={Button}>
        <TwoColumn.Text>
          <MultiTextLayout
            label="INVOICE"
            title="Manage your Accountability in one place."
            subtitle="Simplify your payments with our easy invoicing system. Create, send, and track invoices in one place. Stay organized with timely payments and smooth transactions. Don’t waste session time on payments; focus on your clients. Let us handle the financial details so you can concentrate on coaching."
          />
        </TwoColumn.Text>
        <TwoColumn.Image>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: 3422 / 3406,
              maxWidth: maxWidthImage,
              marginBottom: { xs: 0, md: -10 },
              position: 'relative',
            }}
          >
            <Image
              sizes="100%"
              src={pay}
              alt="payments illustration"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </TwoColumn.Image>
      </TwoColumn>
      {/* CHAT */}
      <TwoColumn id="chat" backgroundColor={theme.palette.landing.lavenderMist} button={Button}>
        <TwoColumn.Image>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: 3440 / 3043,
              maxWidth: maxWidthImage,
              position: 'relative',
            }}
          >
            <Image
              sizes="100%"
              src={chat}
              alt="chat illustration"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </TwoColumn.Image>
        <TwoColumn.Text>
          <MultiTextLayout
            label="MESSAGES"
            title="Communicate with your clients."
            subtitle="Current and future clients, all in one place. Send messages, share updates, and handle requests quickly and efficiently. Our platform helps you stay connected and build strong relationships, ensuring you're always available to support and guide your clients. Focus on the conversation while we handle the details."
          />
        </TwoColumn.Text>
      </TwoColumn>
    </>
  );
};

export default TwoColumnContent;
