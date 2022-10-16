import React, { useState } from 'react';
import {
  Alert,
  Anchor,
  Button,
  createStyles,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { upperFirst, useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { AuthError } from '@supabase/supabase-js';
import { IconAlertCircle } from '@tabler/icons';

import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';
import { supabase } from '../../utils/supabase';

const useStyles = createStyles((theme) => ({
  highlight: {
    fontWeight: 700,
    background:
      theme.colorScheme === 'dark'
        ? `-webkit-linear-gradient(${theme.colors.blue[1]}, ${theme.colors.blue[4]})`
        : `-webkit-linear-gradient(${theme.primaryColor}, ${theme.colors.blue[4]})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));

const Auth = () => {
  const { classes } = useStyles();
  const [type, toggle] = useToggle(['login', 'register']);
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState<AuthError | null>(null);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleLogin = async () => {
    setLoading(true);
    setErrorAlert(null);
    if (type === 'login') {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.values.email,
          password: form.values.password,
        });
        if (error) throw error;
      } catch (error: unknown) {
        setErrorAlert(error as AuthError);
      }
    } else if (type === 'register') {
      try {
        const { error } = await supabase.auth.signUp({
          email: form.values.email,
          password: form.values.password,
        });
        if (error) throw error;
      } catch (error: unknown) {
        setErrorAlert(error as AuthError);
      }
    }
    setLoading(false);
  };

  return (
    <div data-testid="Auth">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Welcome to <span className={classes.highlight}>Invoices</span>, {type} with
        </Text>

        <Group grow my="md">
          <GoogleButton radius="xl" disabled>
            Google
          </GoogleButton>
          <TwitterButton radius="xl" disabled>
            Twitter
          </TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(() => {
            handleLogin();
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@bussey.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
            />
          </Stack>

          {errorAlert && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Authentication issue"
              color="red"
              mt="xl"
            >
              {errorAlert.message}
            </Alert>
          )}

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" loading={loading}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

export default Auth;
