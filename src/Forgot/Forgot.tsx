import React from 'react';
import { useMachine } from '@xstate/react';

import { forgotMachine } from './machine';
import Email from './Email';
import Info from './Info';

function Forgot() {
  const [state, dispatch] = useMachine(forgotMachine);

  return (
    <section>
      {state.context.isLoading ? <div>Loading...</div> : null}
      {state.matches('show-email') ? (
        <Email
          collectEmail={(email) => dispatch({ type: 'collect-email', email })}
        />
      ) : null}
      {state.matches('info-email') ? (
        <Info
          email={state.context.email}
          back={() => dispatch('event-go-to-email')}
        />
      ) : null}
    </section>
  );
}

export default Forgot;
