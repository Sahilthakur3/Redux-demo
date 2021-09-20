import { configureStore } from '@reduxjs/toolkit'
import   LoginSlice  from './CounterSlice'

export default configureStore({
    reducer: {
        counter: LoginSlice
      },
})