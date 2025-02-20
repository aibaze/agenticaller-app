import { useTheme } from '@emotion/react';
import { Typography, Button, Box, Modal } from '@mui/material';
import CharIllustration from 'src/assets/illustrations/char-ilustration';
import MessageSent from 'src/assets/illustrations/message-sent';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import Link from 'next/link';
import {
    StyledModalBox,
    StyledLinkTypography,
    StyledModalContentBox,
    StyledIllustrationBox,
    StyledText,
    StyledLinkTypography2,
} from './styles';

export function RequestModalConfirm({ open, onClose, type, to, ...other }) {
    const theme = useTheme();
    const router = useRouter();
    const messageTo = to === 'client' ? 'your client' : 'your coach';
    
    const handleClose = () => {
        onClose(false);
    };

    const contentSessionConfirm = (
        <>
            <StyledIllustrationBox>
                <CharIllustration />
            </StyledIllustrationBox>

            <StyledText variant="h6" >
                Great! Your session has been confirmed.
            </StyledText>

            <Box sx={{ mb: 4 }}>
                <StyledLinkTypography2 variant="body2" >
                    ✅ Creating this Session in{' '}
                    <Link href={paths.profile.calendar} passHref>
                        <StyledLinkTypography
                            component="span"
                            onClick={() => router.push(paths.profile.calendar)}
                        >
                            Calendar
                        </StyledLinkTypography>
                    </Link>
                </StyledLinkTypography2>
                <StyledLinkTypography2 variant="body2">
                    ✅ Adding your new client to{' '}
                    <Link href={paths.profile.clients} passHref>
                        <StyledLinkTypography
                            component="span"
                            onClick={() => router.push(paths.profile.clients)}
                        >
                            My Clients
                        </StyledLinkTypography>
                    </Link>
                </StyledLinkTypography2>
                <StyledLinkTypography2 variant="body2" >
                    ✅ Sending the Session-link to your client
                </StyledLinkTypography2>
            </Box>
        </>
    );

    const contentMessageConfirm = (
        <>
            <StyledIllustrationBox>
                <MessageSent />
            </StyledIllustrationBox>
            <StyledText variant="h6">
                Perfect! Message Sent.
            </StyledText>
            <StyledLinkTypography2 variant="body2" >
                ✅ Sending your message by email to {messageTo}
            </StyledLinkTypography2>
        </>
    );

    return (
        <Modal
            open={open}
            onClose={handleClose}
            {...other}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <StyledModalBox>
                {type === 'session' ? contentSessionConfirm : contentMessageConfirm}

                <StyledModalContentBox>
                    <Button variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                </StyledModalContentBox>
            </StyledModalBox>
        </Modal>
    );
}
