import React from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Toast } from './components/common/Toast';
import { TopBar } from './components/TopBar';
import { uiActions } from './features/uiSlice';
import { AppRouter } from './router/AppRouter';

function App() {
  const dispatch = useAppDispatch()
  const { toast } = useAppSelector((state) => state.ui)

  return (
    <div className="App">
      <Toast
        open={toast.show}
        message={toast.message}
        onClose={() => dispatch(uiActions.hideToast())}
      />
      <TopBar />
      <AppRouter />
    </div >
  );
}

export default App;
