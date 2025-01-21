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
    formState: { touchedFields, errors, isValid },
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
    if (watchedPassword === watchedRepassword) {
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
        touched={touchedFields.password}
        valid={touchedFields.password && !errors.password?.message && !passwordErrorMessage}
        errorMessage={(errors.password?.message as string) || passwordErrorMessage}
        Name={'Password'}
        inputname={'password'}
        span={'New Password'}
        {...register('password')}
      />
      <InputModule
        top={false}
        touched={touchedFields.repassword}
        valid={touchedFields.repassword && !errors.repassword?.message && passwordMatch}
        errorMessage={(errors.repassword?.message as string) || errorMessage}
        Name={'Password'}
        inputname={'password'}
        span={'Re-enter Password'}
        {...register('repassword')}
      />
      <AuthButton type="submit" disabled={!isValid || !passwordMatch || !!passwordErrorMessage || !touchedFields.password || !touchedFields.repassword}>
        Go to the login
      </AuthButton>
    </>
  );
}
