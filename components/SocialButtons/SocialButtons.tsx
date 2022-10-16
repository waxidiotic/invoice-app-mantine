import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { TwitterIcon } from '@mantine/ds';

import { GoogleIcon } from './GoogleIcon';

export function GoogleButton(props: ButtonProps) {
  return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}

export function TwitterButton(props: ButtonProps & React.ComponentPropsWithRef<'a'>) {
  return (
    <Button
      component="a"
      leftIcon={<TwitterIcon size={16} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  );
}
