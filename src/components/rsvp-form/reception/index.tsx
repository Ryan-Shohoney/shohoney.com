import { DataTable, DataTableBody, DataTableCell, DataTableContent, DataTableHead, DataTableHeadCell, DataTableRow } from '@rmwc/data-table';
import '@rmwc/data-table/styles';
import { Radio } from '@rmwc/radio';
import { Select } from '@rmwc/select';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { useEffect, useState } from 'react';
import { IFormDataProps } from '..';
import { get, post } from '../../../services/admin/guests';

interface IGuest {
  meal: {
    choice: -1 | 0 | 1 | 2 | 3;
    specialNotes?: string;
  }
}

const transportValues = [
  {
    value: true,
    text: 'Yes, we will use the shuttles',
  },
  {
    value: false,
    text: 'No, we will not use the shuttles',
  }
];
const mealValues = [
  {
    value: 'bc',
    label: 'Brandied Chicken Breast',
  },
  {
    value: 'fm',
    label: 'Filet Mignon'
  },
  {
    value: 'er',
    label: 'Eggplant Rollatini',
  },
  {
    value: 'ct',
    label: 'Chicken Tenders (children only, please)',
  },
  {
    value: 'na',
    label: 'No Meal, please',
  }
]

const ReceptionForm: React.FC<IFormDataProps> = ({ navigate, formData, setFormData, step }) => {
  const { party } = formData[`step${step}`];
  const [shuttle, setShuttle] = useState(party.usingShuttle ?? null);
  const handleChange = ({ target }) => {
    setShuttle(target.value === 'true');
  }
  const handleMealChange = ({ target }, index) => {
    const mealUpdate = { [target.name]: target.value }
    const guestUpdate = {
      ...guestList[index],
      meal: {
        ...guestList[index]?.meal ?? {},
        ...mealUpdate,
      }
    };
    editPartyMember(guestUpdate, index);
  };
  const [guestList, setGuestList] = useState(party.guests);
  const editPartyMember = (guest: IGuest, index: number) => setGuestList(prev => {
    let tmp = [...prev];
    tmp.splice(index, 1, guest);
    return tmp;
  });
  useEffect(() => {
    if (guestList) {
      setFormData(prev => ({
        ...prev,
        [`step${step}`]: {
          ...formData[`step${step}`],
          disableWhenInvalid: guestList.some(x => !x.meal?.choice) || shuttle === null
        }
      }));
    }
  }, [guestList, shuttle]);
  useEffect(() => {
    if (party.rsvp === 1) {
      setFormData(prev => ({
        ...prev,
        [`step${step}`]: {
          ...formData[`step${step}`],
          valid: true,
        },
        [`step${step + 1}`]: { party }
      }));
    }
  }, [formData, setFormData]);
  useEffect(() => {
    if (navigate) {
      const dofetch = async () => {
        const [result, rsvp] = await Promise.all([post<any>('rsvp', {
          rsvpid: party.rsvpid,
          usingShuttle: shuttle,
          guests: guestList,
        }), get<any>(`rsvp?rsvpid=${party.rsvpid}`)]);
        result.party.ap = rsvp.party.ap;
        setFormData(prev => ({
          ...prev,
          [`step${step}`]: {
            valid: true,
            ...result,
          },
          [`step${step + 1}`]: result,
        }));
      }
      dofetch();
    }
  }, [navigate]);
  return (
    <>
      <div style={{ textAlign: 'center', maxWidth: '45rem' }}>
        <Typography use='headline6'>
          We will be providing shuttles from all of the hotels in our room block, to and from the reception.
          Does your party plan on using those shuttes?
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
          <div style={{ maxWidth: '20rem' }}>
            {transportValues.map(l => (
              <Radio key={String(l.value)} name={'location'} value={String(l.value)} style={{ width: '100%' }} onChange={handleChange} checked={shuttle === l.value}>
                {l.text}
              </Radio>
            ))}
          </div>
        </div>
        <div>
          <Typography use='headline6'>
            Please make meal selections for each of the guests in your party.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
            <DataTable style={{ textAlign: 'left' }}>
              <DataTableContent>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeadCell>
                      Guest
                    </DataTableHeadCell>
                    <DataTableHeadCell>
                      Meal
                    </DataTableHeadCell>
                    <DataTableHeadCell>
                      Special Considerations*
                    </DataTableHeadCell>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {guestList?.map((guest, index) => (
                    <DataTableRow key={`${guest.firstName}:${index}`}>
                      <DataTableCell>
                        {guest.firstName} {guest.lastName}
                      </DataTableCell>
                      <DataTableCell>
                        <Select
                          label='Please choose one...'
                          required
                          options={mealValues}
                          onChange={(evt) => handleMealChange({ target: { ...evt.target, name: 'choice' } }, index)}
                          defaultValue={guest.meal?.choice}
                        />
                      </DataTableCell>
                      <DataTableCell >
                        <TextField
                          label='Optional'
                          value={guest.meal?.specialNotes ?? ''}
                          name='specialNotes'
                          onChange={(evt) => handleMealChange(evt, index)}
                        />
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </DataTableBody>
              </DataTableContent>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReceptionForm