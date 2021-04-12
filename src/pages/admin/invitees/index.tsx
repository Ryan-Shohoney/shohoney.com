import React, { useEffect, useState } from "react";
import { Grid, GridCell } from '@rmwc/grid';
import '@rmwc/grid/styles';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { DataTable, DataTableContent, DataTableHead, DataTableRow, DataTableHeadCell, DataTableCell, DataTableBody } from '@rmwc/data-table';
import '@rmwc/data-table/styles';
import { CircularProgress } from '@rmwc/circular-progress';
import '@rmwc/circular-progress/styles';
import { RouteComponentProps } from "@reach/router";
import { get } from "../../../services/admin/guests";
import { CollapsibleList, SimpleListItem } from '@rmwc/list';
import '@rmwc/list/styles';

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

interface IDisplayCell {
  displayValue: string;
}

const householdTableDefinition: { [key: string]: IDisplayCell } = {
  name: {
    displayValue: 'Household Name',
  },
  rsvp: {
    displayValue: 'RSVP Response',
  }
}

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
  return (
    <Grid>
      <GridCell span={12}>
        <Typography use="headline1">
          Parties
        </Typography>
      </GridCell>
      <GridCell span={12}>
        {progress ? <CircularProgress size='xlarge' theme='secondary' /> : (
          <DataTable>
            <DataTableContent>
              <DataTableHead>
                <DataTableRow>
                  {Object.entries(householdTableDefinition).map(e => (
                    <DataTableHeadCell key={e[0]}>{e[1].displayValue}</DataTableHeadCell>
                  ))}
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                {data.map(d => (
                  <CollapsibleList
                    handle={
                      <DataTableRow key={d.name}>
                        {Object.keys(householdTableDefinition).map(def => (
                          <DataTableCell key={def}>{d[def]}</DataTableCell>
                        ))}
                      </DataTableRow>
                    }
                  >
                    {d.guests.map(g => (<SimpleListItem key={`${g.firstName} ${g.lastName}`} text={`${g.firstName} ${g.lastName}`} />))}
                  </CollapsibleList>
                ))}
              </DataTableBody>
            </DataTableContent>
          </DataTable>
        )}

      </GridCell>
    </Grid>
  );
};

export default InviteesPage;