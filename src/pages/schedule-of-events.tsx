import React from 'react';
import { PageProps } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import { Grid, GridCell } from '@rmwc/grid';
import { Typography } from '@rmwc/typography';
import { Card, CardActionButtons, CardActionIcon } from '@rmwc/card';
import { CollapsibleList, ListDivider, SimpleListItem } from '@rmwc/list';
import { SaveTheDate } from '../components/save-the-date';
import { cheaterMargin } from '.';
import { Tooltip } from '@rmwc/tooltip';
import '@rmwc/tooltip/styles';
import '@rmwc/card/styles';
import '@rmwc/list/styles';
import { ButtonLink } from '../components/button-link';

interface IEventItem {
    name: string;
    time: string;
    location: ILocation;
    saveTheDate?: string;
    notes: string[];
}
interface ILocation {
    name: string;
    city: string;
    state: string;
    googleLink: string;
}
interface IEventSchedule {
    date: string;
    events: IEventItem[];
}
const eventSchedule: IEventSchedule[] = [
    {
        date: 'Friday, July 16, 2021',
        events: [{
            name: 'Welcome Party',
            time: 'Friday, July 16, 2021',
            location: {
                name: 'Lake Edge Park',
                city: 'Madison',
                state: 'Wisconsin',
                googleLink: 'https://maps.app.goo.gl/TbCnXVBXjLxqvSdaA',
            },
            notes: [
                'Please consider bringing a lawn chair for yourself, if you\'d like to sit.'
            ]
        }],
    },
    {
        date: 'Saturday, July 17, 2021',
        events: [{
            name: 'Wedding Ceremony',
            time: 'Saturday, July 17, 2021 2:30 PM',
            saveTheDate: 'https://add.eventable.com/events/5fc2b5bab155ab00c1211cb2/603425c82556a31a8ea7beeb',
            location: {
                name: 'Monona Terrace Rooftop',
                city: 'Madison',
                state: 'Wisconsin',
                googleLink: 'https://www.google.com/maps/place/Monona+Terrace+Community+and+Convention+Center/@43.0716832,-89.3801502,15z/data=!4m2!3m1!1s0x0:0xec3bcab772dbe6dd?sa=X&ved=2ahUKEwipq_aJn-ruAhUMbs0KHXNvACMQ_BIwFHoECCUQBQ',
            },
            notes: [],
        },
        {
            name: 'Reception',
            time: 'Saturday, July 17, 2021 4:00PM-11:00PM',
            saveTheDate: 'https://add.eventable.com/events/5fc2b5bab155ab00c1211cb2/6034270074214e1b109a84d3/',
            location: {
                name: 'Badger Farms',
                city: 'Deerfield',
                state: 'Wisconsin',
                googleLink: 'https://www.google.com/maps/place/Badger+Farms+LLC/@43.0770101,-89.1360056,15z/data=!4m2!3m1!1s0x0:0x2a1610e4286eb316?sa=X&ved=2ahUKEwizypn0nuruAhXaG80KHbMTA_IQ_BIwDXoECBgQBQ',
            },
            notes: [
                'Guests are welcome to bring lawn chairs to allow for them to feel comfortable, in regards to social distancing.'
            ]
        }]
    }
];

const ScheduleOfEventsPage: React.FC<PageProps> = () => {
    return (
        <Layout>
            <SEO title='Schedule of Events' />
            <Grid>
                <GridCell span={12}>
                    <Typography use='headline4'>
                        Schedule of Events
                    </Typography>
                </GridCell>
                <GridCell span={12}>
                    <Typography use='body1'>
                        All wedding activities will be held outdoors, in accordance with current COVID-19 guidelines.
                    </Typography>
                    <br />
                    <Typography use='body1'>
                        Information on room blocks will be shared in May.
                    </Typography>
                </GridCell>
                <GridCell span={12}>
                    {eventSchedule.map((s, i) => (
                        <Card key={s.date} style={i !== eventSchedule.length - 1 && { marginBottom: '1.5rem' } || {}}>
                            <Typography use='headline5' style={{ padding: '1rem 1rem 0 1rem' }}>{s.date}</Typography>
                            <ListDivider />
                            {s.events.map(e => (
                                <>
                                    <div key={e.name} style={{ padding: '1rem' }}>
                                        <Typography use='headline6'>
                                            {e.name}
                                        </Typography>
                                        <br />
                                        <Typography use='body1'>
                                            {`${e.location.name} ${e.location.city}, ${e.location.state}`}
                                        </Typography>
                                        {e.notes.length > 0 && (
                                            <CollapsibleList handle={<SimpleListItem text='Additonal Event Info' metaIcon='chevron_right'/>}>
                                                {e.notes.map(e => <SimpleListItem key={e} text={e} />)}
                                            </CollapsibleList>
                                        )}
                                        <CardActionButtons>
                                            <CardActionIcon title="See on Google Maps" icon='place' href={e.location.googleLink} tag='a' target='_blank' />
                                            <CardActionIcon title={e.saveTheDate ? "Save to your calendar" : 'Check back soon for a final date'} icon='calendar_today' tag='a' target='_blank' { ...(e.saveTheDate ? { href: e.saveTheDate } : {}) } />
                                        </CardActionButtons>
                                    </div>
                                    <ListDivider />
                                </>
                            ))}
                        </Card>
                    ))}
                </GridCell>
                <GridCell span={12}>
                    <SaveTheDate style={cheaterMargin} />
                    <ButtonLink 
                        buttonHref='/'
                        buttonText='Go Back'
                        raised
                        outline
                    />
                </GridCell>
            </Grid>
        </Layout>
    )
}

export default ScheduleOfEventsPage;