/* thiis is NewQuizForm.js file*/
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import {addQuizWithTopic} from '../features/quizzes/quizSlice.js';
import {selectTopics} from '../features/topics/topicsSlice.js';
import {selectQuizzes} from '../features/quizzes/quizSlice.js';
import {addCard} from "../features/cards/cardsSlice";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const history = useHistory();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();
  const quizzes = useSelector(selectQuizzes);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const id = uuidv4()
        
    // create the new cards here and add each card's id to cardIds
    const cardIds = cards.map((card) => {
      const cardId = uuidv4()
      const {back, front} = card;
      dispatch(addCard({id: cardId, back, front}))
      return cardId}); 

    // create the new quiz here
    dispatch(addQuizWithTopic({id, name, topicId, cardIds}));
    
    
    
    history.push(ROUTES.quizzesRoute());
    console.log(cards)
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>{'another thing'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic2</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button >Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
