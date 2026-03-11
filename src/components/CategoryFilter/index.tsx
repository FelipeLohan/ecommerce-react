import { useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryDTO } from "../../models/category";
import * as categoryService from "../../services/category-service";
import { tokens } from "../../styles/tokens";

type Props = {
  selectedId: number;
  onChange: (id: number) => void;
};

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing[2]};
  padding: 0 5%;
`;

const Chip = styled.button<{ $active: boolean }>`
  padding: 6px ${tokens.spacing[4]};
  border-radius: ${tokens.radius.full};
  border: 1.5px solid ${({ $active }) =>
    $active ? tokens.colors.primary[500] : tokens.colors.neutral[300]};
  background: ${({ $active }) =>
    $active ? tokens.colors.primary[500] : "transparent"};
  color: ${({ $active }) =>
    $active ? tokens.colors.neutral[0] : tokens.colors.neutral[600]};
  font-size: ${tokens.fontSize.sm};
  font-weight: ${({ $active }) =>
    $active ? tokens.fontWeight.semibold : tokens.fontWeight.normal};
  cursor: pointer;
  transition: background ${tokens.transition.fast},
              color ${tokens.transition.fast},
              border-color ${tokens.transition.fast};

  &:hover {
    background: ${({ $active }) =>
      $active ? tokens.colors.primary[600] : tokens.colors.primary[50]};
    border-color: ${tokens.colors.primary[400]};
    color: ${({ $active }) =>
      $active ? tokens.colors.neutral[0] : tokens.colors.primary[600]};
  }
`;

export function CategoryFilter({ selectedId, onChange }: Props) {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    categoryService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <FilterRow>
      <Chip $active={selectedId === 0} onClick={() => onChange(0)}>
        Todas
      </Chip>
      {categories.map((cat) => (
        <Chip
          key={cat.id}
          $active={selectedId === cat.id}
          onClick={() => onChange(cat.id)}
        >
          {cat.name}
        </Chip>
      ))}
    </FilterRow>
  );
}
