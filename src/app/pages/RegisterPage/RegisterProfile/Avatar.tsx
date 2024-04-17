import { Box, Flex, Stack, Button, Text, Card, BackgroundImage } from "@mantine/core";
import { t } from "i18next";
import { ProfileLayout } from "../../../components/Layout/CreateProfile/CreateProfile";
import { CreateProfileStyles } from "../../../components/Layout/CreateProfile/CreateProfileStyles";
import UpLoad from "./UpLoad";
import { useState } from "react";
import { ReactComponent as Clear } from '../../../../assets/icons/clear.svg';
import { ReactComponent as Blink } from '../../../../assets/icons/blink.svg';
import { IconPlus } from '@tabler/icons';
import { uploadImage } from "../../../../utils/imageUploader";
import { IconChevronRight } from "@tabler/icons";

export default function Avatar() {
  const { classes } = CreateProfileStyles();
  const [img, setImg] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const [files, setFiles] = useState<FileList>();
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [disableAddImage, setDisableAddImage] = useState(false);
  const handleUpdapteImage = () => {
    console.log('updating img...');
  }
  const handleUploadImage = async (e: any) => {
    if (!e.target.files) return;
    setFiles(e.target.files);
    const uri: string = await uploadImage(e.target.files[0]);
    console.log('uri ', uri);
    if (uri) {
      setFileUrls([...fileUrls, uri]);
      setImg(uri);
      setDisableBtn(false);
      setDisableAddImage(true);
    } else {
      console.log('no file uploaded...');
    }
  }
  return (
    <ProfileLayout>
      <Box className={classes.children}>
        <Box
          sx={{
            height: "93%",
            [`@media (max-width:575px)`]: {
              height: "90%",
            },
          }}
          className={classes.box}
        >
          <Text className={classes.titleChild}>{"Avatar"}</Text>
          <Text mb={24} className={classes.text}>
            {"Upload avatar so people can get to know you"}
          </Text>
          <Box
            sx={{
              position: "relative",
              display: 'flex',
              justifyContent: 'center',
              justifyItems: 'center',
              alignItems: 'center',
              width: "100%",
              height: "75%",
              [`@media (min-width:768px) and (max-width:991px)`]: {
                height: "58%",
              },
              [`@media (min-width:576px) and (max-width:767px)`]: {
                height: "61%",
              },

              [`@media (max-width:575px)`]: { height: "max-content" },
              // [`@media (max-width:375px)`]: {},
            }}
          >
            <Flex
              sx={{
                width: "100%",
                height: "90%",
                justifyContent: "center",
                [`@media (max-width:575px)`]: {
                  height: 225,
                },
              }}
            >
              <Box
                sx={{
                  width: "85%",
                  height: "85%",
                  aspectRatio: "1 / 1",
                  position: "relative",
                  zIndex: 99,
                }}
              >
                <Card
                  sx={{
                    [`@media (max-width:575px)`]: {
                      height: '100%',
                      width: '100%',
                    },
                  }}
                  className={classes.picCard}
                >
                  <button
                    className={classes.clearBtn}
                    onClick={() => {
                      setFileUrls([]);
                      setImg("");
                      setDisableBtn(true);
                      setDisableAddImage(false);
                    }}
                  >
                    <Clear width={20} height={20} />
                  </button>
                  <BackgroundImage
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                    }}
                    src={img}
                  >

                  </BackgroundImage>
                  <Box
                    sx={{
                      width: '35%',
                      height: '35%',
                      position: 'absolute',
                      top: '20%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 2,
                    }}
                  >
                    <label
                      htmlFor={"avt_file"}
                      style={{ height: 56 }}
                      className={classes.label}
                    >
                      <Button
                        styles={{
                          leftIcon: {
                            margin: 0,
                          },
                          root: {
                            fontSize: '1.5rem',
                            [`@media (min-width:768px) and (max-width:991px)`]: {
                              fontSize: '1rem',
                            },
                          },
                        }}
                        component="span"
                        hidden={disableAddImage}
                        leftIcon={
                          <IconPlus
                            width={29}
                            height={29}
                          />
                        }
                        sx={{
                          height: '100%',
                          color: '#FFFFFF',
                          padding: 16,
                          backgroundColor: '#E46125',
                          borderRadius: 32,
                          fontWeight: 400,
                          lineHeight: '18px',
                          '&::before': {
                            display: 'none',
                          },
                          '&:hover': {
                            transition: '0.5s',
                            backgroundColor: '#E46125 !important',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                          },
                          '&[data-disabled]': {
                            cursor: 'default',
                            color: '#FFFFFF !important',
                            backgroundColor: '#E46125',
                          },
                          [`@media (max-width:575px)`]: {
                            width: '100%',
                            height: '100%',
                          },
                        }}
                      >
                        {"Thêm ảnh"}
                      </Button>
                      <input
                        id={"avt_file"}
                        type='file'
                        accept="image/*"
                        draggable={true}
                        capture
                        className={classes.upImg}
                        onChange={handleUploadImage}
                      />
                    </label>

                  </Box>
                </Card>
              </Box>
            </Flex>
            <Flex
              sx={{
                height: "30%",
                gap: "5%",
                marginTop: 25,
                justifyContent: "space-between",
                // [`@media (min-width:768px) and (max-width:991px)`]: {
                //   height: '30%',
                // },
                [`@media (max-width:575px)`]: {
                  gap: 0,
                  height: 106,
                  marginTop: 17,
                  marginBottom: 20,
                },
              }}
            >
            </Flex>
          </Box>
          <Text
            sx={{
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "20px",
              color: "#929292",
              marginTop: 12,
              paddingRight: "25%",
              [`@media (min-width:768px) and (max-width:991px)`]: {
                paddingRight: 0,
              },
              [`@media (max-width:575px)`]: {
                paddingRight: 100,
              },
            }}
          >
            {"Upload at least one photo. Hold & drag photos to change the order"}
          </Text>
          <Button
            style={{ zIndex: 4 }}
            disabled={disableBtn}
            variant="gradient"
            className={classes.nextBtn}
            onClick={handleUpdapteImage}
          >
            <IconChevronRight width={40} height={40} stroke={2.5} />
          </Button>
        </Box>
      </Box>

    </ProfileLayout>
  );
};
