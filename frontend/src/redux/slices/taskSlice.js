import { createSlice } from "@reduxjs/toolkit";

//first,create the thunk

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    doneList: [],
    undoneList: [],
  },
  reducers: {
    setDoneList: (state, action) => {
       state.doneList = action.payload;
    },
    setUndoneList: (state, action) => {
       state.undoneList = action.payload;
       
    },
    addToDoneList: (state, action) => {
      state.doneList.push(action.payload)
     },
     addToUndoneList: (state, action) => {
         state.undoneList=[action.payload,...state.undoneList]
         console.log(state.undoneList)
         return state
       },
    removeFromDoneList: (state, action) => {
      return state.undoneList.filter(task=> task.id!==action.payload.id)
    },
  },
});

export const { setDoneList, setUndoneList, addToDoneList, addToUndoneList,removeFromDoneList } =
  taskSlice.actions;

export default taskSlice.reducer;
