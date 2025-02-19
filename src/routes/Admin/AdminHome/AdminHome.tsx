import { useState } from "react";
import styled from "styled-components";
import { UserDTO } from "../../../models/user";
import * as userService from "../../../services/user-service.ts";

const AdminHomeContainer = styled.main`
  width: 80%;
  margin: 0 auto;

  color: #636363;

  h1 {
    font-size: 4vmin;
  }

  @media (max-width: 420px) {
    h1 {
      font-size: 5vmin;
    }
  }
`;

const AdminHome = () => {
  const [user, setUser] = useState<UserDTO>();

  useState(() => {
    userService.findMe().then((response) => setUser(response.data));
  });

  return (
    <>
      <AdminHomeContainer>
        <h1>Bem-vindo {user?.name.toLowerCase()} à área administrativa </h1>
      </AdminHomeContainer>
    </>
  );
};

export { AdminHome };
