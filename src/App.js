import { useEffect, useState } from 'react';
import './App.sass';
import Question from './components/Question';
import { useSelector, useDispatch } from 'react-redux';
import { createNewQuizz, validAnswer, toggleEndQuizz } from './redux';


function App() {
  const newQuizz = useSelector(state => state.quizz)
  const dispatch = useDispatch()


  const [result, setResult] = useState(0)

  const [isStarted, SetIsStarted] = useState(false)
  const [showResult, SetShowResult] = useState(false)
  const [startAgainToggle, setstartAgainToggle] = useState(true)



  useEffect(() => {
    fetch('https://the-trivia-api.com/api/questions?limit=5')
      .then(response => response.json())
      .then(data => {
        dispatch(createNewQuizz(data))
      })
  }, [startAgainToggle])

  useEffect(() => {
    if (showResult) {
      setResult(newQuizz.filter(ques => ques.correct).length)
      console.log(newQuizz.filter(ques => ques.correct).length)
    }
  }, [showResult, newQuizz])

  const startQuizz = () => {
    SetIsStarted(!isStarted)
    setResult(0)
    SetShowResult(false)
  }

  const startAgain = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setResult(0)
    SetShowResult(false)
    setstartAgainToggle(prevState => !prevState)
    dispatch(toggleEndQuizz(false))
  }

  const valideAnswer = () => {

    dispatch(validAnswer())

    dispatch(toggleEndQuizz(true))
    SetShowResult(true)
  }



  const dispatchQuestions = newQuizz.map(question => {
    return <Question
      key={question.id}
      question={question}
    />
  })

  return (
    <div className="App">
      {isStarted ?
        <div className='quizz'>
          <div className='allQuestion'>
            {dispatchQuestions}
          </div>
          <div className='validate'>
            {showResult ?
              <div className='result'>
                <p>You scored  {result} / {newQuizz.length} correct answers</p>
                <button className='button' onClick={startAgain}>New Quizz</button>
              </div> :
              <button className='button' onClick={valideAnswer}>Validate Answers</button>
            }

          </div>
        </div> :
        <div className='startpage'>
          <h1>Easy Quizzy</h1>
          <p>Powered with React</p>
          <p>Using API from : <a href='https://the-trivia-api.com/'>The trivia API</a> </p>
          <button className='button' onClick={startQuizz}>Start Quizz</button>
        </div>}
    </div>
  );
}

export default App;
