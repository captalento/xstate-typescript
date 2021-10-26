import React from 'react';

interface Props {
  collectEmail: (email: string) => void;
}

function Email({ collectEmail }: Props) {
  const [email, setEmail] = React.useState('');

  return (
    <div>
      <h1>Email</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={() => collectEmail(email)}>Ir para Info</button>
    </div>
  );
}

export default Email;
