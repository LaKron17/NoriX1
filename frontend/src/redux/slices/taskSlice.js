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
      state.doneList.unshift(action.payload);
    },
    addToUndoneList: (state, action) => {
      state.undoneList.unshift(action.payload);
    },
  },
});

export const {setDoneList,setUndoneList,addToDoneList, addToUndoneList } = taskSlice.actions;

export default taskSlice.reducer;
