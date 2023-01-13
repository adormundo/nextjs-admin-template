import { createContext } from 'react';

const AppContext = createContext({
  nome: '',
});

export function AppProvider(props: any) {
  return (
    <AppContext.Provider
      value={{
        nome: 'oxe',
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
