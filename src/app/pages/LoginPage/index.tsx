import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  clsx,
  createStyles,
  Divider,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconEyeOff, IconEye } from '@tabler/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@mantine/hooks';
import { UserSlice } from '../../../redux-toolkit/slice/userSlice';
import { Logger, handleClearSpecialCharacter } from '../../../utils/helper';
import LoginLayout from '../../components/Layout/LoginLayout';
import Background from '../../components/Background/Background';
import MyPassInput from '../../components/custom/MyPassInput/MyPassInput';
import { getProfileSelector, getUserSelector } from '../../../redux-toolkit/slice/userSlice/selector';
import Social from '../../components/Social/Social';

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actions } = UserSlice();
  const user = useSelector(getUserSelector);
  const profile = useSelector(getProfileSelector);

  const { classes } = useStyles();
  const [error, setError] = useState(false);
  const phone = useMediaQuery('(max-width: 575px)');

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      termsOfService: true,
    },
  });

  const handleSubmitSignIn = () => {
    if (!form.values.username || !form.values.password) {
      setError(true);
    } else {
      setError(false);
      dispatch(
        actions.requestLogin({
          username: form.values.username,
          password: form.values.password,
          login: { savePassword: form.values.termsOfService },
        }),
      );
      dispatch(actions.setDevice({ device: phone }));
    }
  };
  const handleClearSpace = (e: any) => {
    if (/[ `!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/g.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleConvertEng = (e:any) => {
    form.setValues({
      ...form.values,
      [e.target.name]:
        e.target.name === 'username'
          ? handleClearSpecialCharacter(e.target.value.toLowerCase())
          : handleClearSpecialCharacter(e.target.value),
    });
  };
  useEffect(() => {
    if (user.token !== '') {
        dispatch(
          actions.loginSuccess({
            id: user.id,
            token: user.token,
            isLogin: true,
            loading: false,
            username: form.values.username,
            login: { savePassword: form.values.termsOfService },
          }),
        );
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);
  useEffect(() => {
    if (!user.isLogin) {
      return;
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLogin]);

  return (
    <Background>
      <LoginLayout islogin={true}>
        <form
          className={classes.form}
          onSubmit={form.onSubmit(handleSubmitSignIn)}
        >
          <TextInput
            name="username"
            value={user.username}
            // defaultValue={user.username}
            label={'Tên đăng nhập'}
            placeholder={'Nhập tên đăng nhập'}
            {...form.getInputProps('username')}
            onKeyDown={e => {
              handleClearSpace(e);
            }}
            onKeyUp={e => {
              handleConvertEng(e);
            }}
          />
          <MyPassInput
            form={form}
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            handleKeyDown={handleClearSpace}
            handleKeyUp={handleConvertEng}
          />
          {error || user.login.error > 0 ? (
            <Text className={classes.error}>
              {'Username or password incorrect'}
            </Text>
          ) : (
            <></>
          )}

          <Flex
            justify="space-between"
            align="center"
            sx={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Flex align="center">
              <Checkbox
                checked={true}
                mt="md"
                color="orange.7"
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
              />
              <Text className={classes.save}>
                {'Nhớ thông tin đăng nhập'}
              </Text>
            </Flex>
            <Link to="/forgot">
              <Text className={clsx(classes.forgot, classes.save)}>
                {'Quên mật khẩu'}
              </Text>
            </Link>
          </Flex>

          <Flex justify="center">
            <Button
              type="submit"
              variant="gradient"
              className={classes.signinBtn}
            >
              {'Đăng nhập'}
            </Button>
          </Flex>
        </form>
        <Divider
          styles={{
            label: {
              fontSize: '18px',
              fontWeight: 600,
              '&::after': {
                width: '320px',
              },
              [`@media (max-width:575px)`]: {
                '&::after': {
                  width: '250px',
                },
              },
            },
          }}
          sx={{
            marginTop: '40px',
            [`@media (max-width:575px)`]: {
              marginTop: '18px',
            },
          }}
          // label={t('LoginPage.or')}
          labelPosition="center"
        />
        <Social />
      </LoginLayout>
    </Background>
  );
}

const useStyles = createStyles(() => ({
  form: {
    width: '100%',
  },
  input: {
    marginTop: '16px',
  },
  error: {
    color: 'var(--red)',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '15px',
    marginTop: '4px',
  },
  save: {
    color: 'var(--black)',
    margin: '10px 0 0 2px',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
  },
  signinBtn: {
    width: '269px',
    height: '52px',
    fontSize: '18px',
    fontWeight: 500,
    marginTop: '42px',
    padding: '16px 19px 16px 19px',

    [`@media (max-width:575px)`]: {
      width: '200px',
      height: '45px',
      fontSize: '20px',
      marginTop: '26px',
    },
  },
  forgot: { textDecoration: 'underline' },
}));
