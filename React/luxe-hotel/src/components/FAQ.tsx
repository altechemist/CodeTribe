import React from 'react';
import Heading from './Heading';

export default function FAQ({ questions }) {
  return (
    <div className="mb-3 mt-4 align-items-end">
      <Heading title="Common Questions" />
      <div className="d-flex justify-content-center">
        <div className="accordion col-sm-7" id="accordionExample">
          {questions.map((item, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={`collapse${index}`}
                >
                  {item.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>{item.answer}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
