'use client';
import { Button, InputField } from '@smart-safety-solutions/components';
import { images } from '@smart-safety-solutions/assets';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { SessionContext } from '@smart-safety-solutions/contexts';
import { useLogInMutation } from '@smart-safety-solutions/apis';
import Image from 'next/image';
import { Form, Formik } from 'formik';

const Index: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { state: sessionState, logOut } = useContext(SessionContext);

  const [logIn] = useLogInMutation();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleLogin = (values: typeof initialValues) => {
    logIn(values);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div />;
  }

  if (sessionState.isLoggedIn) {
    return (
      <div className="flex min-w-full min-h-full justify-center pt-48">
        <Button onClick={logOut}>Log out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-w-full min-h-full items-center pt-48 gap-6">
      <Image
        width={260}
        src={images.SmartSafetySolutionsLogo}
        alt="Smart Safety Solutions Logo"
        priority
      />

      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col gap-4 w-72">
          <InputField name="username" placeholder="email" />
          <InputField name="password" type="password" placeholder="password" />

          <Button type="submit">Log in</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Index;
