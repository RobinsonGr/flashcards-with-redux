import React, { useState } from "react";
import { selectCard } from "./cardsSlice";
import { useSelector } from "react-redux";

export default function Card({ id }) {
  const cards = useSelector(selectCard);
  const card = cards[id];
  const [flipped, setFlipped] = useState(false);

  return (
    <li>
      <button className="card" onClick={(e) => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
}
