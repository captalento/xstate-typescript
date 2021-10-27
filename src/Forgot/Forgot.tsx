import React from 'react';
import { useMachine } from '@xstate/react';

import { forgotMachine } from './machine';
import Email from './Email';
import Info from './Info';
import CodeConfirm from './CodeConfirm';
import Password from './Password';
import Success from './Success';
import { STATES, EVENTS } from './machine/enums';

function Forgot() {
  const [state, dispatch] = useMachine(forgotMachine);
  console.log(state.value);
  return (
    <section>
      {state.context.isLoading ? <div>Loading...</div> : null}
      {state.matches(STATES.SHOW_EMAIL) ? (
        <Email
          collectEmail={(email) =>
            dispatch({ type: EVENTS.COLLECT_EMAIL, email })
          }
        />
      ) : null}
      {state.matches(STATES.INFO_EMAIL) ? (
        <Info
          email={state.context.email}
          back={() => dispatch(EVENTS.BACK_TO_EMAIL)}
          sendToCode={() => dispatch(EVENTS.SEND_TO_CODE)}
        />
      ) : null}
      {state.matches(STATES.SHOW_CODE_CONFIRM) ? (
        <CodeConfirm
          confirmAction={(code) =>
            dispatch({ type: EVENTS.COLLECT_CODE, code })
          }
        />
      ) : null}
      {state.matches(STATES.SHOW_PASSWORD) ? (
        <Password
          collectPassword={(password) =>
            dispatch({ type: EVENTS.COLLECT_PASSWORD, password })
          }
        />
      ) : null}
      {state.matches(STATES.SUCCESS) ? (
        <Success />
      ) : null}
    </section>
  );
}

export default Forgot;
