import React from 'react';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { RouteComponentProps } from '@reach/router';

const RsvpPage: React.FC<RouteComponentProps> = () => {
  const car = 'string';

  return (
    <div>
      <Typography use="headline1">
        RSVP Page
        {' '}
        {car}
      </Typography>
    </div>
  );
};

export default RsvpPage;
