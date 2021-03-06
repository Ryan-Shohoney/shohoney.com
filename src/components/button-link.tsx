import React, { AllHTMLAttributes } from "react";
import { Link } from "gatsby";
import { Button } from "@rmwc/button";
import { ThemeOptionT } from '@rmwc/types';
import "@rmwc/button/styles";

interface ButtonProps extends AllHTMLAttributes<ButtonProps> {
  buttonText: string;
  buttonHref: string;
  switchToSecondary?: boolean;
  switchToSecondaryBg?: boolean;
  outline: boolean;
  raised: boolean;
}

export const ButtonLink: React.FC<ButtonProps> = (props) => {
  const theme: ThemeOptionT[] = [];
  if (props.switchToSecondary) theme.push("onSecondary" as ThemeOptionT);
  if (props.switchToSecondaryBg) theme.push("secondaryBg" as ThemeOptionT);
  return <Button
    outlined={props.outline}
    raised={props.raised}
    theme={[...theme]}
    tag={Link}
    to={props.buttonHref}
    style={props.style}
  >
    {props.buttonText}
  </Button>;
};
