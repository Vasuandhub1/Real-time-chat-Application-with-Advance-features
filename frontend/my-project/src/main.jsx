import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store , persistor} from '../redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
      <PersistGate loding={null} persistor={persistor}>
    <App />
      </PersistGate>
    </Provider>
  
  
)
