import { useState } from "react";

const emptyFormData = {
  studentName: "",
  studentEmail: "",
  topic: "React",
  rating: 0,
  feedback: "",
};

function Form() {
  const [formData, setFormData] = useState(emptyFormData);
  const [feedbacks, setFeedbacks] = useState([]);

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.rating === 0) {
      alert("Please choose a rating.");
      return;
    }

    if (formData.feedback.trim().length < 5) {
      alert("Feedback must be at least 5 characters.");
      return;
    }

    setFeedbacks([...feedbacks, { ...formData, id: Date.now() }]);
    setFormData(emptyFormData);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={submitHandler}
        className="bg-white rounded-xl p-6 shadow-xl max-w-xl mx-auto space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Feedback form
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Name
          </label>
          <input
            type="text"
            name="studentName"
            required
            value={formData.studentName}
            onChange={onChangeHandler}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Email
          </label>
          <input
            type="email"
            name="studentEmail"
            required
            value={formData.studentEmail}
            onChange={onChangeHandler}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <select
            name="topic"
            value={formData.topic}
            onChange={onChangeHandler}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-orange-500"
          >
            <option value="React">React</option>
            <option value="Javascript">Javascript</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setFormData({ ...formData, rating: num })}
                className={`w-10 h-10 rounded-lg border font-semibold transition cursor-pointer ${
                  num <= formData.rating
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-gray-300 text-gray-700 hover:border-orange-500"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Feedback
          </label>
          <textarea
            name="feedback"
            required
            rows={4}
            value={formData.feedback}
            onChange={onChangeHandler}
            placeholder="Write your feedback here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition cursor-pointer"
        >
          Submit
        </button>
      </form>

      {/* Submitted Feedback Cards */}
      <div className="max-w-xl mx-auto mt-6 space-y-4">
        {feedbacks.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-5 shadow-md border border-orange-100"
          >
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-lg">
                {item.studentName}
              </h3>
              <span className="text-sm text-gray-500">{item.studentEmail}</span>
            </div>
            <p className="text-sm font-medium text-orange-600 mb-2">
              {item.topic} — Rating: {item.rating}/5
            </p>
            <p className="text-gray-700">{item.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Form;