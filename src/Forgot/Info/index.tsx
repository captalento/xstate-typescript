import React from 'react';

interface Props {
  back: () => void;
  email: string;
}

function Info({ back, email }: Props) {
  return (
    <div>
      <h1>Info</h1>
      <p>Enviamos um email para: {email}</p>
      <button onClick={back}>Ir para o Email</button>
    </div>
  );
}

export default Info;
