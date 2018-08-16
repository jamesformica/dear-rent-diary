import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from './reducer'
import Layout from './layout/Layout'

const store = createStore(rootReducer)

const App = () => (
  <Provider store={store}>
    <Layout />
  </Provider>
)

ReactDOM.render(<App />, global.document.getElementById('root'))
