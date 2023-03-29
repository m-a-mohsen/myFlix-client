/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export function ProfileView({ user }) {
  const birthday = new Date(user.Birthday);
  console.log(typeof birthday);
  return (
    <div>
      <h3 className="my-3">User Details</h3>
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
        <Link to="/updateuser">
          <Button className="my-2" variant="outline-warning">
            Update User
          </Button>
        </Link>
        <br />
      </div>
      <div className="my-3">
        <h3>Favorite Movies:</h3>
      </div>
    </div>
  );
}
