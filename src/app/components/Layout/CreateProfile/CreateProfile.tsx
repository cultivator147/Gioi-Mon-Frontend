import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Container, Flex } from '@mantine/core';

import { ReactComponent as BackBtn } from '../../../../assets/icons/backBtn.svg';
import { CreateProfileStyles } from './CreateProfileStyles';
import { getUserSelector } from '../../../../redux-toolkit/slice/userSlice/selector';
import Background from '../../Background/Background';
import { CounterSlice } from '../../../../redux-toolkit/slice/counterSlice';
import { getCounterSelector } from '../../../../redux-toolkit/slice/counterSlice/selector';

const STEPS = [
  'nickname',
  'picture',
  'birthday',
  'gender',
  'description',
  'mode',
];

export function ProfileLayout({ children }: any) {
  const { classes } = CreateProfileStyles();
  // Global
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { counterActions } = CounterSlice();
  const counter = useSelector(getCounterSelector);
  const user = useSelector(getUserSelector);

  const handleComeBack = () => {
    dispatch(counterActions.decrease());
  };
  useEffect(() => {
    console.log(counter);
    if (user.token !== '') {
      if (counter === 0) {
        navigate('/register/nickname');
      } else if (counter === 1) {
        navigate('/register/picture');
      } else if (counter === 2) {
        navigate('/register/birthday');
      } else if (counter === 3) {
        navigate('/register/gender');
      } else if (counter === 4) {
        navigate('/register/description');
      } else if (counter === 5) {
        navigate('/register/mode');
      }
    } else {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);
  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Background>
        <Container fluid className={classes.container}>
          <Card className={classes.wrapper}>
            {counter > 0 && (
              <button className={classes.back} onClick={handleComeBack}>
                <BackBtn />
              </button>
            )}
            <Box className={classes.card}>
              {children}
              <Flex className={classes.progress}>
                {STEPS.map((step, index) => {
                  return (
                    <Box
                      sx={{
                        backgroundColor:
                          index <= counter
                            ? 'var(--primary-4)'
                            : 'var(--white-light)',
                      }}
                      key={index}
                      className={classes.step}
                    ></Box>
                  );
                })}
              </Flex>
            </Box>
          </Card>
        </Container>
      </Background>
    </>
  );
}
