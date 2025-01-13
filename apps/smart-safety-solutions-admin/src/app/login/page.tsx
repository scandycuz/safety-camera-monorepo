'use client';
import { Button, InputField } from '@smart-safety-solutions/components';
import { images } from '@smart-safety-solutions/assets';
import { FunctionComponent, useEffect } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useLogInMutation } from '@smart-safety-solutions/apis';
import Image from 'next/image';
import { Form, Formik } from 'formik';
import { parseRtkQueryEndpointErrorMessage } from '@smart-safety-solutions/utils';
import { useClearSession } from '../../hooks/use-clear-session';

const Login: FunctionComponent = () => {
  const router = useRouter();

  useClearSession();

  const [
    logIn,
    { isLoading: isLoginLoading, isSuccess: isLoginSuccess, error },
  ] = useLogInMutation();

  const errorMessage = parseRtkQueryEndpointErrorMessage(error);

  const initialFormValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  /**
   * Authenticates the user.
   *
   * @param values username and password
   */
  const handleLogin = (values: typeof initialFormValues) => {
    logIn(values);
  };

  /**
   * Navigates to the dashboard after login is successful.
   */
  useEffect(() => {
    if (isLoginSuccess) {
      router.push('/dashboard');
    }
  }, [isLoginSuccess, router]);

  return (
    <div className="flex flex-col min-w-full min-h-full items-center pt-48 gap-6">
      <Image
        width={260}
        src={images.SmartSafetySolutionsLogo}
        alt="Smart Safety Solutions Logo"
        priority
      />

      <Formik
        initialValues={initialFormValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col gap-4 w-72 justify-center">
          <InputField name="username" placeholder="email" />
          <InputField name="password" type="password" placeholder="password" />

          <Button type="submit" isDisabled={isLoginLoading}>
            Log in
          </Button>

          {!!errorMessage && (
            <div className="flex flex-1 justify-center">
              <span className="text-sm text-red-500">{errorMessage}</span>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
