import React from 'react';

function FeedbackStats({ feedback }) {
  let rating = feedback.map((item) => parseInt(item.rating));
  let ukupno = 0;
  for (let index = 0; index < rating.length; index++) {
    ukupno += rating[index];
  }
  let prosjek = (ukupno / rating.length).toFixed(1).replace(/[.,]0$/, '');

  return (
    <div className="feedback-stats">
      <h4>{rating.length} Reviews</h4>
      <h4>Average Rating: {isNaN(prosjek) ? 0 : prosjek}</h4>
    </div>
  );
}

export default FeedbackStats;
