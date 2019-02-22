import React from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePassword,
  username,
  password,
}) => (
  <div>
    <h2>Kirjaudu</h2>
    <form onSubmit={handleSubmit}>
      <InputField header="Käyttäjätunnus" value={username} setFunction={handleUsernameChange} />
      <InputField header="Password" value={password} setFunction={handlePassword} />
      <button type="submit">Kirjaudu</button>
    </form>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  username: PropTypes.node.isRequired,
  password: PropTypes.node.isRequired,
};

export default LoginForm;
