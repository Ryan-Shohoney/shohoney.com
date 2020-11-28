import React, { AllHTMLAttributes } from 'react';
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
            tag='a'
            target='_blank'
            href='https://add.eventable.com/events/5fc2b5bab155ab00c1211cb2/5fc2b5bcc50049147f3cc7d8'>
                Save the Date
        </Button>
    )
};