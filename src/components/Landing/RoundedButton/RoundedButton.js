import Link from 'next/link';
import PropTypes from 'prop-types';
import { ContentContainer, Text, Button, CircularProgressCustom } from './styles';

const RoundedButton = ({
  size = 'medium',
  href,
  onClick,
  children,
  fill = 'default',
  disabled,
  type,
  minWidth,
  isBold = false,
  isLoading = false,
}) => {
  const Content = ({ children }) => (
    <ContentContainer
      isLoading={isLoading}
      disabled={disabled}
      minWidth={minWidth}
      fill={fill}
      size={size}
    >
      <Text size={size} weight={isBold ? 600 : 500}>
        {children}
      </Text>
    </ContentContainer>
  );

  if (href) {
    return (
      <Link onClick={onClick} href={href} style={{ textDecoration: 'none' }}>
        <Content>{children}</Content>
      </Link>
    );
  }

  return (
    <Button onClick={onClick} type={type} disabled={isLoading || disabled}>
      <Content>{isLoading ? <CircularProgressCustom size={20} fill={fill} /> : children}</Content>
    </Button>
  );
};

export default RoundedButton;

RoundedButton.propTypes = {
  children: PropTypes.string.isRequired,
  fill: PropTypes.oneOf(['black', 'green', 'violet']),
  size: PropTypes.oneOf(['small', 'medium']),
  isBold: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  minWidth: PropTypes.number,
  type: PropTypes.oneOf(['button', 'submit']),
};
