import styled from "styled-components";
import { tokens } from "../../styles/tokens.ts";

/* ── Styles ──────────────────────────────────────────────── */
const ActionBtn = styled.button<{ $danger?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: ${tokens.radius.md};
  color: ${tokens.colors.neutral[500]};
  cursor: pointer;
  transition: color ${tokens.transition.fast}, background ${tokens.transition.fast};

  &:hover {
    background: ${tokens.colors.neutral[100]};
    color: ${({ $danger }) =>
      $danger ? tokens.colors.danger[600] : tokens.colors.primary[600]};
  }
`;

const ProductImg = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: ${tokens.radius.md};
  display: block;
`;

const PriceBadge = styled.span`
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.primary[600]};
`;

const Td = styled.td`
  padding: 14px 16px;
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[700]};
  border-bottom: 1px solid ${tokens.colors.neutral[50]};
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 8px;
`;

/* ── Types ───────────────────────────────────────────────── */
type Props = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  onDeleteClick: () => void;
  onUpdateClick: () => void;
};

/* ── Component — renders <td> cells, must be used inside <tr> ── */
const ProductAdminListCard = ({ id, name, price, imgUrl, onDeleteClick, onUpdateClick }: Props) => {
  return (
    <>
      <Td style={{ color: tokens.colors.neutral[400], fontSize: tokens.fontSize.xs }}>#{id}</Td>
      <Td><ProductImg src={imgUrl} alt={name} /></Td>
      <Td style={{ maxWidth: "300px" }}>{name}</Td>
      <Td><PriceBadge>R$ {price.toFixed(2)}</PriceBadge></Td>
      <Td>
        <ActionsRow>
          <ActionBtn onClick={onUpdateClick} aria-label="Editar" title="Editar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </ActionBtn>
          <ActionBtn $danger onClick={onDeleteClick} aria-label="Excluir" title="Excluir">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </ActionBtn>
        </ActionsRow>
      </Td>
    </>
  );
};

export { ProductAdminListCard };
