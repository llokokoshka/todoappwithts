import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import { store } from './store';
import { Provider } from 'react-redux';
import GlobalStyles from './styles/global'
import { ThemeProvider } from 'styled-components';
import { baseTheme } from './styles/theme';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TodosPage from './routes/todosPage';

const rootElem = document.getElementById('root');

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "todo/:id",
    element: <TodosPage />,
    // action: todoAction,
  }
]);

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={baseTheme}>
        <Provider store={store}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
