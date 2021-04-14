import React, { useCallback, useEffect, useState } from "react";
import { Card, CardActionIcon, CardActionIcons, CardActions, CardPrimaryAction } from '@rmwc/card';
import { Grid, GridCell, GridRow } from '@rmwc/grid';
import '@rmwc/grid/styles';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { CircularProgress } from '@rmwc/circular-progress';
import '@rmwc/circular-progress/styles';
import { RouteComponentProps } from "@reach/router";
import { get, post } from "../../../services/admin/guests";
import { CollapsibleList, ListDivider } from '@rmwc/list';
import '@rmwc/list/styles';
import { Fab } from '@rmwc/fab';
import '@rmwc/fab/styles';
import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';
import './invitees.css';
import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';
import { Icon } from "@rmwc/icon";
import '@rmwc/icon/styles';
import { IconButton } from "@rmwc/icon-button";
import { Tooltip } from '@rmwc/tooltip';
import '@rmwc/tooltip/styles';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('23456789abcdefghjkmnpqrstuvwrxyz', 5);
const HouseholdRESTEndpoint = 'households';
interface IGuest {
  _id: string;
  firstName: string;
  lastName: string;
  isAnonymous: boolean;
}
interface IHousehold {
  name: string;
  rsvp: 0 | 1 | 2;
  guests: IGuest[];
  rsvpid: string;
}
interface INewHouseHold extends IHousehold {
  _newParty?: boolean;
}

const RSVPIcons = [
  ['check_circle', '--mdc-theme-primary'],
  ['cancel', '--mdc-theme-error'],
  ['help', '--mdc-theme-admin-warning'],
]

