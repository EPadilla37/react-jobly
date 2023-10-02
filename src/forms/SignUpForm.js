import React, { useState } from 'react';
import { useNavigate as useHistory } from 'react-router-dom';
import { Card, CardBody, Form, Label, Input, Button } from 'reactstrap';

const SignUpForm = ({ signup }) => {
  const history = useHistory();
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    'SignupForm',
    'signup=',
    typeof signup,
    'formData=',
    formData,
    'formErrors=',
    formErrors
  );

  /** Update form fields */
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    try {
      let result = await signup(formData);
      if (result.success) {
        history.push('/companies');
      } else {
        setFormErrors(result.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="SignUpForm col-md-5 offset-md-4 col-lg-4 offset-lg-4">
      <h1>Sign Up</h1>
      <Card>
        <CardBody>
          <Form className="SignUpForm-form" onSubmit={handleSubmit}>
            <Label htmlFor="username" className="SignUpForm-Label">
              Username
            </Label>
            <Input
              className="SignUpForm-Input"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="password" className="SignUpForm-Label">
              Password
            </Label>
            <Input
              className="SignUpForm-Input"
              id="password"
              name="password"
              type="text"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="firstName" className="SignUpForm-Label">
              First Name
            </Label>
            <Input
              className="SignUpForm-Input"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="lastName" className="SignUpForm-Label">
              Last Name
            </Label>
            <Input
              className="SignUpForm-Input"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="email" className="SignUpForm-Label">
              Email
            </Label>
            <Input
              className="SignUpForm-Input"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            ></Input>
            <span className="NewItemForm-formErrors">
              {formErrors ? <p>{formErrors}</p> : null}
            </span>
            <Button
              type="submit"
              className="btn btn-lg btn-block"
              color="primary"
            >
              Sign Up
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpForm;