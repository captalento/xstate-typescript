import React, { useState } from 'react'

interface Props {
    confirmAction: (code: string) => void;
}

function CodeConfirm({ confirmAction }: Props) {
  const [code, setCode] = useState("");

  return (
    <div>
      <h1>Confirmação de código</h1>
      <p>Digite o código de confirmação</p>

      <input 
        type="number" 
        placeholder="Código de confirmação" 
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={() => confirmAction(code)}>Confirmar</button>
    </div>
  )
}

export default CodeConfirm
