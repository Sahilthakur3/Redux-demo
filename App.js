import React from 'react'

import { Provider } from 'react-redux'


import Store from './src/Redux/Store'
import StackNavigator from './src/Routes/StackNavigator'

export default function App() {
  return (
    <Provider store={Store}>
      <StackNavigator/>
    </Provider>
  )
}
