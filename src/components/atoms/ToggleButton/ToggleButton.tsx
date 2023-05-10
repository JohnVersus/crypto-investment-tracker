import React from "react";
import Button from "~/components/atoms/Button";
import type { ButtonProps } from "../Button/Button";
import styled from "styled-components";
import { space, fontSize, color } from "styled-system";
import type { SpaceProps, FontSizeProps, ColorProps } from "styled-system";
import { Plus, X } from "react-feather";
import { theme } from "~/components/Theme";

type ToggleButtonProps = {
  onClick: () => void;
} & ButtonProps &
  SpaceProps &
  FontSizeProps &
  ColorProps;

const StyledButton = styled(Button)<SpaceProps & FontSizeProps>`
  border-radius: 50%;
  padding: 0.5rem;

  ${space}
  ${fontSize}
  ${color}
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick, ...rest }) => {
  const [isHidden, setIsHidden] = React.useState(false);

  const handleClick = () => {
    setIsHidden(!isHidden);
    onClick();
  };
  const { primary, secondary } = theme.colors;
  return (
    <StyledButton
      onClick={handleClick}
      {...rest}
      marginTop={0}
      marginBottom={0}
      backgroundColor={secondary}
      color={primary}
      minHeight={["2rem", "2rem", "2rem", "2rem", "2rem", "4rem"]}
      maxHeight={["2rem", "2rem", "2rem", "2rem", "2rem", "4rem"]}
      minWidth={["2rem", "2rem", "2rem", "2rem", "2rem", "4rem"]}
      maxWidth={["2rem", "2rem", "2rem", "2rem", "2rem", "4rem"]}
      padding={1}
      aria-label={"Toggle Form"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {isHidden ? (
        <Plus width={"100%"} color={"white"} min-width="24" min-height="24" />
      ) : (
        <X width={"100%"} color={"white"} min-width="24" min-height="24" />
      )}
    </StyledButton>
  );
};

export default ToggleButton;
