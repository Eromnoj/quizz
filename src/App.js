import { useEffect, useState } from 'react';
import './App.sass';
import Question from './components/Question';
import { nanoid } from 'nanoid'
// import Answer from './components/Answer';


function App() {
  const [isStarted, SetIsStarted] = useState(false)
  const [newQuizz, SetNewQuizz] = useState([])
  const [showResult, SetShowResult] = useState(false)
  const [result,setResult] = useState(0)
  const [quizzEnd, setQuizzEnd] = useState(false)
  const [startAgainTest, setStartAgainTest] = useState(true)

  useEffect(() => {
    fetch('https://the-trivia-api.com/api/questions?limit=5')
      .then(response => response.json())
      .then(data => {
        SetNewQuizz(data.map(question => {
          let allAnswers = question.incorrectAnswers
          let random = Math.floor(Math.random() * 3)
          allAnswers.splice(random, 0, question.correctAnswer)
          // console.log(allAnswers)
          return {
            id: nanoid(),
            question: question.question,
            allAnswers: allAnswers.map(ans => {
              return { id: nanoid(), answer: ans, isSelected: false }
            }),
            goodAnswer: question.correctAnswer,
            correct: false
          }
        }))
      })
  }, [startAgainTest])

  useEffect(() => {
    if(showResult){
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
    setResult(0)
    SetShowResult(false)
    setStartAgainTest(prevState => !prevState)
    setQuizzEnd(false)
  }

  const selectAnswer = (questId, ansId) => {
    SetNewQuizz(prevState => prevState.map(question => {
      let allChAnswers = question.allAnswers.map(answer => {
        return answer.id === ansId ? { ...answer, isSelected: !answer.isSelected } : question.id === questId ? { ...answer, isSelected: false } : answer
      })
      return { ...question, allAnswers: allChAnswers }
    }))

  }

  const valideAnswer = () => {
    SetNewQuizz(prevState => prevState.map(question => {
      let givenAnswer = question.allAnswers.filter(answer => answer.isSelected)
      if (givenAnswer[0]) {
        if (givenAnswer[0].answer === question.goodAnswer) {
          return { ...question, correct: true }
        } else {
          return { ...question, correct: false }
        }
      } else {
        return question
      }
    }))
    setQuizzEnd(true)
    SetShowResult(true)
  }

  const dispatchQuestions = newQuizz.map(question => {
    return <Question
      key={question.id}
      id={question.id}
      question={question.question}
      answers={question.allAnswers}
      goodAnswer={question.goodAnswer}
      correct={question.correct}
      quizzEnd={quizzEnd}
      handleClick={selectAnswer} />
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
            
            <div>
            <p>You scored a result {result} of {newQuizz.length}</p>
            <button onClick={startAgain}>New Quizz</button>
            </div> :
            <button className='validateButton' onClick={valideAnswer}>Validate Answers</button>
            }
            
          </div>
        </div> :
        <div className='startpage'>
          <h1>Welcome to the Quizz</h1>
          <button onClick={startQuizz}>Start Quizz</button>
        </div>}
    </div>
  );
}

export default App;
