import React from 'react';
import { Card } from '@rmwc/card';
import '@rmwc/card/styles';
import {mealValues} from '../../../../../components/rsvp-form/reception';
import { IRsvp } from '../../index';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { Icon } from '@rmwc/icon';
import '@rmwc/icon/styles';
import { RSVPIcons } from '../../../invitees';
import { ListDivider } from '@rmwc/list';
import '@rmwc/list/styles';

interface IProps {
  rsvp: IRsvp;
}

const RsvpCard: React.FC<IProps> = ({ rsvp }) => (
  <Card>
    <Typography use={'headline6'} style={{display: 'flex', alignItems: 'center', justifyContent:'space-between', padding: '1rem'}}>
      {rsvp.name}
      <span style={{display: 'inline-flex'}}>
        <Icon icon={RSVPIcons[rsvp.rsvp][0]} style={{color: `var(${RSVPIcons[rsvp.rsvp][1]})`}}/>
        {rsvp.usingShuttle && <Icon icon={'directions_bus'} />}
        {rsvp.rsvp == 0 && rsvp.guests.some(g => !g.meal) && <Icon icon={'warning'} style={{color: `var(${RSVPIcons[2][1]})`}} />}
      </span>
    </Typography>
    <ListDivider />
    {rsvp.rsvp === 0 && (<>
      <Typography use={'body1'} style={{display: 'inline-flex', flexWrap: 'wrap', padding: '0.5rem 1rem'}}>
        Lodging: {rsvp.lodging?.location}
        <br />
        Duration: {rsvp.lodging?.duration.split(',').join(', ')}
        {(rsvp.lodging?.durationDetail || rsvp.lodging?.locationDetail) && (
          <Typography use={'body2'} style={{display: 'inline-flex', padding: '0.5rem', width: '100%'}}>
            Notes:
            <br />
            {rsvp.lodging.locationDetail && (<>Lodging: {rsvp.lodging.locationDetail}<br/></>)}
            {rsvp.lodging.durationDetail && (<>Duration: {rsvp.lodging.durationDetail}<br/></>)}
          </Typography>
        )}
      </Typography>
      <ListDivider />
      {rsvp.welcomeParty && (
        <Typography use={'body1'} style={{display: 'inline-block', padding: '0.5rem 1rem'}}>
          Attending Welcome Party: {rsvp.welcomeParty.attending}
          {rsvp.welcomeParty.attending === 'yes' && (
            <>
              <br/>
              <Typography use={'body1'} style={{display: 'inline-block', padding: '0.5rem 0'}}>
                Guests Attending: {rsvp.welcomeParty.numGuests}
              </Typography>
            </>
          )}
        </Typography>
      )}
      <ListDivider />
      {rsvp.guests.map(g => (
        <>
          <Typography key={`${g.firstName}-${g.lastName}`} use={'body1'} style={{display: 'inline-block', padding: '0.5rem 1rem'}}>
            {g.firstName} {g.lastName}:
            <br/>
            <Typography use={'body2'} style={{padding: '0 0.5rem'}}>
              Meal Choice: {mealValues.find(m => m.value === g?.meal?.choice)?.label ?? 'Unknown'}
              {g.meal?.specialNotes && (<><br/><span style={{padding: '0 0.5rem'}}>Special Notes: {g.meal.specialNotes}</span></>)}
            </Typography>
          </Typography>
          <ListDivider />
        </>
      ))}
      {rsvp.ap && (
        <Typography use={'body1'} style={{padding: '1rem'}}>
          {rsvp.dayAfterParty === 'yes' && <>They are attending the day after party</>}
          {rsvp.dayAfterParty === 'no' && <>They are not attending the day after party</>}
          {rsvp.dayAfterParty === 'dropby' && <>They are going to drop by the day after party</>}
          {!rsvp.dayAfterParty && <>They did no respond to whether or not they would attend the after party</>}
        </Typography>
      )}
    </>)}
  </Card>
)
export default RsvpCard;