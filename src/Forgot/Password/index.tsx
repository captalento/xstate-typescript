import React, { useState } from 'react';

interface Props {
  collectPassword: (password: string) => void;
}

function Password({ collectPassword }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <div>
      <input
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        placeholder="Confirme sua Senha"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />

      <button
        disabled={password !== confirmPass}
        onClick={() => collectPassword(password)}
      >
        Confirmar
      </button>
    </div>
  );
}

export default Password;
