import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';
import { Typography } from '@rmwc/typography';
import React, { useEffect, useState } from 'react';
import { IFormDataProps } from '..';
import { post } from '../../../services/admin/guests';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
const CompleteForm: React.FC<IFormDataProps> = ({ navigate, formData, step, setFormData }) => {
  const { party } = formData[`step${step}`];
  const [emailAddress, setEmailAddress] = useState(party?.emailAddress ?? '');
  const [formValid, setFormValid] = useState(true);

  const handleChange = ({ target }) => {
    setFormValid(target.checkValidity());
    setEmailAddress(target.value);
  }
  useEffect(() => {
    if (navigate && formValid) {
      const doFetch = async () => {
        await post<any>('rsvp', {
          rsvpid: party.rsvpid,
          emailAddress,
        });
        trackCustomEvent({
          category: 'Form',
          action: 'Submit',
          label: party.rsvp === '1' ? 'decline' : 'accept',
        });
        setFormData(prev => ({
          ...prev,
          [`step${step}`]: {
            valid: true,
            ...prev[`step${step}`]
          },
          [`step${step + 1}`]: { ...prev[`step${step}`] },
        }));
      }
      doFetch();
    }
  }, [navigate])
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      [`step${step}`]: {
        ...prev[`step${step}`],
        disableWhenInvalid: !formValid
      }
    }));
  }, [formValid]);

  return (
    <>
      <div style={{ textAlign: 'center', maxWidth: '50rem' }}>
        <Typography use='headline6' style={{ paddingBottom: '1rem', display: 'inline-block' }}>
          Thank you! We appreciate you taking the time to RSVP online.  This will help us make sure that our big weekend goes smoothly.
        </Typography>
        <br />
        <Typography use='body1' style={{ paddingBottom: '1rem', display: 'inline-block' }}>
          {party.rsvp !== 1 ? (
            <>
              We look forward to seeing you.  In order to keep things running smoothly, we'd like to ask for an email address,
              so that we can contact you with any potential changes that may occur. If you're not comfortable with that, please keep
              an eye on the website for potential changes.
            </>
          ) : (
            <>
              We are sorry that you're unable to attend.  Please know that you will be missed.  If anything changes, please contact us.
              We will do our very best to accomodate you and your party.
            </>
          )}
        </Typography>
        {party.rsvp !== 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField label='Email Address' type='email' style={{ minWidth: '25rem', maxWidth: '100vw' }} value={emailAddress} onChange={handleChange} />
          </div >
        )}
      </div>
    </>
  );
}

export default CompleteForm;