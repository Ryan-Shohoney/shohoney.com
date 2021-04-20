import React, { useEffect, useState } from 'react';
import { Button } from '@rmwc/button';
import '@rmwc/button/styles';
import { CircularProgress } from '@rmwc/circular-progress';
import { Typography } from '@rmwc/typography';
import RSVPCode from './rsvp-code';
import AttendingConfirmation from './attending-confirmation';
import GuestsForm from './guests';
import LodgingForm from './lodging';
import WelcomePartyForm from './welcome-party';
import ReceptionForm from './reception';
import DayAfterForm from './day-after';
import CompleteForm from './complete';
import { navigate } from 'gatsby-link';

export interface IFormDataProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: any;
  navigate: boolean;
  step: number;
}


export const RSVPForm: React.FC<{ startRsvp: React.Dispatch<React.SetStateAction<boolean>> }> = ({ startRsvp }) => {
  const [step, setStep] = useState(0);
  const steps = [
    RSVPCode,
    AttendingConfirmation,
    GuestsForm,
    LodgingForm,
    WelcomePartyForm,
    ReceptionForm,
    DayAfterForm,
    CompleteForm,
  ];
  const StepComp = steps[step];
  const [formData, setFormData] = useState({ step0: { valid: false } });
  const [navigateRequested, setNavigateRequested] = useState(false);
  const [isBackNav, setIsBackNav] = useState(false);
  useEffect(() => {
    setNavigateRequested(false);
    if (!isBackNav && formData[`step${step + 1}`]) {
      if (StepComp !== CompleteForm) {
        setStep(prev => prev + 1);
        startRsvp(true);
      } else {
        navigate('/');
      }
      if (formData[`step${step}`]?.party?.rsvp === 1) {
        setStep(steps.length - 1);
        setFormData(prev => ({
          ...prev,
          [`step${steps.length - 1}`]: formData[`step${step + 1}`]
        }));
      }
    }
  }, [formData]);
  const calcPrevStep = () => {
    const { party } = formData[`step${step}`];
    if (party.rsvp === 1) {
      setStep(0);
    } else if (step === steps.length - 1 && !party.ap) {
      setStep(prev => prev - 2);
    } else {
      setStep(prev => prev - 1);
    }
    setIsBackNav(true);
  }
  const requestNav = () => {
    setIsBackNav(false);
    setNavigateRequested(true);
  }
  const { party } = formData[`step${step}`];
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem', flexWrap: 'wrap' }}>
        <style scoped>{`
          .mdc-radio .mdc-radio__native-control:enabled:checked + .mdc-radio__background .mdc-radio__outer-circle,
          .mdc-radio .mdc-radio__native-control:enabled + .mdc-radio__background .mdc-radio__inner-circle {
            border-color: var(--mdc-theme-primary);
          }
        `}</style>
        <StepComp navigate={navigateRequested} setFormData={setFormData} step={step} formData={formData} />
      </div>
      {formData && formData[`step${step}`]?.valid === false && formData[`step${step}`].displayMessage && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
          <Typography use='body2' theme={['error']}>{formData[`step${step}`].displayMessage}</Typography>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {step > 0 && party?.rsvp !== 1 && <Button onClick={calcPrevStep} label='Previous' raised theme={['onSecondary', 'secondary', 'secondaryBg']} style={{ justifySelf: 'flex-start' }} />}
        {!navigateRequested ? <Button onClick={requestNav} label={step === steps.length - 1 ? 'Finish up' : 'Next'} raised style={{ justifySelf: 'flex-end' }} disabled={formData[`step${step}`]?.disableWhenInvalid ?? false} /> : <CircularProgress />}
      </div>
    </>
  );
}