import React from 'react';
import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { MainView } from './components/main-view/main-view';
import './index.scss';

function App() {
  return (
    <Container>
      <MainView />
    </Container>
  );
}

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);
