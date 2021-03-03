import React from 'react';
import styled from "@emotion/styled";
import PropTypes from 'prop-types';

function UnstyledAddTodo({ className }) {
  return (
    <div className={className}>
      <input type="text" id="addTodo" placeholder="Add a Todo" />
    </div>
  );
}

UnstyledAddTodo.propTypes = {
  className: PropTypes.string.isRequired,
}

const AddTodo = styled(UnstyledAddTodo)`
  input[type="text"] {
    border: 1px solid #61dafb;
    border-radius: 0.5em;
    padding: 1em;
    margin: 0 0 1em;
    display: block;
    width: 50em;
    color: white;
    background: #3c4048;
  }

  input::placeholder {
    color: #118aab;
  }
`;

export default AddTodo;
