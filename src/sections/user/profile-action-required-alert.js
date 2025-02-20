import PropTypes from 'prop-types';
import ActionRequiredModal from './profile-action-required-modal';

const ProfileActionRequiredAlert = ({ actionRequiredModalData, setActionRequiredModalData }) => {
  return (
    <ActionRequiredModal
      modalData={actionRequiredModalData}
      setModalData={setActionRequiredModalData}
    />
  );
};

ProfileActionRequiredAlert.propTypes = {
  currentTab: PropTypes.string,
};

export default ProfileActionRequiredAlert;
