import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Store/authStore';
import { toast } from 'react-toastify';

const FeedBack = () => {
  const ratingLog = () => {
    toast.error("You have to signup First");
  };

  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const { id, name, price, description, image } = location.state || {};

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState([]); // Store multiple feedbacks

  // Retrieve feedbacks from localStorage on component mount
  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks'));
    if (storedFeedbacks) {
      setFeedbacks(storedFeedbacks);
    }
  }, []);

  // Update localStorage whenever feedbacks array changes
  useEffect(() => {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      if (rating && comment) {
        // Add the new feedback to the array
        const newFeedback = { rating, comment };
        const updatedFeedbacks = [...feedbacks, newFeedback];
        setFeedbacks(updatedFeedbacks);

        // Reset comment only
        setComment("");

        toast.success("Feedback submitted successfully!");
      } else {
        toast.error("Please provide both rating and comment.");
      }
    } else {
      ratingLog();
    }
  };

  return (
    <div className="mt-[6rem] p-5">
      {name ? (
        <div className="feedback_container max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg">
          <h1 className="text-3xl font-semibold mb-4">Feedback for {name}</h1>
          <div className="food_details mb-4">
            <img src={image} alt={name} className="w-full rounded-md mb-4" />
            <p className="text-lg mb-2">Description: {description}</p>
            <p className="text-lg font-bold mb-4">Price: ₹{price}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="rating mb-4">
              <h3 className="text-lg mb-2">Rate this item:</h3>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star key={value} value={value} filled={rating >= value} onClick={() => handleRating(value)} />
                ))}
              </div>
            </div>

            <div className="comment mb-4">
              <h3 className="text-lg mb-2">Leave a comment:</h3>
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none"
                rows="5"
                placeholder="Write your feedback here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className={`bg-orange-500 text-white px-5 py-2 rounded-lg cursor-pointer ${!isLoggedIn ? 'disabled' : ''}`}
            >
              Submit Feedback
            </button>
          </form>

          {feedbacks.length > 0 && (
            <div className="submitted_feedback mt-6 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">User Feedback:</h3>
              {feedbacks.map((fb, index) => (
                <div key={index} className="mb-4">
                  <p><strong>Rating:</strong> {fb.rating} stars</p>
                  <p><strong>Comment:</strong> {fb.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>No item selected.</p>
      )}
    </div>
  );
};

const Star = ({ value, filled, onClick }) => {
  return (
    <svg
      onClick={() => onClick(value)}
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 cursor-pointer ${filled ? 'text-yellow-500' : 'text-gray-300'}`}
      fill={filled ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.293a1 1 0 00.95.69h6.573c.97 0 1.372 1.24.588 1.81l-5.327 3.872a1 1 0 00-.364 1.118l2.036 6.293c.3.921-.755 1.688-1.538 1.118l-5.327-3.872a1 1 0 00-1.176 0l-5.327 3.872c-.783.57-1.838-.197-1.538-1.118l2.036-6.293a1 1 0 00-.364-1.118L2.9 11.72c-.784-.57-.382-1.81.588-1.81h6.573a1 1 0 00.95-.69l2.036-6.293z"
      />
    </svg>
  );
};

export default FeedBack;
