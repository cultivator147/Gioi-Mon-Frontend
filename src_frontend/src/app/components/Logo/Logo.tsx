import { Avatar, createStyles, Flex } from "@mantine/core";
import { images } from "../../../assets/images";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
  isLang?: boolean;
}
function Logo({ className, isLang }: Props) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Flex
      sx={{
        position: "relative",
        width: "100%",
        justifyContent: "center",
        [`@media (max-width:575px)`]: {
          // position: 'static',
        },
      }}
      className={className}
    >
      <Avatar
        onClick={() => {
          navigate("/auth");
        }}
        className={classes.logo}
        color="lime"
        src={images.logo}
      />
    </Flex>
  );
}

export default Logo;

const useStyles = createStyles(() => ({
  logo: {
    width: "500px",
    height: "150px",
    cursor: "pointer",
    [`@media (max-width:575px)`]: {
      width: "100px",
      height: "100px",
    },
  },
}));
