import { ListTick } from '../../ListTick/ListTick';
import {
  Container,
  Section,
  TickContainer,
  WhiteBackgroundRemoveDash,
  InfoTextContainer,
  Title,
  Description,
} from './styles';

const VerticalSteps = ({ productItems, itemSelected }) => {
  return (
    <Container>
      {productItems[itemSelected]?.verticalInfo.map(({ title, description }, idx) => (
        <Section key={`vertical_step_${idx}`}>
          <TickContainer>
            <ListTick size="medium" />
          </TickContainer>
          {/* On last item, remove dashed line */}
          {idx === productItems[itemSelected]?.verticalInfo.length - 1 && (
            <WhiteBackgroundRemoveDash />
          )}
          <InfoTextContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </InfoTextContainer>
        </Section>
      ))}
    </Container>
  );
};

export default VerticalSteps;
