import { useEffect, useState } from 'react';
import './App.sass';
import Question from './components/Question';
import { nanoid } from 'nanoid'


function App() {
  const [newQuizz, SetNewQuizz] = useState([])

  const [result,setResult] = useState(0)

  const [isStarted, SetIsStarted] = useState(false)
  const [showResult, SetShowResult] = useState(false)
  const [quizzEnd, setQuizzEnd] = useState(false)
  const [startAgainTest, setStartAgainTest] = useState(true)



  useEffect(() => {


    
    fetch('https://the-trivia-api.com/api/questions?limit=5')
      .then(response => response.json())
      .then(data => {

        //changement d'état newQuizz createNewQuizz
        SetNewQuizz(data.map(question => {
          let allAnswers = question.incorrectAnswers
          let random = Math.floor(Math.random() * 3)
          allAnswers.splice(random, 0, question.correctAnswer)
          return {
            id: nanoid(),
            question: question.question,
            allAnswers: allAnswers.map(ans => {
              return { id: nanoid(), answer: ans, isSelected: false }
            }),
            goodAnswer: question.correctAnswer,
            correct: false
          }
        } ))
        /////////////////
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
  })
    setResult(0)
    SetShowResult(false)
    setStartAgainTest(prevState => !prevState)
    setQuizzEnd(false)
  }



  const selectAnswer = (questId, ansId) => {

    //changement d'état newQuizz selectAnswer à passer à Answer.js
    SetNewQuizz(prevState => prevState.map(question => {
      let allChAnswers = question.allAnswers.map(answer => {
        return answer.id === ansId ? { ...answer, isSelected: !answer.isSelected } : question.id === questId ? { ...answer, isSelected: false } : answer
      })
      return { ...question, allAnswers: allChAnswers }
    }))
    ////////////////
  }

  const valideAnswer = () => {

    //changement d'état newQuizz validAnswer
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
      question={question}
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
