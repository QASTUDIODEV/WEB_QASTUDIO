import React, { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import AuthButton from '../auth/authButton/authButton';
import { InputModule } from '../auth/module/module';

type TStep1 = {
  setPasswordMatch: React.Dispatch<React.SetStateAction<boolean>>;
  passwordMatch: boolean;
  passwordErrorMessage: string;
  setPasswordErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};
export default function FindingPasswordStep2({ setPasswordMatch, passwordMatch, setPasswordErrorMessage, passwordErrorMessage }: TStep1) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const {
    register,
    control,
    formState: { errors, isValid },
  } = useFormContext();

  const watchedPassword = useWatch({
    control,
    name: 'password',
  });

  const watchedRepassword = useWatch({
    control,
    name: 'repassword',
  });

  useEffect(() => {
    if (watchedRepassword === undefined) {
      setPasswordMatch(true);
      setErrorMessage('');
    } else if (watchedPassword === watchedRepassword) {
      setPasswordMatch(true);
      setErrorMessage('');
    } else {
      setPasswordMatch(false);
      setErrorMessage('Passwords must match.');
    }
  }, [watchedPassword, watchedRepassword]);

  useEffect(() => {
    setPasswordErrorMessage('');
  }, [watchedPassword, watchedRepassword]);

  return (
    <>
      <InputModule
        top={false}
        valid={!errors.password?.message && !passwordErrorMessage && watchedPassword !== ''}
        errorMessage={(errors.password?.message as string) || passwordErrorMessage}
        Name={'Password'}
        inputname={'password'}
        span={'New Password'}
        {...register('password')}
      />
      <InputModule
        top={false}
        valid={!errors.repassword?.message && passwordMatch && (watchedRepassword !== '' || watchedRepassword === undefined)}
        errorMessage={(errors.repassword?.message as string) || errorMessage}
        Name={'Password'}
        inputname={'password'}
        span={'Re-enter Password'}
        {...register('repassword')}
      />
      <AuthButton type="submit" disabled={!isValid || !passwordMatch || !!passwordErrorMessage}>
        Go to the login
      </AuthButton>
    </>
  );
}
