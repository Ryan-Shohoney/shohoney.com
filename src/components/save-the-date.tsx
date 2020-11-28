import React, { AllHTMLAttributes } from 'react';
import { Link } from 'gatsby';
import { Button, ButtonProps } from '@rmwc/button';
import '@rmwc/button/styles';



export const SaveTheDate: React.FC<AllHTMLAttributes<ButtonProps>> = (props) => {
    return (
        <Button 
            icon="calendar_today"
            style={props.style}
            raised
            outlined
            theme={['secondaryBg', 'onSecondary']}
            tag={Link} 
            to='https://calendar.google.com/event?action=TEMPLATE&tmeid=M3A3aTYxZTY4OWdpM2Fkc2EyaWkza3RtcHYgc2hvaG9uZXl3ZWRkaW5nQG0&tmsrc=shohoneywedding%40gmail.com'>
                Save the Date
        </Button>
    )
};