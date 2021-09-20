import { createSlice } from '@reduxjs/toolkit'

export const LoginSlice = createSlice({
  name: 'Login',
  initialState: {
    email: "sahil",
    pass: "123",
    num: "",
    name : "",
    address :""
  },
  reducers: {
    email: (state, actions) => {

      console.log(actions)
      state.email = actions.payload

    },
    password: (state, actions) => {
      state.pass = actions.payload

    },
    numbers: (state, actions) => {
      state.num = actions.payload
    },
    Name: (state, actions) => {
      state.name = actions.payload
    },
   Address: (state, actions) => {
      state.address = actions.payload
    },


  },
})

// Action creators are generated for each case reducer function
export const { email, password, numbers,Address,Name } = LoginSlice.actions
export const Store_data = (data) => {
  return dispatch => {
    dispatch(email(data))
    dispatch(password(data))
    dispatch(numbers(data))
    dispatch(Name(data))
    dispatch(Address(data))

  }
}
// export const Store_data=(data)=>{
//   return dispatch=>{
//     dispatch(name33(data))
//   }
// }
export default LoginSlice.reducer