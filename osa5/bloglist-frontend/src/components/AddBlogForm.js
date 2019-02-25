import React from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';
import useField from '../hooks';

const AddBlogForm = ({ handleSubmit }) => {
  const titleField = useField('text');
  const authorField = useField('text');
  const urlField = useField('text');

  const wrapperFunction = (event) => {
    handleSubmit(event);
    titleField.reset();
    authorField.reset();
    urlField.reset();
  };

  return ( 
    <div>
      <h2>Create new</h2>
      <form onSubmit={wrapperFunction}>
        <InputField header="Title" {...titleField} />
        <InputField header="Author" {...authorField} />
        <InputField header="URL" {...urlField} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

AddBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default AddBlogForm;

