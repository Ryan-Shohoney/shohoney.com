import { Card } from "@rmwc/card";
import { Typography } from "@rmwc/typography";
import React from "react";
import { IFaq } from "../cosmic-data/faq";
import ReactMarkdown from 'react-markdown';

interface IOwnProps extends IFaq, React.HTMLAttributes<HTMLDivElement> {};

const FAQCard: React.FC<IOwnProps> = props => (
  <Card style={{ padding: '1rem'}} {...props}>
    <Typography use='headline6'>
      {props.question}
    </Typography>
    <Typography use='body1'>
      <ReactMarkdown linkTarget='_blank'>
        {props.answer}
      </ReactMarkdown>
    </Typography>
  </Card>
);
export default FAQCard;
export { FAQCard };