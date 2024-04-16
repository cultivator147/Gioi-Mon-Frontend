import { UserSlice } from "../../../redux-toolkit/slice/userSlice";
import {
    Button,
    createStyles,
    Divider,
    Flex,
    PasswordInput,
    Text,
    TextInput,
  } from '@mantine/core';
import { useForm } from '@mantine/form';
import Background from "../../components/Background/Background";
import LoginLayout from "../../components/Layout/LoginLayout";
import { useEffect, useRef, useState } from "react";
import { Logger } from "../../../utils/helper";
import MyPassInput from "../../components/custom/MyPassInput/MyPassInput";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { useNavigate } from "react-router-dom";
import Social from "../../components/Social/Social";
export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { actions } = UserSlice();
  const { classes } = useStyles();
  const userNameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
    
  const [errName, setErrName] = useState(true);
  const [errPass, setErrPass] = useState(true);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: value => {
        if (value.length === 0) {
          if (userNameRef.current !== null) {
            userNameRef.current.focus();
            setErrName(false);
          }
          Logger('LoginPage.error.Please fill in this field');
          return null;
        }
      },
      password: value => {
        if (value.length === 0) {
          setErrPass(false);
          Logger('LoginPage.error.Please fill in this field');
            return null;
        }
        if (value.length >= 1 && value.length < 8) {
          setErrPass(false);
          Logger('LoginPage.password.At least 8 characters');
        }
        return null;
      },
      confirmPassword: (value, values) => {
        if (value.length === 0) {
            Logger('LoginPage.error.Please fill in this field');
            return null;
        } else if (value.length >= 1 && value !== values.password) {
            Logger('LoginPage.password.Password incorrect');
            return null;
        } else {
          return null;
        }
      },
    },
  });
  const user = useSelector(getUserSelector);

  useEffect(() => {
    console.log(user.register.error);
    if (user.register.error === -1) {
      return;
    } else if (user.register.error === 10) {
      setErrName(false);
    } else if (user.register.error === 0) {
      setErrName(false);
    } else {
      setErrName(true);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.register]);
  const handleRegisterUser = () => {
    dispatch(
      actions.requestRegister({
        username: form.values.username,
        password: form.values.password,
      }),
    );
  };
  const handleClearSpace = (e: any) => {
    if (/[ `!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleOnFocusInput = () => {
    setErrName(true);
    setErrPass(true);
    form.setErrors({ password: '' });
  };
  const handleOnInput = () => {
    setErrPass(true);
  };

  return (
    <Background>
      <LoginLayout islogin={false}>
        <form
          className={classes.form}
          onSubmit={form.onSubmit(handleRegisterUser)}
        >
          <TextInput
            maxLength={16}
            name="username"
            label={'Tên tài khoản'}
            placeholder={'Nhập tên tài khoản của bạn'}
            error={form.errors.username}
            ref={userNameRef}
            {...form.getInputProps('username')}
            onKeyDown={e => {
              handleClearSpace(e);
            }}
            onFocus={() => {
              setErrPass(true);
              setErrName(true);
              form.setErrors({ username: '' });
            }}
            onInput={() => {
              setErrName(true);
            }}
          
          />
          {errName && (
            <Text className={classes.error}>
              {
                'Chỉ chứa các chữ cái và số viết thường'
              }
            </Text>
          )}

          <MyPassInput
            form={form}
            name="password"
            label="Mật khẩu"
            placeholder="Mật khẩu"
            handleKeyDown={handleClearSpace}
            handleFocus={handleOnFocusInput}
            handleInput={handleOnInput}
          />
          {errPass && (
            <Text className={classes.error}>
              {'Ít nhất 8 ký tự'}
            </Text>
          )}
          <MyPassInput
            form={form}
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            placeholder="Xác nhận mật khẩu"
            handleKeyDown={handleClearSpace}
          />

          {/* <Flex align="center">
            <Text className={classes.rules}>
              {'LoginPage.text.By clicking'}{' '}
              <span style={{ cursor: 'default' }}>
                {'LoginPage.button.Sign up'}
              </span>{' '}
              {'LoginPage.text.you agree with'}{' '}
              <span>{'Terms of Service'}</span>{' '}
              {'LoginPage.text.and'}{' '}
              <span>{'Privacy Policy'}</span>{' '}
              {'LoginPage.text.of GoDoo'}
            </Text>
          </Flex> */}

          <Flex justify="center">
            <Button
              type="submit"
              variant="gradient"
              className={classes.registerBtn}
            >
              {'Đăng ký'}
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
            // [`@media (min-width:768px) and (max-width:991px)`]: {
            //   marginTop: '18px',
            // },
            // [`@media (min-width:576px) and (max-width:767px)`]: {
            //   marginTop: '14px ',
            // },
            [`@media (max-width:575px)`]: {
              marginTop: '18px',
            },
          }}
          // label={'LoginPage'}
          labelPosition="center"
        />
        <Social />
      </LoginLayout>
    </Background>
  );
};
const useStyles = createStyles(() => ({
    container: {
      maxWidth: '100vw',
      height: '100vh',
    },
    wrapper: {
      alignItems: 'center',
      width: '50%',
      maxWidth: '720px',
      height: '915px',
      margin: '42px auto  0',
      padding: '25px 75px 35px',
      border: '2px solid #000',
      borderRadius: '20px',
    },
    logo: {
      width: '150px',
      height: '150px',
    },
    form: {
      width: '100%',
    },
    input: {
      marginTop: '16px',
    },
    error: {
      fontSize: '12px',
      lineHeight: 1.2,
      display: 'block',
      color: 'var(--grey-dark)',
      marginTop: '4px',
    },
    rules: {
      margin: '6px 0 0 0',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '20px',
      '& span': {
        fontWeight: 600,
        cursor: 'pointer',
      },
      [`@media (max-width:575px)`]: {
        margin: '10px 0 0 0',
        fontSize: '12px',
      },
    },
    registerBtn: {
      width: '269px',
      height: '52px',
      fontSize: '18px',
      fontWeight: 500,
      marginTop: '42px',
      padding: '16px 19px 16px 19px',
      [`@media (min-width:768px) and (max-width:991px)`]: {
        marginTop: '42px',
      },
      [`@media (min-width:576px) and (max-width:767px)`]: {
        marginTop: '42px',
      },
      [`@media (max-width:575px)`]: {
        width: '200px',
        height: '45px',
        fontSize: '20px',
        marginTop: '26px',
      },
    },
  }));

