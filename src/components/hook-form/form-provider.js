import PropTypes from 'prop-types';
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

export default function FormProvider({ children, onSubmit, disableSubmitOnEnter, methods }) {
  return (
    <Form {...methods}>
      <form
        onKeyDown={(e) => {
          if (e.key === 'Enter' && disableSubmitOnEnter) {
            e.preventDefault();
          }
        }}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </Form>
  );
}

FormProvider.propTypes = {
  children: PropTypes.node,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
};
