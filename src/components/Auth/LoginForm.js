import React, { useCallback } from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../Form/TextInput';
import { login, socialLogin } from '../../store/actions/authActions';
import SocialLogin from '../Auth/SocialLogin';

const LoginForm = ({ handleSubmit, error, submitting }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const handleLogin = useCallback(
    user => {
      return dispatch(login({ firebase }, user));
    },
    [firebase, dispatch]
  );

  const handleSocialLogin = useCallback(
    provider => {
      return dispatch(socialLogin({ firebase, firestore }, provider));
    },
    [firebase, firestore, dispatch]
  );
  return (
    <Form size="large" onSubmit={handleSubmit(handleLogin)} autoComplete="off">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="Password"
        />
        {error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
        <Button loading={submitting} fluid size="large" primary>
          Login
        </Button>
        <Divider horizontal>Or</Divider>
        <SocialLogin socialLogin={handleSocialLogin} />
      </Segment>
    </Form>
  );
};

export default reduxForm({ form: 'loginForm' })(LoginForm);
