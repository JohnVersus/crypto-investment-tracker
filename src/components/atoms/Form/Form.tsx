import React from "react";
import type { FormEvent } from "react";
import styled from "styled-components";
import { space, layout, border } from "styled-system";
import type { SpaceProps, LayoutProps, BorderProps } from "styled-system";

type FormProps = SpaceProps &
  LayoutProps &
  BorderProps & {
    children: React.ReactNode;
    onSubmit: (event: FormEvent) => void;
  };

const StyledForm = styled.form<FormProps>`
  ${space}
  ${layout}
  ${border}
`;

const Form: React.FC<FormProps> = ({ children, onSubmit, ...props }) => {
  return (
    <StyledForm onSubmit={onSubmit} {...props}>
      {children}
    </StyledForm>
  );
};

export default Form;
