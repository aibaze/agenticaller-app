import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import Logo from 'src/components/logo';
import Image from 'src/components/image';
import { useRouter } from 'src/routes/hooks';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from 'src/auth/hooks';
import CelebrationIcon from '@mui/icons-material/Celebration';

const WelcomeBanner = ({ handleClose, fromPage }) => {
  const router = useRouter();
  const isDesktop = useResponsive('up', 'sm');
  const [hide, setHide] = useState(!isDesktop);
  const { currentCoach } = useAuthContext();
  const FINISHED_SECTIONS = [];
  let SECTIONS = [
    {
      id: 'profile',
      bgColor: '#e8f5e9',
      image: 'https://i.ibb.co/dknQRx2/profile.png',
      title: 'Complete profile',
      text: 'Help clients get to know you by filling out your profile with key details, expertise, and what makes you unique.',
      cta: 'My profile',
    },
    {
      id: 'services',
      bgColor: '#f3e5f5',
      image: 'https://i.ibb.co/dLRr8vJ/service.png',
      title: 'Build a service',
      text: "Create your first service offering, whether it's a coaching session, package, or program, and showcase your value",
      cta: 'My services',
      redirection: '/profile/?tab=services',
    },
    {
      id: 'clients',
      bgColor: '#e3f2fd',
      image: 'https://i.ibb.co/CtvZJmw/client.png',
      title: 'Create a client',
      text: 'Invite your existing clients or add new ones to start managing your coaching relationships seamlessly',
      cta: 'My Clients',
      redirection: '/clients',
    },
  ];
  const handleCTA = (section) => {
    if (section.redirection) {
      router.push(section.redirection);
    }
    if (handleClose) {
      handleClose();
    }
  };

  if (currentCoach.services?.length) {
    FINISHED_SECTIONS.push('services');
  }

  if (currentCoach.students?.length) {
    FINISHED_SECTIONS.push('clients');
  }

  if (currentCoach.profileInfo?.socialLinks?.length) {
    FINISHED_SECTIONS.push('profile');
  }

  if (
    hide ||
    (currentCoach.services?.length &&
      currentCoach.students?.length &&
      currentCoach.profileInfo?.socialLinks?.length)
  ) {
    return null;
  }
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        p: 3,
        pb: fromPage !== 'HOME' ? 1 : 3,
        borderRadius: '8px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: fromPage !== 'HOME' ? 3 : 0,
        mb: 1,
        position: 'relative',
      }}
    >
      {fromPage === 'HOME' && (
        <CloseIcon
          onClick={() => {
            setHide(true);
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 10,
            cursor: 'pointer',
            zIndex: 1,
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'background.paper',
            },
          }}
        />
      )}
      {/* Profile Section */}

      {SECTIONS.map((section) => (
        <Box
          sx={{
            p: 3,
            pt: 0,
            opacity: FINISHED_SECTIONS.includes(section.id) ? 0.5 : 1,
            borderRadius: 2,
          }}
        >
          <Image
            sx={
              fromPage !== 'HOME'
                ? {
                    borderRadius: '12px',
                    height: '250px',
                  }
                : {
                    borderRadius: '12px',
                  }
            }
            src={section.image}
          />
          <Typography variant="h5" sx={{ mb: 2, mt: 2, fontSize: '22px' }}>
            {section.title}
          </Typography>
          {fromPage !== 'HOME' && (
            <Typography sx={{ mb: 5, height: '60px' }}>{section.text}</Typography>
          )}
          <Button
            onClick={() => {
              handleCTA(section);
            }}
            variant="contained"
            color="primary"
          >
            {!FINISHED_SECTIONS.includes(section.id) && section.cta}
            {FINISHED_SECTIONS.includes(section.id) && (
              <>
                Completed
                <CelebrationIcon sx={{ ml: 1 }} />
              </>
            )}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

const WelcomeModal = ({ open, handleClose, isPublic }) => {
  const isDesktop = useResponsive('up', 'sm');
  const smDown = useResponsive('down', 'sm');

  if (localStorage.getItem('welcomeModalShowed') || isPublic || !isDesktop) {
    return null;
  }

  const onClose = () => {
    handleClose();
    localStorage.setItem('welcomeModalShowed', 'true');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: smDown ? '90%' : '1200px',
          bgcolor: 'background.paper',
          height: 'fit-content',
          overflow: 'auto',
          boxShadow: 24,
          p: 4,
          pt: '10px',
          pb: '10px',
          borderRadius: '20px',
          gap: 2,
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Logo />
            <Typography variant="h4" component="h1">
              👋 Welcome to Allwyse!
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>X</IconButton>
        </Box>

        {/* Content Grid */}
        <WelcomeBanner handleClose={handleClose} />

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: '8px',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            If your need help please send us your inquire:
            <Button variant="text" sx={{ ml: 1 }}>
              info.allwyse@gmail.com
            </Button>
            (Contact)
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button onClick={onClose} variant="outlined" color="primary">
              Skip
            </Button>
            <Button onClick={onClose} variant="contained" color="primary">
              Start
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export { WelcomeModal, WelcomeBanner };
