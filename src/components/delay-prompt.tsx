import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from '@rmwc/dialog';
import '@rmwc/dialog/styles';
import Cookies from 'universal-cookie';
import { navigate } from 'gatsby-link';

interface IProps {
  title: string;
  text: string;
  cookieName: string;
  duration: number;
  dismissals: number;
}

const DelayPrompt: React.FC<IProps> = ({ duration, cookieName, text, title, dismissals }) => {
  const [triggerPrompt, setTriggerPrompt] = useState(false);
  const cookies = new Cookies();
  const cookie = parseInt(cookies.get(cookieName), 10) ?? Number.MIN_SAFE_INTEGER;

  setTimeout(() => {
    if (Number.isNaN(cookie) || cookie < dismissals) {
      setTriggerPrompt(true);
    }
  }, duration);

  return (
    <Dialog open={triggerPrompt} onClose={({ detail }) => {
      const { action } = detail;
      if (action === 'accept') {
        cookies.set(cookieName, dismissals);
        navigate('/rsvp');
      } else {
        cookies.set(cookieName, !Number.isNaN(cookie) ? cookie + 1 : 1);
      }
    }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <DialogButton action='cancel' theme={['error']}>Maybe later</DialogButton>
        <DialogButton action='accept' isDefaultAction theme={['secondary', 'primaryBg']}>Let's Go!</DialogButton>
      </DialogActions>
    </Dialog>
  )
};

export default DelayPrompt;