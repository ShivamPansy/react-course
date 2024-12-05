import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);

  function handleNext() {
    if (step < 3) {
      setStep(step + 1);
    }
  }

  function handlePrevious() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return (
    <>
      <button className="close" onClick={() => setOpen((is) => !is)}>
        &times;
      </button>
      {open && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <div className="message">
            <p>
              Step: {step} {messages[step - 1]}
            </p>
          </div>
          <div className="buttons">
            <button onClick={handlePrevious} style={{ backgroundColor: "#" }}>
              previous
            </button>
            <button onClick={handleNext}>next</button>
          </div>
        </div>
      )}
    </>
  );
}
