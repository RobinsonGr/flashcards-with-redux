/* thiis is quizSlice.js file*/
import {createSlice} from '@reduxjs/toolkit';
import {addQuizzesId} from '../topics/topicsSlice.js'

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {quizzes: {}},
  reducers: {
    addQuizzes: (state, action) => {
      state.quizzes[action.payload.id] = action.payload;
    }
  }
})

export const selectQuizzes = (state) => {
  return state.quizzes.quizzes;
}


export const addQuizWithTopic = (payload) => {
  return (dispatch) => {
    const {name, topicId, cardIds, id} = payload;
    dispatch(addQuizzes(payload));
    dispatch(addQuizzesId({quizId: id, topicId}))
  };
};


export const {addQuizzes} = quizzesSlice.actions;
export default quizzesSlice.reducer;