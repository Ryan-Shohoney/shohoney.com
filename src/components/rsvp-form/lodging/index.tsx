import { Radio } from '@rmwc/radio';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';
import React, { useEffect, useState } from 'react';
import { IFormDataProps } from "..";
import { post } from '../../../services/admin/guests';

const lodgingValues = [
  {
    value: 'n/a',
    text: 'My party will not be staying at a hotel',
  },
  {
    value: 'avid',
    text: 'The Avid Hotel - Monona, WI',
  },
  {
    value: 'americinn',
    text: 'The AmericInn - Monona, WI',
  },
  {
    value: 'hilton',
    text: 'The Hilton - Madison, WI',
  },
  {
    value: 'other',
    text: 'Other'
  }
]
const durationValues = [
  {
    value: 'saturday',
    text: 'Saturday (1 night)',
  },
  {
    value: 'friday,saturday',
    text: 'Friday and Saturday (2 nights)',
  },
  {
    value: 'other',
    text: 'Other',
  }
]

const LodgingForm: React.FC<IFormDataProps> = ({ navigate, setFormData, step, formData }) => {
  const { party } = formData[`step${step}`];

  const [lodgingValue, setLodgingValue] = useState(party.lodging?.location ?? null);
  const [locationDetail, setLocationDetail] = useState(party.lodging?.locationDetail ?? null);
  const [durationDetail, setDurationDetail] = useState(party.lodging?.durationDetail ?? null);
  const [durationValue, setDurationValue] = useState(party.lodging?.duration ?? null);
  const [isValid, setIsValid] = useState(false);
  const stateSetters = {
    location: setLodgingValue,
    duration: setDurationValue,
    locationDetail: setLocationDetail,
    durationDetail: setDurationDetail,
  }
  const handleChange = ({ currentTarget, target }) => {
    const t = currentTarget ?? target;

    stateSetters[t.name](t.value);
  }
  useEffect(() => {
    setIsValid((lodgingValue === lodgingValues[0].value) || (lodgingValue && durationValue));
  }, [lodgingValue, durationValue]);
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      [`step${step}`]: {
        ...prev[`step${step}`],
        disableWhenInvalid: !isValid
      }
    }))
  }, [isValid]);
  useEffect(() => {
    if (navigate && isValid) {
      const lodging = {
        location: lodgingValue,
        duration: durationValue,
        locationDetail,
        durationDetail,
      };
      const dofetch = async () => {
        const result = await post<any>('rsvp', {
          rsvpid: party.rsvpid,
          lodging,
        });
        setFormData(prev => ({
          ...prev,
          [`step${step}`]: {
            valid: true,
            ...result,
          },
          [`step${step + 1}`]: result,
        }));
      }
      dofetch();
    }
  }, [navigate])

  return (
    <>
      <div style={{ textAlign: 'center', maxWidth: '30rem' }}>
        <Typography use='headline6'>
          Please let us know whether or not you'll be staying at a hotel in the area. This will help us
          ensure that our transportation schedule makes sense.
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
          <div style={{ maxWidth: '20rem' }}>
            {lodgingValues.map(l => (
              <Radio key={l.value} name={'location'} value={l.value} style={{ width: '100%' }} onChange={handleChange} checked={lodgingValue === l.value}>
                {l.text}
              </Radio>
            ))}
            {lodgingValue === lodgingValues[lodgingValues.length - 1].value && (
              <TextField name='locationDetail' label={'Provide more details, if you\'d like...'} textarea fullwidth outlined rows={2} maxLength={500} onChange={handleChange} />
            )}
          </div>
        </div>
        {lodgingValue && lodgingValue !== lodgingValues[0].value && (
          <>
            <Typography use='headline6'>That's great to hear! How long will you be staying?</Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ maxWidth: '20rem' }}>
                {durationValues.map(l => (
                  <Radio key={l.value} name={'duration'} value={l.value} style={{ width: '100%' }} onChange={handleChange} checked={durationValue === l.value}>
                    {l.text}
                  </Radio>
                ))}
                {durationValue === durationValues[durationValues.length - 1].value && (
                  <TextField name='durationDetail' label={'Provide more details, if you\'d like...'} textarea fullwidth outlined rows={2} maxLength={500} onChange={handleChange} value={durationDetail ?? ''} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default LodgingForm;