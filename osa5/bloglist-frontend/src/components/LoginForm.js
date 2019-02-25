import React from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';
import useField from '../hooks';

const LoginForm = ({
  handleSubmit,
}) => {
  const usernameField = useField('text');
  const passwordField = useField('text');

  return (
    <div>
      <h2>Kirjaudu</h2>
      <form onSubmit={handleSubmit}>
        <InputField header="Username" {...usernameField} />
        <InputField header="Password" {...passwordField} />
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
