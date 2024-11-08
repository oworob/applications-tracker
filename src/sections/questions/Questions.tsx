import { Link } from "react-router-dom";
import "./Questions.scss";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const questions = [
  {
    id: 1,
    question: "What types are there in JavaScript?",
    tags: ["JavaScript", "Types"],
  },
  {
    id: 2,
    question: "What is the difference between == and === in JavaScript?",
    tags: ["JavaScript"],
  },
  {
    id: 3,
    question: "What is the difference between null and undefined in JavaScript?",
    tags: ["JavaScript"],
  },
];

export default function Questions() {
  const [FilteredQuestions, SetFilteredQuestions] = useState(questions);
  const [SearchPhrase, SetSearchPhrase] = useState("");
  const [CurrentQuestion, SetCurrentQuestion] = useState(questions[0]);

  useEffect(() => {
    SetFilteredQuestions(questions.filter((question) => question.question.toLowerCase().includes(SearchPhrase.toLowerCase())));
  }, [SearchPhrase]);

  return (
    <section id="Questions">
      <header className="section-header">
        <h1>Questions</h1>
        <p>Prepare for the interview.</p>
      </header>

      <article className="content">
        <div className="questions">
          <div className="actions">
            <Link to="/questions/add">
              <button className="primary icon add-button">
                <Icon icon="mi-document-add" id="icon" />
                Add
              </button>
            </Link>
            <div className="input-with-icon search">
              <Icon icon="mi-search" id="icon" />
              <input type="text" placeholder="Search" value={SearchPhrase} onChange={(e) => SetSearchPhrase(e.target.value)} />
              {SearchPhrase && (
                <Icon
                  icon="mi-close"
                  id="icon"
                  className="clear-button"
                  onClick={() => {
                    SetSearchPhrase("");
                  }}
                />
              )}
            </div>
          </div>
          <div className="question-list">
            {FilteredQuestions.map((question) => (
              <div
                className="question"
                key={question.id}
                onClick={() => {
                  SetCurrentQuestion(question);
                }}
              >
                <div className="question-text">{question.question}</div>
                <div className="tags">
                  {question.tags.map((tag) => (
                    <span className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="answer">
          <h3>{CurrentQuestion.question}</h3>
        </div>
      </article>
    </section>
  );
}
