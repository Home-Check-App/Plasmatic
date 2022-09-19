import React, {useContext} from 'react';
import {Container, interfaces} from 'inversify';

const InversifyContext = React.createContext<{container: Container | null}>({container: null});

interface Props {
  container: Container;
}

export const ServiceProvider: React.FC<Props> = props => {
  return <InversifyContext.Provider value={{container: props.container}}>{props.children}</InversifyContext.Provider>;
};

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const {container} = useContext(InversifyContext);
  if (!container) {
    throw new Error('No container for type!');
  }
  return container.get<T>(identifier);
}
