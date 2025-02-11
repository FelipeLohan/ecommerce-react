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
`

const DialogInfo = () => {
  return(
    <>
    <DialogInfoContainer>
      <DialogInfoContent>
        <h1>Sucesso!</h1>
        <button>Ok</button>
      </DialogInfoContent>
    </DialogInfoContainer>
    </>
  )
}

export { DialogInfo };