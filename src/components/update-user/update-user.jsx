/* eslint-disable import/prefer-default-export */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function UpdateUser({ user, token, UpdateUser, onLoggedOut }) {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://moviesapi2.onrender.com/users/${user.Username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        mode: 'no-cors',
      },
    })
      .then((response) => response.json())
      .then((updatedUserRes) => {
        if (updatedUserRes) {
          console.log(updatedUserRes);
          console.log(typeof updatedUserRes);
          localStorage.setItem('user', JSON.stringify(updatedUserRes));
          alert(`Update successful${updatedUserRes}`);
          window.location.reload();
          UpdateUser();
        } else {
          alert('Update failed');
        }
      });
  };

  const handleDeleteUser = () => {
    if (window.confirm('Do you really want to delete your account?')) {
      fetch(`https://moviesapi2.onrender.com/users/${user.Username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          mode: 'no-cors',
        },
      })
        .then((response) => {
          if (response.ok) {
            alert(`${user.Username} has gone fishing !`);
            window.location.reload();
            onLoggedOut();
          } else {
            alert(`Couldn't delete ${user.Username}, Try again`);
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          placeholder="Enter username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDate">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <br />
      <br />
      <>
        <Button variant="primary" type="submit">
          Update
        </Button>
        <Button variant="outline-danger" onClick={handleDeleteUser}>
          Delete user
        </Button>
      </>
    </Form>
  );
}
