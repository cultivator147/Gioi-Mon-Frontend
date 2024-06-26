import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, SimpleGrid, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

import { CreateProfileStyles } from '../../../components/Layout/CreateProfile/CreateProfileStyles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { images } from '../../../../assets/images';
import { UserSlice } from '../../../../redux-toolkit/slice/userSlice';
import { getProfileSelector, getUserSelector } from '../../../../redux-toolkit/slice/userSlice/selector';
import { ProfileLayout } from '../../../components/Layout/CreateProfile/CreateProfile';
import { CounterSlice } from '../../../../redux-toolkit/slice/counterSlice';


const GENDER = [
  {
    id: 0,
    text: 'Women',
    color: '#FFA800',
    background: '#FFEBC4',
  },
  {
    id: 1,
    text: 'Men',
    color: '#36CA68',
    background: '#DBFFDA',
  },
  {
    id: 2,
    text: 'Transgender',
    color: '#25B7EF',
    background: '#D0F2FF',
  },
  {
    id: 3,
    text: 'Asexual',
    color: '#820080',
    background: '#FFE3FF',
  },
  {
    id: 4,
    text: 'Nonbinary',
    color: '#C03AFF',
    background: '#EEE1FF',
  },
  {
    id: 5,
    text: 'Bisexual',
    color: '#0038A8',
    background: '#D6E3FF',
  },
  {
    id: 6,
    text: 'Gay',
    color: '#8D5959',
    background: '#EDE0E0',
  },
  {
    id: 7,
    text: 'Lesbian',
    color: '#EF7627',
    background: '#FFE5D3',
  },
  // {
  //   id: 8,
  //   text: 'Others',
  //   color: '#000000',
  //   background:
  //     'linear-gradient(81.84deg,#0099ff -9.4%,#a033ff 51.57%,#ff5280 84.07%,#ff7061 90.59%)',
  // },
];
export default function Gender() {
  const dispatch = useDispatch();
  const { counterActions } = CounterSlice();
  const { actions } = UserSlice();
  const profile = useSelector(getProfileSelector);
  const user = useSelector(getUserSelector);

  // Local
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { classes } = CreateProfileStyles();
  const [sex, setSex] = useState<string[]>(profile.gender || []);
  const [disableBtn, setDisabel] = useState(true);

  const handleCreateGender = () => {
    dispatch(counterActions.increase());
    dispatch(
      actions.updateProfile({
        id: user.id,
        token: user.token,
        navigate: '/home',
        profile: {
          nickname: profile.nickname,
          avatar: profile.avatar,
          date_of_birth: profile.date_of_birth,
          zodiac: profile.zodiac,
          gender: sex,
          introduction: profile.introduction,
          relationship: profile.relationship,
        },
      }),
    );
  };
  useEffect(() => {
    if (sex?.length > 2) {
      setDisabel(true);
    } else {
      setDisabel(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sex]);
  return (
    <ProfileLayout>
      <Box style={{ height: 476 }} className={classes.children}>
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            height: 335,
            [`@media (min-width:768px) and (max-width:991px)`]: {
              height: 236,
            },
            [`@media (min-width:576px) and (max-width:767px)`]: {
              height: 236,
            },
            [`@media (max-width:575px)`]: {
              height: 260,
            },
            [`@media (max-width:376px)`]: {
              height: 236,
            },
          }}
        >
          <img
            src={images.genderPro}
            className={classes.imgGender}
            alt="gender"
          />
        </Box>
        <Box
          sx={{
            [`@media (min-width:768px) and (max-width:991px)`]: {
              height: '70%',
            },
            [`@media (min-width:576px) and (max-width:767px)`]: {
              height: '70%',
            },
            [`@media (max-width:575px)`]: {
              height: '70%',
            },
          }}
          className={classes.box}
        >
          <Text className={classes.titleChild}>
            {t('Genders')}
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {t('Pick maximum 2 genders')}
          </Text>
          <SimpleGrid
            cols={2}
            sx={{
              gap: '8.5px 25px',
              marginTop: 28,
              justifyItems: 'stretch',
              [`@media (max-width:376px)`]: {
                marginTop: 14,
                gap: '10px 16px',
              },
            }}
          >
            {GENDER.map((gender, index) => {
              return (
                <Button
                  key={index}
                  className={
                    profile?.gender?.includes(gender.text) ? 'active' : ''
                  }
                  sx={{
                    height: 52,
                    width: 'calc(200% + 25px) !important',
                    maxWidth:
                      gender.text === 'Others' ? 'calc(200% + 25px)' : '100%',
                    color: gender.color,
                    backgroundColor: 'inherit',
                    borderRadius: 200,
                    border: `1px solid #FFFFFF`,

                    '&::before': {
                      display: 'none',
                      borderRadius: 200,
                      backgroundColor: 'inherit',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.active': {
                      color: gender.color,
                      backgroundImage: 'none',
                      backgroundColor: gender.background,
                      border: `1px solid ${gender.color}`,
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    },
                    '&.active::before': {
                      backgroundColor: '#FFFFFF)',
                    },
                    [`@media (max-width:376px)`]: {
                      height: 42,
                    },
                  }}
                  onClick={(e: any) => {
                    if (gender.id === index) {
                      let boolean = sex?.find(value => {
                        return value === gender.text;
                      });
                      if (boolean) {
                        e.currentTarget.classList.remove('active');
                        setSex(
                          sex.filter(value => {
                            return value !== boolean;
                          }),
                        );
                      } else {
                        e.currentTarget.classList.add('active');
                        setSex([...sex, gender.text]);
                      }
                    }
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      lineHeight: '30px',
                      background:
                        gender.text === 'Others'
                          ? 'linear-gradient(90deg, #E46125 -0.01%, #C91A44 50%, #A12FA3 100%)'
                          : 'inherit',
                      WebkitBackgroundClip:
                        gender.text === 'Others' ? 'text' : 'inherit',
                      color:
                        gender.text === 'Others' ? 'transparent' : gender.color,
                    }}
                  >
                    {t(`${gender.text}`)}
                  </Text>
                </Button>
              );
            })}
          </SimpleGrid>
          <Checkbox
            defaultChecked={true}
            sx={{
              position: 'absolute',
              bottom: '5%',
              left: 16,
              zIndex: 2,
              [`@media (max-width:575px)`]: {
                bottom: '10%',
              },
            }}
            styles={{
              label: {
                fontSize: 16,
                fontWeight: 500,
                lineHeight: '20px',
                paddingLeft: 2,
              },
            }}
            color="orange.7"
            label={t('Show on my profile')}
          />
          <Button
            disabled={disableBtn}
            onClick={() => handleCreateGender()}
            variant="gradient"
            className={classes.nextBtn}
          >
            <IconChevronRight width={40} height={40} stroke={2.5} />
          </Button>
        </Box>
      </Box>
    </ProfileLayout>
  );
}
