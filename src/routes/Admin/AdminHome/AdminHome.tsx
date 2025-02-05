import styled from "styled-components";

const AdminHomeContainer = styled.main`
  width: 80%;
  margin: 0 auto;

  color: #636363;
  
  h1{
    font-size: 4vmin;
  }
`;

const AdminHome = () => {
  return (
    <>
      <AdminHomeContainer>
        <h1>Bem-vindo à área administrativa</h1>
      </AdminHomeContainer>
    </>
  );
};

export { AdminHome };
