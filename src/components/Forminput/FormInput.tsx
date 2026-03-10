import styled from "styled-components";
import { tokens } from "../../styles/tokens.ts";

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[800]};
  background: #ffffff;
  border: 1.5px solid ${tokens.colors.neutral[300]};
  border-radius: ${tokens.radius.md};
  transition:
    border-color ${tokens.transition.fast},
    box-shadow ${tokens.transition.fast};

  &::placeholder {
    color: ${tokens.colors.neutral[400]};
  }

  &:hover {
    border-color: ${tokens.colors.neutral[400]};
  }

  &:focus {
    border-color: ${tokens.colors.primary[500]};
    box-shadow: 0 0 0 3px ${tokens.colors.primary[100]};
    outline: none;
  }

  &[data-invalid="true"] {
    border-color: ${tokens.colors.danger[500]};
    box-shadow: 0 0 0 3px ${tokens.colors.danger[100]};
  }

  &:disabled {
    background: ${tokens.colors.neutral[50]};
    color: ${tokens.colors.neutral[400]};
    cursor: not-allowed;
  }
`;

const FormInput = (props: any) => {
  const { validation, invalid = "false", ...inputProps } = props;

  return <StyledInput {...inputProps} data-invalid={invalid} />;
};

export { FormInput };
