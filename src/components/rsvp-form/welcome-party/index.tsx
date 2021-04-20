import { Radio } from '@rmwc/radio';
import '@rmwc/radio/styles';
import { Typography } from '@rmwc/typography';
import React, { useEffect, useState } from 'react';
import { Select } from '@rmwc/select';
import '@rmwc/select/styles';
import { IFormDataProps } from '..';
import { post } from '../../../services/admin/guests';

const attendanceValues = [
  {
    value: 'no',
    text: 'We will not be attending',
  },
  {
    value: 'yes',
    text: 'We will be attending and eating',
  },
  {
    value: 'sortof',
    text: 'We will be attending, but not eating'
  }
]

const WelcomePartyForm: React.FC<IFormDataProps> = ({ navigate, formData, step, setFormData }) => {
  const { party } = formData[`step${step}`];
  const [attendanceValue, setAttendanceValue] = useState(party.welcomeParty?.attending ?? null);
  const [numAttending, setNumAttending] = useState(party.welcomeParty?.numGuests ?? party.guests.length);
  const handleChange = ({ target }) => {
    setAttendanceValue(target.value);
  }

  useEffect(() => {
    if (party.rsvp === 1) {
      setFormData(prev => ({
        ...prev,
        [`step${step}`]: {
          ...formData[`step${step}`],
          valid: true,
        },
        [`step${step + 1}`]: { party }
      }));
    }
  }, [formData, setFormData]);

  useEffect(() => {
    if (navigate && attendanceValue !== null) {
      (async () => {
        const result = await post<any>('/rsvp', {
          rsvpid: party.rsvpid,
          welcomeParty: {
            attending: attendanceValue,
            numGuests: attendanceValue !== attendanceValues[0].value ? numAttending : 0
          }
        });
        setFormData(prev => ({
          ...prev,
          [`step${step}`]: {
            valid: true,
            ...result,
          },
          [`step${step + 1}`]: result,
        }));
      })();
    }
  }, [navigate])

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      [`step${step}`]: {
        ...prev[`step${step}`],
        disableWhenInvalid: attendanceValue === null
      }
    }));
  }, [attendanceValue]);
  return (
    <>
      <div style={{ textAlign: 'center', maxWidth: '40rem' }}>
        <Typography use='headline6'>
          We will be hosting a welcome party on Friday July 16, 2021 from 5:30PM to 8:00PM at{' '}
          <a href='https://goo.gl/maps/3zHzJ9yo8aGdersQ6' target='_blank'>Lake Edge Park</a>, in  Madison.
        </Typography>
        <br />
        <Typography use='body1' style={{ paddingBottom: '1rem', display: 'inline-block' }}>
          We will be serving brats, burgers, and BBQ grilled chicken. We will also be serving beer and wine.
          All of our guests are welcome to attend. Please let us know below if you plan on attending.
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
          <div style={{ maxWidth: '20rem' }}>
            {attendanceValues.map(l => (
              <Radio key={l.value} name={'location'} value={l.value} style={{ width: '100%' }} onChange={handleChange} checked={attendanceValue === l.value}>
                {l.text}
              </Radio>
            ))}
            {attendanceValue && attendanceValue !== attendanceValues[0].value && (
              <Select
                label='How many guests?'
                enhanced
                options={party.guests.map((_, index) => index + 1)}
                onChange={(evt) => setNumAttending(parseInt((evt as any).detail.value, 10))}
                defaultValue={String(numAttending)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePartyForm;