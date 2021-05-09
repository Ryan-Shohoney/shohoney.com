import React, { useCallback, useEffect, useState } from "react";
import { Card, CardActionIcon, CardActionIcons, CardActions, CardPrimaryAction } from '@rmwc/card';
import { Grid, GridCell, GridRow } from '@rmwc/grid';
import '@rmwc/grid/styles';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { CircularProgress } from '@rmwc/circular-progress';
import '@rmwc/circular-progress/styles';
import { RouteComponentProps } from "@reach/router";
import { del, get, post } from "../../../services/admin/guests";
import { CollapsibleList, ListDivider } from '@rmwc/list';
import '@rmwc/list/styles';
import { Fab } from '@rmwc/fab';
import '@rmwc/fab/styles';
import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';
import { Select } from '@rmwc/select';
import '@rmwc/select/styles';
import { Checkbox } from '@rmwc/checkbox';
import '@rmwc/checkbox/styles';
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
export interface IGuest {
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
  invitedToAfterParty: boolean;
}
interface INewHouseHold extends IHousehold {
  _newParty?: boolean;
}

export const RSVPIcons = [
  ['check_circle', '--mdc-theme-primary'],
  ['cancel', '--mdc-theme-error'],
  ['help', '--mdc-theme-admin-warning'],
]

const PartyCard: React.FC<{ party: INewHouseHold, updateFn: () => void }> = ({ party, updateFn }) => {
  const [isEditing, setIsEditing] = useState(party._newParty);
  const [explode, setExplode] = useState(undefined);
  const [progress, setProgress] = useState(false);
  useEffect(() => setExplode(isEditing), [isEditing]);
  useEffect(() => {
    if (explode === false) setExplode(undefined)
  }, [explode])
  const isEditingCallback = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);
  const enhancedUpdate = () => {
    setIsEditing(false);
    setProgress(false);
    updateFn();
  }
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
    setProgress(true);
    post<IHousehold>(HouseholdRESTEndpoint, newStateValue).then(enhancedUpdate);

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
  const deleteParty = () => {
    setProgress(true);
    del(HouseholdRESTEndpoint, partyForm._id).then(enhancedUpdate)
  };
  return (
    <Card className={'guest-card'}>
      <style scoped>{`
        .mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background {
          background-color: var(--mdc-theme-primary);
          border-color: var(--mdc-theme-primary);
      `}</style>
      <CardPrimaryAction>
        <CollapsibleList open={explode} style={{ padding: '1rem' }} handle={
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
          {isEditing ?
            <Select
              label='RSVP'
              defaultValue={`${partyForm.rsvp}`}
              onChange={({ target }) => handleChange({ target: { ...target, name: 'rsvp', value: parseInt((target as any).value, 10) } })}>
              <option value='0'>Attending</option>
              <option value='1'>Not Attending</option>
              <option value='2'>Pending</option>
            </Select> :
            <Typography use='body2' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0' }}>RSVP Status: <Icon icon={RSVPIcons[party.rsvp][0]} style={{ paddingLeft: '0.5rem', color: `var(${RSVPIcons[party.rsvp][1]})` }} /></Typography>
          }
          <ListDivider />
          <Typography use='body2' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0' }}>
            Invited to Day after Party: {isEditing ?
              <Checkbox checked={partyForm.invitedToAfterParty ?? false} onChange={({ target }) => handleChange({ target: { ...target, name: 'invitedToAfterParty', value: (target as any).checked } })} theme={['primary', 'onPrimary', 'primaryBg']} /> :
              <Icon icon={partyForm.invitedToAfterParty ? 'check' : 'cancel'} style={{ paddingLeft: '0.5rem', color: `var(${RSVPIcons[partyForm.invitedToAfterParty ? 0 : 1][1]})` }} />}
          </Typography>

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
          {progress && <CardActionIcon icon={<CircularProgress />} />}
          {!isEditing ?
            <>
              <CardActionIcon icon='delete' onClick={deleteParty} disabled={progress} />
              <CardActionIcon icon='edit' onClick={isEditingCallback} disabled={progress} />
            </>
            :
            <>
              <CardActionIcon icon='cancel' onClick={cancelEdit} disabled={progress} />
              <CardActionIcon icon='save' onClick={commitEdit} disabled={progress} />
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
  const [filterData, setFilterData] = useState(null);
  const [progress, setProgress] = useState(true);
  const [doUpdate, setDoUpdate] = useState(true);
  const updateDaddy = () => setDoUpdate(true);
  useEffect(() => {
    const doFetch = async () => {
      const result = await get<Array<IHousehold>>(HouseholdRESTEndpoint);
      setData(result[HouseholdRESTEndpoint]);
      setDoUpdate(false);
    }
    doFetch();
  }, [doUpdate]);

  useEffect(() => {
    if (data) {
      setProgress(false);
      setFilterData(data);
    }
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
  const [filter, setFilter] = useState('');
  const handleFilterChange = ({ target }) => {
    setFilter(target.value);
  }
  useEffect(() => {
    if (filterData) {
      const regex = new RegExp(`${filter}`, 'i');
      const filterResult = data.filter(d => {
        return regex.test(d.name);
      });
      setFilterData(filterResult);
    }
  }, [filter]);
  return (
    <>
      <Grid>
        <GridCell span={12}>
          <Typography use="headline3">
            Parties
          </Typography>
        </GridCell>
        <GridCell tablet={4}>
          <TextField
            style={{ width: '100%' }}
            name={'party-name-filter'}
            value={filter}
            label='Filter parties'
            onChange={handleFilterChange} />
        </GridCell>
        <GridCell span={12}>
          {progress ? <CircularProgress size='xlarge' theme='secondary' /> : <PartyCardGrid parties={filterData} updateFn={updateDaddy} />}
        </GridCell>
      </Grid>
      <Fab icon='add' label='Add Guest' onClick={addPartyCallback} theme={['onPrimary', 'primaryBg']} />
    </>
  );
};

export default InviteesPage;