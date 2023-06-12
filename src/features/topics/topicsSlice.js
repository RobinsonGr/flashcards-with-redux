/* thiis is topicSlice.js file*/
import {createSlice} from '@reduxjs/toolkit';

const topicsSlice = createSlice({
   name: 'topics',
   initialState: {topics: {}},
   reducers: {
        addTopic: (state, action) => {
            state.topics[action.payload.id] = action.payload;
            state.topics[action.payload.id]['quizIds'] = [];
        }, 
        addQuizzesId: (state, action) => {
         state.topics[action.payload.topicId].quizIds.push(action.payload.quizId)
        }
    }
});

export const selectTopics = (state) => {
   return state.topics.topics;
}

export const {addTopic, addQuizzesId} = topicsSlice.actions;
export default topicsSlice.reducer;