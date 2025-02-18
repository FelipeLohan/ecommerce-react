import styled from "styled-components";

const DialogConfirmationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const DialogConfirmationContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #fff;
  width: 30%;
  height: 30%;
  border: 3px solid rgb(165, 165, 165);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  h1 {
    color: rgb(126, 126, 126);
  }
`;

const ConfirmationButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const YesButton = styled.button`
  font-size: 2.2vmin;
  background-color: #3483fa;
  color: #fff;
  padding: 8px 48px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const NoButton = styled.button`
  font-size: 2.2vmin;
  background-color: rgb(136, 5, 0);
  color: #fff;
  padding: 8px 48px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

type Props = {
  message: string;
  onDialogAnswer: any;
  id: number;
};

const DialogConfirmation = ({ id , message, onDialogAnswer }: Props) => {
  return (
    <>
      <DialogConfirmationContainer>
        <DialogConfirmationContent>
          <h1>{message}</h1>
          <ConfirmationButtonsContainer>
            <NoButton onClick={() => onDialogAnswer(false, id)}>Não</NoButton>
            <YesButton onClick={() => onDialogAnswer(true, id)}>Sim</YesButton>
          </ConfirmationButtonsContainer>
        </DialogConfirmationContent>
      </DialogConfirmationContainer>
    </>
  );
};

export { DialogConfirmation };
