import React from 'react';

interface Props {
  back: () => void;
  sendToCode: () => void;
  email: string;
}

function Info({ back, email, sendToCode }: Props) {
  return (
    <div>
      <h1>Info</h1>
      <p>Enviamos um email para: {email} com o código de recuperação</p>
      <button onClick={back}>Ir para o Email</button>
      <button onClick={sendToCode}>Recebi o código</button>
    </div>
  );
}

export default Info;
