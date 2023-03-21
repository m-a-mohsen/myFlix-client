/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';

export function ProfileView({ user }) {
  const birthday = new Date(user.Birthday);
  console.log(typeof birthday);
  return (
    <div>
      <h3>User Details</h3>
      <div>
        <span>
          <strong>User Name: </strong>
        </span>
        <span>{user.Username}</span>
      </div>
      <div>
        <span>
          <strong>Email: </strong>
        </span>
        <span>{user.Email}</span>
      </div>
      <div>
        <span>
          <strong>Birthday: </strong>
        </span>
        <span>
          {birthday.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <br />
        <br />
        <br />
      </div>
      <div>
        <h3>Favorite Movies:</h3>
      </div>
    </div>
  );
}
