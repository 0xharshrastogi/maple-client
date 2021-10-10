import { faAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Navbar from '../../components/Navbar/Navbar';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

/**
 * Component for User Signup
 * @returns {JSX.Element} Component JSX
 */

const UserSignup = () => {
  const [isSigned, setIsSigned] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { GoogleAuth, error: gAuthError } = useGoogleAuth(
    process.env?.REACT_APP_GAPI_CLIENTID,
    process.env?.REACT_APP_CLIENT_SECRET
  );

  useEffect(() => {
    try {
      if (gAuthError) throw gAuthError;
      if (!GoogleAuth) return;

      setIsSigned(GoogleAuth.isSignedIn.get());
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, [GoogleAuth, gAuthError]);

  return (
    <>
      <Navbar logo />

      <section className="mx-8 mt-10">
        <div>
          <h1 className="font-bold text-5xl text-red-600">Get Started</h1>
          <span className="mt-2 inline-block text-gray-400 font-medium">
            Already A Member{' '}
            <Link className="text-red-600 underline" to="/login">
              Log In
            </Link>
          </span>
        </div>

        {/* login with google */}
        <div className="mt-20">
          {isLoading && 'Loading'}

          {!isLoading && !isSigned ? (
            <Button full>
              <FontAwesomeIcon icon={faAmericanSignLanguageInterpreting} /> Login With
              Google
            </Button>
          ) : (
            'Already Signed In'
          )}
        </div>
      </section>
    </>
  );
};

export default UserSignup;
