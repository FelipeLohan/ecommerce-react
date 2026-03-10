import styled from "styled-components";
import { CtaButton } from "../../../components/CtaButton";
import { SearchInput } from "../../../components/SearchInput";
import { ProductAdminListCard } from "../../../components/ProductAdminListCard";
import { CtaLoadMore } from "../../../components/CtaLoadMore";
import { useContext, useEffect, useState } from "react";
import * as productService from "../../../services/product-service.ts";
import { ProductDTO } from "../../../models/product";
import { DialogInfo } from "../../../components/DialogInfo/DialogInfo.tsx";
import { DialogConfirmation } from "../../../components/DialogConfirmation/DialogConfirmation.tsx";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../styles/tokens.ts";
import { ContextToast } from "../../../utils/context-toast.ts";

/* ── Page ────────────────────────────────────────────────── */
const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 40px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: ${tokens.fontSize["2xl"]};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.neutral[900]};
  margin: 0;
`;

const SearchBarContainer = styled.div`
  margin-bottom: 20px;
`;

const CtaLoadMoreContainerMargin = styled.div`
  margin-top: 20px;
`;

/* ── Table ───────────────────────────────────────────────── */
const TableWrapper = styled.div`
  background: #ffffff;
  border-radius: ${tokens.radius.lg};
  box-shadow: ${tokens.shadow.sm};
  overflow: hidden;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: ${tokens.colors.neutral[50]};
  font-size: ${tokens.fontSize.xs};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid ${tokens.colors.neutral[100]};
`;

const HoverTr = styled.tr`
  &:hover td {
    background: ${tokens.colors.neutral[50]};
  }
`;

/* ── Types ───────────────────────────────────────────────── */
type QueryParams = {
  page: number;
  name: string;
};

/* ── Component ───────────────────────────────────────────── */
const ProductListing = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ContextToast);
  const [isLast, setIsLast] = useState(false);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [queryParams, setQueryParam] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Sucesso!",
  });

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visible: false,
    message: "Tem certeza?",
    id: 0,
  });

  useEffect(() => {
    productService
      .findPageRequest(queryParams.page, queryParams.name)
      .then((response) => {
        setIsLast(response.data.last);
        const nextPage = response.data.content;
        setProducts((prev) =>
          queryParams.page === 0 ? nextPage : prev.concat(nextPage)
        );
      });
  }, [queryParams]);

  function handleNewProductClick() {
    navigate("/admin/products/create");
  }

  function handleSearch(searchText: string) {
    setProducts([]);
    setQueryParam({ page: 0, name: searchText });
  }

  function handleNextPage() {
    setQueryParam((prev) => ({ ...prev, page: prev.page + 1 }));
  }

  function handleDialogInfoClose() {
    setDialogInfoData((prev) => ({ ...prev, visible: false }));
  }

  function handleDeleteClick(productId: number) {
    setDialogConfirmationData({
      id: productId,
      visible: true,
      message: "Deseja excluir este produto permanentemente?",
    });
  }

  function handleUpdateClick(productId: number) {
    navigate(`/admin/products/${productId}`);
  }

  function handleDialogConfirmationAnswer(answer: boolean, productId: number) {
    if (answer) {
      productService
        .deleteById(productId)
        .then(() => {
          setProducts([]);
          setQueryParam((prev) => ({ ...prev, page: 0 }));
          addToast("success", "Produto removido com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          const msg = error.response?.data?.error ?? "Erro ao excluir produto.";
          addToast("error", msg);
          setDialogInfoData({ visible: true, message: msg });
        });
    }
    setDialogConfirmationData((prev) => ({ ...prev, visible: false }));
  }

  return (
    <PageWrapper>
      <PageHeader>
        <PageTitle>Produtos</PageTitle>
        <CtaButton variant="primary" onClick={handleNewProductClick}>
          + Novo produto
        </CtaButton>
      </PageHeader>

      <SearchBarContainer>
        <SearchInput onSearch={handleSearch} />
      </SearchBarContainer>

      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Imagem</Th>
              <Th>Nome</Th>
              <Th>Preço</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <HoverTr key={product.id}>
                <ProductAdminListCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imgUrl={product.imgUrl}
                  onDeleteClick={() => handleDeleteClick(product.id)}
                  onUpdateClick={() => handleUpdateClick(product.id)}
                />
              </HoverTr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>

      {!isLast && (
        <CtaLoadMoreContainerMargin onClick={handleNextPage}>
          <CtaLoadMore />
        </CtaLoadMoreContainerMargin>
      )}

      {dialogInfoData.visible && (
        <DialogInfo
          message={dialogInfoData.message}
          onDialogClose={handleDialogInfoClose}
        />
      )}

      {dialogConfirmationData.visible && (
        <DialogConfirmation
          message={dialogConfirmationData.message}
          onDialogAnswer={handleDialogConfirmationAnswer}
          id={dialogConfirmationData.id}
        />
      )}
    </PageWrapper>
  );
};

export { ProductListing };
