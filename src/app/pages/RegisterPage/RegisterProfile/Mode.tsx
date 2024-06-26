import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Text } from '@mantine/core';
import { CreateProfileStyles } from '../../../components/Layout/CreateProfile/CreateProfileStyles';
import { IconCheck } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { images } from '../../../../assets/images';
import { UserSlice } from '../../../../redux-toolkit/slice/userSlice';
import { getProfileSelector, getUserSelector } from '../../../../redux-toolkit/slice/userSlice/selector';
import { ProfileLayout } from '../../../components/Layout/CreateProfile/CreateProfile';

export default function Mode() {
  // Global
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = UserSlice();
  const profile = useSelector(getProfileSelector);
  const user = useSelector(getUserSelector);

  const { t } = useTranslation();
  const { classes } = CreateProfileStyles();
  const [mode, setMode] = useState(profile.relationship);
  const [disableBtn, setDisableBtn] = useState(true);

  const handleSelectMode = () => {
    dispatch(
      actions.requestProfile({
        id: user.id,
        isLogin: true,
        token: user.token,
        profile: {
          nickname: profile.nickname,
          avatar: profile.avatar,
          date_of_birth: profile.date_of_birth,
          zodiac: profile.zodiac,
          gender: profile.gender,
          relationship: mode,
          introduction: profile.introduction,
        },
      }),
    );
  };
  useEffect(() => {
    if (!user.isLogin) {
      return;
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLogin]);
  useEffect(() => {
    if (mode !== -1) {
      setDisableBtn(false);
    }
  }, [mode]);
  return (
    <ProfileLayout>
      <Box className={classes.children}>
        <img className={classes.imgMode} src={images.modePro} alt="mode" />
        <Box className={classes.box}>
          <Text className={classes.titleChild}>
            {t('Profile.text.What’re you looking for in GoDoo?')}
          </Text>
          <Stack align="center" mt={14}>
            <Button
              style={{
                background:
                  'linear-gradient(90deg, #E46125 -0.01%, #C91A44 100%)',
              }}
              variant={mode === 0 ? 'gradient' : 'outline'}
              className={classes.optionBtn}
              onClick={() => setMode(0)}
            >
              <Text
                style={{
                  background: 'linear-gradient(90deg, #E46125 -0.01%, #C91A44 50%, #A12FA3 100%)',
                  WebkitBackgroundClip: 'text',
                  color: mode === 0 ? '#FFFFFF' : 'transparent',
                }}
              >
                {t('Profile.text.Friends')}
              </Text>
            </Button>
            <Button
              style={{
                background:
                  'linear-gradient(90deg, #C91A44 -0.01%, #A12FA3 100%)',
              }}
              variant={mode === 1 ? 'default' : 'filled'}
              className={classes.optionBtn}
              onClick={() => setMode(1)}
            >
              {t('Profile.text.Looking for my destiny')}
            </Button>
          </Stack>
          <Button
            disabled={disableBtn}
            onClick={() => handleSelectMode()}
            variant="gradient"
            className={classes.nextBtn}
          >
            <IconCheck width={40} height={40} stroke={2.5} />
          </Button>
        </Box>
      </Box>
    </ProfileLayout>
  );
}
