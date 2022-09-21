import React, {useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";

import { mount } from 'auth/AuthApp';

const AuthApp = ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onSignIn,
      onNavigate: ({ pathname: nextPathName }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathName) {
          history.push(nextPathName);
        }
      }
    });

    history.listen(onParentNavigate);
  }, []);

  return (<div ref={ref} />)
};

export default AuthApp;
