import React, { useCallback, useEffect, useState } from "react";
import { Card, CardActionIcon, CardActionIcons, CardActions, CardPrimaryAction } from '@rmwc/card';
import { Grid, GridCell, GridRow } from '@rmwc/grid';
import '@rmwc/grid/styles';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { CircularProgress } from '@rmwc/circular-progress';
import '@rmwc/circular-progress/styles';
import { RouteComponentProps } from "@reach/router";
import { get } from "../../../services/admin/guests";
import { CollapsibleList, ListDivider } from '@rmwc/list';
import '@rmwc/list/styles';
import { Fab } from '@rmwc/fab';
import '@rmwc/fab/styles';
import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';
import './invitees.css';

interface IGuest {
  _id: string;
  firstName: string;
  lastName: string;
  isAnonymous: boolean;
}
interface IHousehold {
  name: string;
  rsvp: 'declined' | 'attending';
  guests: IGuest[];
}
interface INewHouseHold extends IHousehold {
  _newParty?: boolean;
}

const PartyCard: React.FC<{ party: INewHouseHold }> = ({ party }) => {
  const [isEditing, setIsEditing] = useState(party._newParty);
  const isEditingCallback = useCallback(() => setIsEditing(!isEditing), [isEditing]);
  const [partyForm, setPartyForm] = useState({ ...party });
  const handleChange = ({ target }) => {
    const value = target.value;
    const name = target.name;
    setPartyForm({ ...partyForm, [name]: value });
  }
  return (
    <Card className={'guest-card'}>
      <CardPrimaryAction>
        <CollapsibleList style={{ padding: '1rem' }} handle={
          <Typography use='headline6' style={{ display: 'inline-block' }}>
            {partyForm.name}
          </Typography>}>
          {isEditing ? <TextField theme='secondary' style={{ width: '100%' }} label='Party Name' value={partyForm.name} name='name' onChange={handleChange} /> : null}
          RSVP Status: {party.rsvp}
        </CollapsibleList>
      </CardPrimaryAction>
      <ListDivider />
      {party.guests.map((g, idx) => (
        <CardPrimaryAction key={idx}>
          <CollapsibleList style={{ padding: '1rem' }} handle={
            <Typography use='body1' style={{ width: '100%', display: 'inline-block' }}>
              {g.isAnonymous ? 'Plus 1' : `${g.firstName} ${g.lastName}`}
            </Typography>}>
          </CollapsibleList>
          <ListDivider />
        </CardPrimaryAction>
      ))}
      <ListDivider />
      <CardActions>
        <CardActionIcons>
          {!isEditing ?
            <CardActionIcon icon='edit' onClick={isEditingCallback} /> :
            <>
              <CardActionIcon icon='cancel' onClick={() => setPartyForm({ ...party })} />
              <CardActionIcon icon='save' />
            </>}

        </CardActionIcons>
      </CardActions>
    </Card>
  );
}
const PartyCardGrid: React.FC<{ parties: IHousehold[] }> = ({ parties }) => (
  <Grid>
    <GridRow>
      {parties.map(p => (
        <GridCell key={p.name} tablet={12} desktop={3}>
          <PartyCard party={p} />
        </GridCell>
      ))}
    </GridRow>
  </Grid>
);



const InviteesPage: React.FC<RouteComponentProps> = () => {
  const dataKey = 'households';
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(true);
  useEffect(() => {
    const doFetch = async () => {
      const result = await get<Array<IHousehold>>(dataKey);
      setData(result[dataKey]);
    }
    doFetch();
  }, []);

  useEffect(() => {
    if (data) setProgress(false);
  }, [data]);

  const addGuestCallback = () => {
    const newData = [...data, {
      _newParty: true,
      name: 'Insert Party Name',
      rsvp: 'no response',
      guests: [{ isAnonymous: true }]
    }];

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
          {progress ? <CircularProgress size='xlarge' theme='secondary' /> : <PartyCardGrid parties={data} />}
        </GridCell>
      </Grid>
      <Fab icon='add' label='Add Guest' onClick={addGuestCallback} />
    </>
  );
};

export default InviteesPage;