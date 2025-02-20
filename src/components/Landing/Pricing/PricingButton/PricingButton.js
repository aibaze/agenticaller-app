import { CustomButton } from './styles';

const PricingButton = ({ children, onClick, disabled }) => {
  return (
    <CustomButton disabled={disabled} onClick={onClick}>
      {children}
    </CustomButton>
  );
};

export default PricingButton;
