import styled from "styled-components";
import { tokens } from "../../styles/tokens.ts";

const CategoryPill = styled.span`
  display: inline-block;
  padding: 3px 10px;
  background: ${tokens.colors.neutral[100]};
  color: ${tokens.colors.neutral[600]};
  font-size: ${tokens.fontSize.xs};
  font-weight: ${tokens.fontWeight.medium};
  border-radius: ${tokens.radius.full};
  white-space: nowrap;
`;

type Props = {
  name: string;
};

const CategoryCard = ({ name }: Props) => {
  return <CategoryPill>{name}</CategoryPill>;
};

export { CategoryCard };
