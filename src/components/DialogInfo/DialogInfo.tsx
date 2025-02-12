import styled from "styled-components";

const DialogInfoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

const DialogInfoContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% , -50%);

  background-color: #fff;
  width: 20%;
  height: 30%;
  border: 3px solid rgb(165, 165, 165);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;


  button{
    font-size: 2.2vmin;
    background-color: #3483FA;
    color: #fff;
    padding: 8px 48px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  h1{
  color:rgb(126, 126, 126)
  }
`

type Props = {
  message: string;
  onDialogClose: Function;
}

const DialogInfo = ({message, onDialogClose}: Props) => {
  return(
    <>
    <DialogInfoContainer>
      <DialogInfoContent>
        <h1>{message}</h1>
        <button onClick={onDialogClose}>Ok</button>
      </DialogInfoContent>
    </DialogInfoContainer>
    </>
  )
}

export { DialogInfo };