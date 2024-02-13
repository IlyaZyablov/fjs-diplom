import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import store from './store/index.ts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';
import 'izitoast/dist/css/iziToast.min.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
