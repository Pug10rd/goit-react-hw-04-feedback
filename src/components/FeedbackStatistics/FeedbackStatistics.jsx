import { useState } from 'react';
// import { countPositiveFeedbackPercentage } from '../utils/countPositiveFeedbackPercentage';
// import { countTotalFeedback } from '../utils/countTotalFeedback';
import FeedbackOptions from 'components/FeedbackOptions';
import Section from 'components/Section/Section';
import Statistics from 'components/Statistics/Statistics';
import Notification from 'components/Notification/Notification';

const feedbackNames = ['good', 'neutral', 'bad'];

const FeedbackStatistics = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const checkFeedback = () => {
    return Object.values(feedback).some(i => i > 0);
  };
  const handleClick = value => {
    setFeedback({ ...feedback, [value]: feedback[value] + 1 });
  };
  const countTotalFeedback = (state) => {
    const values = Object.values(state);
    return values.reduce((acc, value) => acc + value);
  };
  const countPositiveFeedbackPercentage = (total, good) => {
    return total === 0 ? '0' : Math.round((good / total) * 100);
  }
  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feedbackNames}
          onLeaveFeedback={handleClick}
        />
      </Section>
      <Section title="Statistics">
        {checkFeedback() ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback(feedback)}
            positivePercentage={countPositiveFeedbackPercentage(
              countTotalFeedback(feedback),
              feedback.good
            )}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
}

export default FeedbackStatistics;