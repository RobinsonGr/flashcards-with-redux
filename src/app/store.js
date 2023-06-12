import { configureStore } from "@reduxjs/toolkit";
import topics from '../features/topics/topicsSlice.js';
import quizzes from '../features/quizzes/quizSlice.js'
import cards from  '../features/cards/cardsSlice.js';

export default configureStore({
  reducer: {
    topics,
    quizzes,
    cards,
  },
});
