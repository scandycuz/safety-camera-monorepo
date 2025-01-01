'use client';
import { Button, InputField } from '@smart-safety-solutions/components';
import { images } from '@smart-safety-solutions/assets';
import { FunctionComponent } from 'react';
import * as Yup from 'yup';
import Image from 'next/image';
import { Form, Formik } from 'formik';

const Index: FunctionComponent = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleLogin = (values: typeof initialValues) => {
    fetch('http://24.144.82.31:8085/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(values),
    });
  };

  return (
    <div className="flex flex-col min-w-full min-h-full items-center pt-48 gap-6">
      <Image
        width={260}
        src={images.SmartSafetySolutionsLogo}
        alt="Smart Safety Solutions Logo"
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
