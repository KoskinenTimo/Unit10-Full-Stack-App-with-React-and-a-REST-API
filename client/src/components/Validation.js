import React from 'react';

export default function Validation(props) {
  if (props.errors.length) {
    const errors = props.errors.map((error, index) => <li key={index}>{error}</li>);
    return (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          {errors}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}