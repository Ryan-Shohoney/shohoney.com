import React, { useEffect, useState } from 'react';
import { Button } from '@rmwc/button';
import '@rmwc/button/styles';
import { CircularProgress } from '@rmwc/circular-progress';
import { Typography } from '@rmwc/typography';
import RSVPCode from './rsvp-code';
import AttendingConfirmation from './attending-confirmation';
import GuestsForm from './guests';

export interface IFormDataProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: any;
  navigate: boolean;
  step: number;
}


export const RSVPForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ step0: { valid: false } });
  const [navigateRequested, setNavigateRequested] = useState(false);
  useEffect(() => {
    setNavigateRequested(false);
    if (formData[`step${step}`].valid) {
      setStep(prev => prev + 1);
    }
  }, [formData]);
  const steps = [
    RSVPCode,
    AttendingConfirmation,
    GuestsForm,
  ];
  const StepComp = steps[step];
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem', flexWrap: 'wrap' }}>
        <StepComp navigate={navigateRequested} setFormData={setFormData} step={step} formData={formData} />
      </div>
      {formData && formData[`step${step}`]?.valid === false && formData[`step${step}`].displayMessage && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
          <Typography use='body2' theme={['error']}>{formData[`step${step}`].displayMessage}</Typography>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {step > 0 && <Button onClick={() => setStep(prevStep => prevStep - 1)} label='Previous' raised theme={['onSecondary', 'secondary', 'secondaryBg']} style={{ justifySelf: 'flex-start' }} />}
        {!navigateRequested ? <Button onClick={() => setNavigateRequested(true)} label='Next' raised style={{ justifySelf: 'flex-end' }} /> : <CircularProgress />}
      </div>
    </>
  );
}