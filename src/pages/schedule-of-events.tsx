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
import { ButtonLink } from '../components/button-link';
import '@rmwc/tooltip/styles';
import '@rmwc/card/styles';
import '@rmwc/list/styles';

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
            time: 'TBD Evening',
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
            time: '2:30 PM',
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
            time: '4:00PM-11:00PM',
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
                                <React.Fragment key={e.name} >
                                    <div style={{ padding: '1rem' }}>
                                        <Typography use='headline6'>
                                            {e.name}
                                        </Typography>
                                        <br />
                                        <Typography use='body1'>
                                            {`${e.location.name} ${e.location.city}, ${e.location.state}`}
                                        </Typography>
                                        <br />
                                        <Typography use='body2'>
                                            {e.time}
                                        </Typography>
                                        {e.notes.length > 0 && (
                                            <div style={{padding: '1rem'}}>
                                                <Typography use='body1'>
                                                    Additional Event Info
                                                </Typography>
                                                <br />
                                                {e.notes.map((n, i) => (
                                                    <>
                                                        <Typography use='body2'>{n}</Typography>
                                                        {i !== e.notes.length - 1 && <br />}
                                                    </>
                                                ))}
                                            </div>
                                        )}
                                        <CardActionButtons>
                                            <CardActionIcon title="See on Google Maps" icon='place' href={e.location.googleLink} tag='a' target='_blank' />
                                            {e.saveTheDate  && <CardActionIcon title='Save to your calendar' icon='calendar_today' tag='a' target='_blank' href={e.saveTheDate} />}
                                        </CardActionButtons>

                                    </div>
                                    <ListDivider />
                                </React.Fragment>
                            ))}
                        </Card>
                    ))}
                </GridCell>
                <GridCell span={12}>
                    <SaveTheDate style={cheaterMargin} />
                    <ButtonLink 
                        style={cheaterMargin}
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