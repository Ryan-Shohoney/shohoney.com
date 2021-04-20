import React, { useEffect, useState } from 'react';
import { Radio } from '@rmwc/radio';
import '@rmwc/radio/styles';
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from '@rmwc/dialog';
import '@rmwc/dialog/styles';
import { Typography } from '@rmwc/typography';
import { post } from '../../../services/admin/guests';

import { IFormDataProps } from '..';

const AttendingConfirmation: React.FC<IFormDataProps> = ({ navigate, setFormData, step, formData }) => {
  const { party } = formData[`step${step}`];
  const [radioValue, setRadioValue] = useState(party.rsvp !== 2 ? party.rsvp.toString() : null);
  const [formValue, setFormValue] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleChange = ({ currentTarget }) => {
    setRadioValue(currentTarget.value);
  };
  useEffect(() => {
    const doFetch = async () => {
      const result = await post<any>('/rsvp', {
        ...party,
        rsvp: formValue,
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
    if (navigate && formValue !== null) {
      doFetch();
    }
  }, [formValue, navigate])
  useEffect(() => {
    if (navigate) {
      if (radioValue !== null) {
        if (radioValue === '1' && formValue === null) {
          setConfirmDialog(true);
        } else {
          setFormValue(parseInt(radioValue, 10));
        }
      } else {
        setFormData(prev => ({
          ...prev,
          [`step${step}`]: {
            ...prev[`step${step}`],
            valid: false,
            displayMessage: 'Please let us know whether or not you\'ll be attending'
          },
        }))
      }
    }
  }, [navigate])
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography use='headline6' style={{ paddingBottom: '1rem' }}>
          Welcome, {party.name}
        </Typography>
        <br />
        <Typography use='body1' style={{ maxWidth: '30rem', paddingBottom: '1rem', display: 'inline-block' }}>
          We hope that you will be able to attend. However, we also understand if you cannot attend.
      </Typography>
        <br />
        <Typography use='body2' style={{ maxWidth: '30rem', paddingBottom: '1rem', display: 'inline-block' }}>
          If only some of your party is attending, please RSVP yes.  We'll allow you to change who's attending, on the next page.
      </Typography>
        <br />
        <div>
          <Radio value='1' checked={radioValue === '1'} onChange={handleChange}>No</Radio>
          <Radio value='0' checked={radioValue === '0'} onChange={handleChange}>Yes</Radio>
        </div>
      </div>
      <Dialog open={confirmDialog} onClose={({ detail }) => {
        if (detail.action === 'accept') {
          setFormValue(parseInt(radioValue, 10));
        } else {
          setFormData(prev => ({
            ...prev,
            [`step${step}`]: {
              ...prev[`step${step}`],
              valid: false,
            },
          }))
        }
        setConfirmDialog(false);
      }}>
        <DialogTitle>We're sorry to hear that.</DialogTitle>
        <DialogContent>
          While we are disheartend to hear that you will not be attending, we understand.  We want you to know that if you
          confirm that you're not attending, your RSVP code will not longer be active.  If things change, please get in touch with us, and we'll see what we can do.
        </DialogContent>
        <DialogActions>
          <DialogButton action='cancel'>Wait a second...</DialogButton>
          <DialogButton action='accept' isDefaultAction>Yes, I'm sure</DialogButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AttendingConfirmation;