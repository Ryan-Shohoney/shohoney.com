import React, { useEffect, useState } from 'react';
import { IFormDataProps } from "..";
import { Switch } from '@rmwc/switch';
import '@rmwc/switch/styles';
import { TextField } from '@rmwc/textfield';
import { DataTable, DataTableBody, DataTableCell, DataTableContent, DataTableHead, DataTableHeadCell, DataTableRow } from '@rmwc/data-table';
import '@rmwc/data-table/styles';
import '@rmwc/typography/styles';
import '@rmwc/grid/styles';
import { Typography } from '@rmwc/typography';
import { post } from '../../../services/admin/guests';
interface IGuest {
  firstName: string;
  lastName: string;
  isAttending?: boolean;
  isAnonymous?: boolean;
}
const GuestRow: React.FC<{ guest: IGuest, index: number, updateParty: (guest: IGuest, index: number) => void }> = ({ guest, index, updateParty }) => {
  const { firstName, lastName, isAnonymous } = guest;
  const [isAttending, setIsAttending] = useState(true);
  const [fn, setFn] = useState(firstName ?? '');
  const [ln, setLn] = useState(lastName ?? '');
  const formStateFn = {
    firstName: setFn,
    lastName: setLn,
    isAttending: setIsAttending,
  }
  const handleChange = ({ target }) => {
    formStateFn[target.name](target.value);
    updateParty({
      firstName: fn,
      lastName: ln,
      isAttending,
      [target.name]: target.value,
      isAnonymous: ln.length === 0 || fn.length === 0
    }, index)
  };
  return (
    <DataTableRow>
      {!isAnonymous ? <DataTableCell>{firstName}</DataTableCell> : (
        <DataTableCell>
          <TextField value={fn} label='First Name' required={isAttending} onChange={handleChange} name='firstName' />
        </DataTableCell>
      )}
      {!isAnonymous ? <DataTableCell>{lastName}</DataTableCell> : (
        <DataTableCell>
          <TextField value={ln} label='Last Name' required={isAttending} onChange={handleChange} name='lastName' />
        </DataTableCell>
      )}

      <DataTableCell hasFormControl>
        <Switch defaultChecked onChange={() => handleChange({ target: { name: 'isAttending', value: !isAttending } })} />
      </DataTableCell>
    </DataTableRow>);
};

const GuestsForm: React.FC<IFormDataProps> = ({ navigate, setFormData, step, formData, }) => {
  const { party } = formData[`step${step}`];
  const { guests } = party
  const [guestList, setGuestList] = useState(guests);
  const editPartyMember = (guest: IGuest, index: number) => setGuestList(prev => {
    let tmp = [...prev];
    tmp.splice(index, 1, guest);
    return tmp;
  });
  useEffect(() => {
    console.warn(party);
    if (party.rsvp === 1) {
      console.warn('setting form to advance');
      setFormData(prev => ({
        ...prev,
        [`step${step}`]: {
          ...formData[`step${step}`],
          valid: true,
        },
        [`step${step + 1}`]: { party }
      }));
    }
  }, []);
  useEffect(() => {
    if (navigate) {
      const doFetch = async () => {
        const result = await post<any>('rsvp', {
          rsvpid: party.rsvpid,
          guests: guestList.filter(x => x.isAttending !== false),
        });
        setFormData(prev => ({
          ...prev,
          [`step${step}`]: {
            ...formData[`step${step}`],
            valid: true,
          },
          [`step${step + 1}`]: result
        }))
      }
      doFetch();
    }
  }, [navigate]);
  useEffect(() => {
    if (guestList && party.rsvp !== 1) {
      setFormData(prev => ({
        ...prev,
        [`step${step}`]: {
          ...formData[`step${step}`],
          disableWhenInvalid: guestList.some(x => x.isAttending !== false && x.isAnonymous === true),
        }
      }));
    }
  }, [guestList]);
  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <span style={{ maxWidth: '60rem', width: '100%', textAlign: 'center' }}>
          <Typography use={'headline6'} style={{ display: 'block', paddingBottom: '1rem' }}>
            Below is the list of guests that have been invited for your party. While we've done our best to fill this out for you, there is some information we may not have.  Please complete any forms that are present.
        </Typography>
          <Typography use={'body1'} style={{ display: 'block', paddingBottom: '1rem' }}>
            If one (or more) of your guests are unable to attend, or you will not be using your +1, please turn off the switch in the "Attending?" column.
        </Typography>
        </span>
      </div>
      <DataTable>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>
                First Name
              </DataTableHeadCell>
              <DataTableHeadCell>
                Last Name
              </DataTableHeadCell>
              <DataTableHeadCell>
                Attending?
              </DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {guests?.map((guest, index) => (
              <GuestRow key={`${guest.firstName}:${guest.lastName}:${guest.isAnonymous}`} guest={guest} index={index} updateParty={editPartyMember} />
            ))}
          </DataTableBody>
        </DataTableContent>

      </DataTable>
    </>
  );
};

export default GuestsForm;