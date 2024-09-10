import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppRouter />
    </>
  );
};

export default App;
