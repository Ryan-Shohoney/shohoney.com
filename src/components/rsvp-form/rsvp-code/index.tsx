import React, { useEffect, useState } from 'react';
import '@rmwc/button/styles';
import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { get, } from '../../../services/admin/guests';
import { IFormDataProps } from '..';

const nanoidRegex = '[23456789abcdefghjkmnpqrstuvwrxyz]{5}'
const RSVPCode: React.FC<IFormDataProps> = ({ navigate, setFormData, step }) => {
  const [rsvpid, setRsvpId] = useState('');

  useEffect(() => {
    if (navigate) {
      const validId = new RegExp(nanoidRegex).test(rsvpid);
      const doFetch = async () => {
        const { party, error } = await get<any>(`rsvp?rsvpid=${rsvpid}`);
        if (party && party.rsvp !== 1) {
          setFormData(prev => ({
            ...prev,
            [`step${step}`]: {
              valid: true,
            },
            [`step${step + 1}`]: { party },
          }));
        } else if (!error) {
          setFormData(prev => ({
            ...prev,
            [`step${step}`]: {
              valid: false,
              displayMessage: 'You previously responded that you were not attending.  Please get a hold of us, and we\'ll see what we can do.'
            },
          }))
        } else {
          setFormData(prev => ({
            ...prev,
            [`step${step}`]: {
              valid: false,
              displayMessage: 'Hmmm... That RSVP code didn\'t match anyone.'
            },
          }))
        }
      }

      if (validId) {
        doFetch();
      }
    }
  }, [navigate]);

  const handleChange = ({ target }) => setRsvpId(target.value);

  return (
    <>
      <Typography use='headline6' style={{ paddingBottom: '1rem', textAlign: 'center', maxWidth: '45rem', display: 'inline-block' }}>
        Please enter your RSVP code.  It should be on the bottom right corner of your RSVP card, in your invite.  It's 5 characters long.
      </Typography>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <TextField required label='RSVP Code' value={rsvpid} onChange={handleChange} maxLength={5} pattern={nanoidRegex} />
      </div>
    </>
  )
};

export default RSVPCode;