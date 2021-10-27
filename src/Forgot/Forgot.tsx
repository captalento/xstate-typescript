import React from 'react';
import { useMachine } from '@xstate/react';

import { forgotMachine } from './machine';
import Email from './Email';
import Info from './Info';
import CodeConfirm from './CodeConfirm'
import { STATES, EVENTS } from './machine/enums'


function Forgot() {
  const [state, dispatch] = useMachine(forgotMachine);

  return (
    <section>
      {state.context.isLoading ? <div>Loading...</div> : null}
      {state.matches(STATES.SHOW_EMAIL) ? (
        <Email
          collectEmail={(email) => dispatch({ type: EVENTS.COLLECT_EMAIL, email })}
        />
      ) : null}
      {state.matches(STATES.INFO_EMAIL) ? (
        <Info
          email={state.context.email}
          back={() => dispatch(EVENTS.BACK_TO_EMAIL)}
        />
      ) : null}
      {state.matches(STATES.SHOW_CODE_CONFIRM) ? (
        <CodeConfirm
        confirmAction={() => dispatch(EVENTS.SEND_TO_CODE)}
      />) : null}
    </section>
  );
}

export default Forgot;
