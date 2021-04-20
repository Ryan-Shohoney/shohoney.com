import { Radio } from '@rmwc/radio';
import '@rmwc/radio/styles';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import React, { useEffect, useState } from 'react';
import { IFormDataProps } from "..";
import { post } from '../../../services/admin/guests';

const attendanceValues = [
  {
    value: 'yes',
    text: 'We will be attending and eating',
  },
  {
    value: 'dropby',
    text: 'We will probably drop by',
  },
  {
    value: 'no',
    text: 'We will not be attending',
  },
]

const DayAfterForm: React.FC<IFormDataProps> = ({ navigate, setFormData, formData, step }) => {
  const { party } = formData[`step${step}`];
  const [attendanceValue, setAttendanceValue] = useState(party.dayAfterParty ?? null);
  const handleChange = ({ target }) => {
    setAttendanceValue(target.value);
  }
  useEffect(() => {
    if (!party.ap || party.rsvp === 1) {
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
    setFormData(prev => ({
      ...prev,
      [`step${step}`]: {
        ...prev[`step${step}`],
        disableWhenInvalid: attendanceValue === null
      }
    }));
  }, [attendanceValue]);

  useEffect(() => {
    if (navigate && attendanceValue !== null) {
      (async () => {
        const result = await post<any>('/rsvp', {
          rsvpid: party.rsvpid,
          dayAfterParty: attendanceValue,
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
  return (
    <>
      <div style={{ textAlign: 'center', maxWidth: '45rem' }}>
        <Typography use='headline6'>
          We are hosting a day after party and open house for our wedding party, and our closest family members.
          This will be hosted at our <a href='https://goo.gl/maps/2dMcxBJP4j5B6yvX7' target='_blank'>house</a> house,
          in Monona. We will be serving lunch, as well as brunch cocktails.  Please feel free to come for as much,
          or as little, as you'd like
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
          <div style={{ maxWidth: '20rem' }}>
            {attendanceValues.map(l => (
              <Radio key={l.value} name={'location'} value={l.value} style={{ width: '100%' }} onChange={handleChange} checked={attendanceValue === l.value}>
                {l.text}
              </Radio>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DayAfterForm;