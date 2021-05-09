import React, {useEffect, useState} from 'react';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { RouteComponentProps } from "@reach/router";
import { get } from '../../../services/admin/guests';
import { IGuest } from '../invitees';
import RsvpCard from '../../../components/admin/rsvp-card';
import { Grid, GridCell } from '@rmwc/grid';
import '@rmwc/grid/styles';
import { ChipSet, Chip } from '@rmwc/chip';
import '@rmwc/chip/styles';
import { mealValues } from '../../../components/rsvp-form/reception';

interface IRsvpLodging {
  location: string;
  locationDetail: string;
  duration: string;
  durationDetail: string;
}

interface IRsvpWelcomeParty {
  attending: string;
  numGuests: number;
}

interface IGuestWithMeal extends IGuest {
  meal: {
    choice: string;
    specialNotes?: string;
  }
}

export interface IRsvp {
  rsvpid: string;
  guests: IGuestWithMeal[];
  name: string;
  lodging: IRsvpLodging;
  welcomeParty: IRsvpWelcomeParty;
  usingShuttle: boolean;
  dayAfterParty: string;
  emailAddress: string;
  rsvp: number;
  ap: boolean;
}

interface IPartiesResponse {
  parties: IRsvp[];
}

interface IAggregatedValues {
  totalGuests: number;
  totalPartiesYes: number;
  totalPartiesNo: number;
  mealCounts: {
    [key:string]: number;
  };
  hotelCounts: {
    [key:string]: number;
  }
  shuttleCount: number;
  afterPartyCount: number;
  welcomePartyTotal: number;
  peopleEatingAtAfterParty: number;
  incomplete: number;
}

const RsvpPage: React.FC<RouteComponentProps> = () => {
  const [rsvps, setRsvps] = useState<IRsvp[]>();
  useEffect(() => {
    const doFetch = async () => {
      const result = await get<IPartiesResponse>('rsvp');
      setRsvps(result.parties);
    }
    doFetch();
  }, []);
  useEffect(() => {
    if(rsvps) {
      const attendingParties = rsvps.filter(r => r.rsvp === 0);
      const attending = attendingParties.length;
      const hotelCounts: { [key:string]: number } = {};
      let afterPartyCount = 0;
      let welcomePartyTotal = 0;
      let peopleEatingAtAfterParty = 0;
      let incomplete = 0;
      attendingParties.forEach(({ lodging, dayAfterParty, ap, welcomeParty , guests}) => {
        if(lodging) {
          hotelCounts[lodging.location] = hotelCounts[lodging.location] ? hotelCounts[lodging.location] + 1 : 1;
        }
        ap && dayAfterParty && dayAfterParty !== 'no' && afterPartyCount++;
        if(welcomeParty && welcomeParty.attending !== 'no') {
          welcomePartyTotal += welcomeParty.numGuests;
          if(welcomeParty.attending === 'yes') {
            peopleEatingAtAfterParty += welcomeParty.numGuests;
          }
        }
        if(!lodging || guests.some(g => !g.meal)) {
          incomplete++;
        }
      });
      const allAttendees = rsvps.filter(r => r.rsvp === 0).map(r => r.guests);
      const mealCounts: { [key:string]: number } = {};
      allAttendees.forEach(a => {
        a.map(g => {
          if(g.meal) {
            const foodValue = g.meal.choice;
            mealCounts[foodValue] = mealCounts[foodValue] ? mealCounts[foodValue] + 1 : 1;
          }
        })
      });
      const totalGuests = allAttendees.map(a => a.length).reduce((acc, v) => acc + v);
      setAggregatedValues({
        totalGuests,
        totalPartiesYes: attending,
        totalPartiesNo: rsvps.length - attending,
        shuttleCount: rsvps.filter(r => r.usingShuttle).length,
        mealCounts,
        hotelCounts,
        afterPartyCount,
        welcomePartyTotal,
        peopleEatingAtAfterParty,
        incomplete,
      });
    }
  }, [rsvps]);
  const [aggregatedValues, setAggregatedValues] = useState<IAggregatedValues>();
  return (
    <div>
      <Typography use="headline3">
        RSVPs
      </Typography>
      <br />
      <div style={{padding: '1rem'}}>
        <Typography use={'body1'}>
          Numbers at a glance:
        </Typography>
        <div style={{padding: '1rem'}}>
          {aggregatedValues && (
            <>
              <Typography use={'body1'}>
                Party Info:
              </Typography>
              <ChipSet>
                <Chip label={`Total Guests: ${aggregatedValues?.totalGuests}`} />
                <Chip label={`Total RSVPs: ${rsvps?.length}`} />
                <Chip label={`Yes: ${aggregatedValues?.totalPartiesYes}`} />
                <Chip label={`No: ${aggregatedValues?.totalPartiesNo}`} />
              </ChipSet>
              <Typography use={'body1'} style={{paddingLeft:'0.5rem'}}>
                Events
              </Typography>
              <ChipSet>
                <Chip label={`Attending welcome party: ${aggregatedValues.welcomePartyTotal}`} />
                <Chip label={`Eating at welcome party: ${aggregatedValues.peopleEatingAtAfterParty}`} />
                <Chip label={`Wedding: ${aggregatedValues.totalGuests}`} />
                <Chip label={`Attending Day After Party: ${aggregatedValues.afterPartyCount}`} />
                <Chip label={`Using Shuttle: ${aggregatedValues.shuttleCount} `} icon={'directions_bus'} />
              </ChipSet>
              <Typography use={'body1'} style={{paddingLeft:'0.5rem'}}>
                Meal Choices
              </Typography>
              <ChipSet>
                {Object.entries(aggregatedValues.mealCounts).sort((a,b) => b[1] - a[1]).map(([mealKey, count]) => (
                  <Chip key={mealKey} label={`${mealValues.find(x => x.value === mealKey)?.label ?? 'Unknown meal key'}: ${count}`} />
                ))}
              </ChipSet>
              <Typography use={'body1'} style={{paddingLeft:'0.5rem'}}>
                Lodging Choices
              </Typography>
              <ChipSet>
                {Object.entries(aggregatedValues.hotelCounts).sort((a,b) => b[1] - a[1]).map(([hotelKey, count]) => (
                  <Chip key={hotelKey} label={`${hotelKey !== 'undefined' ? hotelKey : 'Incomplete RSVP'}: ${count}`} />
                ))}
              </ChipSet>
              <Typography use={'body1'} style={{paddingLeft:'0.5rem'}}>
                Problems
              </Typography>
              <ChipSet>
                <Chip label={`Incomplete RSVPs: ${aggregatedValues?.incomplete}`} />
              </ChipSet>
          </>)}
        </div>
      </div>
      <Grid>
        {rsvps && rsvps.length && rsvps?.sort((a,b) => a.rsvp - b.rsvp).map(r => (
          <GridCell key={r.name} phone={12} tablet={6} desktop={4}>
            <RsvpCard rsvp={r} />
          </GridCell>
        ))}
      </Grid>
    </div>
  );
};

export default RsvpPage;