const PartyCard: React.FC<{ party: INewHouseHold, updateFn: () => void }> = ({ party, updateFn }) => {
  const [isEditing, setIsEditing] = useState(party._newParty);
  const isEditingCallback = useCallback(() => setIsEditing(!isEditing), [isEditing]);
  const [partyForm, setPartyForm] = useState(cloneDeep(party));
  const handleChange = ({ target }) => {
    const newStateValue = cloneDeep(partyForm);
    set(newStateValue, target.name, target.value);
    setPartyForm(newStateValue);
  }
  const cancelEdit = () => {
    setPartyForm({ ...party });
    setIsEditing(false);
  };
  const commitEdit = () => {
    const newStateValue = cloneDeep(partyForm);
    newStateValue.guests.forEach(g => {
      if (g.firstName && g.lastName) {
        g.isAnonymous = false;
      }
    });
    if (!newStateValue.rsvpid) {
      newStateValue.rsvpid = nanoid();
    }
    post<IHousehold>(HouseholdRESTEndpoint, newStateValue).then(() => updateFn());

    setPartyForm(newStateValue);
    setIsEditing(false);
  };
  const addGuest = () => {
    const newStateValue = cloneDeep(partyForm);
    newStateValue.guests.push({ isAnonymous: true, });
    setPartyForm(newStateValue);
  };
  const removeGuest = (idx) => {
    const newStateValue = cloneDeep(partyForm);
    newStateValue.guests.splice(idx, 1);
    setPartyForm(newStateValue);
  }
  return (
    <Card className={'guest-card'}>
      <CardPrimaryAction>
        <CollapsibleList open={isEditing} style={{ padding: '1rem' }} handle={
          <Typography use='headline6' style={{ display: 'inline-block' }}>
            {partyForm.name}
          </Typography>}>
          {isEditing ?
            <TextField
              style={{ width: '100%' }}
              label='Party Name'
              value={partyForm.name}
              name='name'
              onChange={handleChange} />
            : null}
          <Typography use='body2' style={{ display: 'flex', alignItems: 'center' }}>RSVP Status: <Icon icon={RSVPIcons[party.rsvp][0]} style={{ paddingLeft: '1rem', color: `var(${RSVPIcons[party.rsvp][1]})` }} /></Typography>
        </CollapsibleList>
      </CardPrimaryAction>
      <ListDivider />
      {partyForm.guests.map((g, idx) => (
        <CardPrimaryAction key={idx}>
          {isEditing ?
            <div style={{ padding: '1rem' }}>
              <TextField
                style={{ width: '100%' }}
                label='First Name'
                name={`guests[${idx}].firstName`}
                onChange={handleChange}
                value={g.firstName ?? ''} />
              <TextField
                style={{ width: '100%' }}
                label='Last Name'
                name={`guests[${idx}].lastName`}
                onChange={handleChange}
                value={g.lastName ?? ''} />
              <IconButton icon='delete' theme={['error']} onClick={() => removeGuest(idx)} />
            </div> :
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <Typography use='body1' style={{ display: 'inline-flex' }}>
                {g.isAnonymous ? `Guest ${idx + 1}` : `${g.firstName} ${g.lastName}`}
              </Typography>
              {g.isAnonymous && (
                <Tooltip content="This guest has incomplete information. The person who RSVPs for this guest will need to fill out the anonymous guest's infomration" enterDelay={500}>
                  <Icon icon='warning' style={{ color: '#ffde03' }} />
                </Tooltip>
              )}
            </div>
          }
          <ListDivider />
        </CardPrimaryAction>
      ))}
      {isEditing && (
        <CardPrimaryAction onClick={addGuest}>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <IconButton icon='add' onClick={addGuest} theme={['primary']} />
          </div>
        </CardPrimaryAction>
      )}
      <ListDivider />
      <CardActions style={{ padding: '0.5rem 1rem' }}>
        <Typography use='body1'>
          RSVP Code: {partyForm.rsvpid}
        </Typography>
        <CardActionIcons>
          {!isEditing ?
            <CardActionIcon icon='edit' onClick={isEditingCallback} /> :
            <>
              <CardActionIcon icon='cancel' onClick={cancelEdit} />
              <CardActionIcon icon='save' onClick={commitEdit} />
            </>}

        </CardActionIcons>
      </CardActions>
    </Card>
  );
}
const PartyCardGrid: React.FC<{ parties: IHousehold[], updateFn: () => void }> = ({ parties, updateFn }) => (
  <Grid>
    <GridRow>
      {parties.sort((p1, p2) => p1.guests.length - p2.guests.length).map(p => (
        <GridCell key={p.name} phone={12} tablet={6} desktop={3}>
          <PartyCard party={p} updateFn={updateFn} />
        </GridCell>
      ))}
    </GridRow>
  </Grid>
);

const InviteesPage: React.FC<RouteComponentProps> = () => {
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(true);
  const [doUpdate, setDoUpdate] = useState(true);
  const updateDaddy = () => setDoUpdate(true);
  useEffect(() => {
    const doFetch = async () => {
      const result = await get<Array<IHousehold>>(HouseholdRESTEndpoint);
      setData(result[HouseholdRESTEndpoint]);
      setDoUpdate(false);
      console.warn('getting new data');
    }
    doFetch();
  }, [doUpdate]);

  useEffect(() => {
    if (data) setProgress(false);
  }, [data]);

  const addPartyCallback = () => {
    const newData = [{
      _newParty: true,
      name: 'Insert Party Name',
      rsvp: 2,
      guests: [{ isAnonymous: true }]
    }, ...data];
    window.scrollTo(0, 0);
    setData(newData);
  }
  return (
    <>
      <Grid>
        <GridCell span={12}>
          <Typography use="headline3">
            Parties
          </Typography>
        </GridCell>
        <GridCell span={12}>
          {progress ? <CircularProgress size='xlarge' theme='secondary' /> : <PartyCardGrid parties={data} updateFn={updateDaddy} />}
        </GridCell>
      </Grid>
      <Fab icon='add' label='Add Guest' onClick={addPartyCallback} theme={['onPrimary', 'primaryBg']} />
    </>
  );
};

export default InviteesPage;