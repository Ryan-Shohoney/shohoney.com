import React from 'react';
import { IFormDataProps } from "..";
import { Card } from '@rmwc/card'

const GuestCard: React.FC<{ firstName: string, lastName: string }> = ({ firstName, lastName }) => {
  return (
    <Card style={{ width: '100%' }}>

    </Card>
  );
}

const GuestsForm: React.FC<IFormDataProps> = ({ navigate, setFormData, step, formData, }) => {
  const { party } = formData[`step${step}`];

  return (
    <>
      {party?.guests.map(guest => (
        <GuestCard firstName={guest.firstName} lastName={guest.lastName} />
      ))}
    </>
  )
};

export default GuestsForm;