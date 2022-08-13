import Question from './components/Question'
import { useState , useEffect } from 'react'
import blueBlob from './images/blob-blue.png'
import yellowBlob from './images/blob-yellow.png'
import { nanoid } from 'nanoid'

export default function App(){
    const [isStart , setIsStart] = useState(false)
    const [questions , setQuestions] = useState([])
    const [quizOver ,setQuizOver] = useState(false)
    const [score , setScore] = useState(0)
    const [resetQuiz , setResetQuiz] = useState(false)


    
    useEffect(()=> {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestions(data.results.map((item, index) => ({
                ...item,
                selectedAnswer : "",
                answers : [...item.incorrect_answers, item.correct_answer],
                id : nanoid()
            }))))
    },[resetQuiz])


    function selectAnswer(id,answer){
        if(!quizOver){
        setQuestions(prevState => prevState.map(item => {
            return item.id === id ? {
                ...item,
                selectedAnswer : answer 
            }
            :
            item
        }
        ))
    }
    }
    console.log(questions)
    const questionElements = questions.map((item,index) => <Question 
        quizQuestion = {item}
        key = {item.id}
        id = {item.id}
        selectAnswer = {selectAnswer}
        isQuizOver = {quizOver}
        />)

    function checkAnswers(){
        const isAllSelected = questions.every(item => item.selectedAnswer)
        
        if(isAllSelected){
        const correctAnswers = questions.map(item => (
            item.selectedAnswer === item.correct_answer ? true : false
        )).filter(value => value === true).length
            setScore(correctAnswers)
            setQuizOver(true)
        }

    }
    function reset(){
        setResetQuiz(prevState => !prevState)
        setQuizOver(false)
    }
    function startQuiz(){
        setIsStart(prevState => !prevState)
    }
    return(
        <div className="container">
            <img className="blob blue-blob" src ={blueBlob} />
            <img className="blob yellow-blob"src ={yellowBlob} />
            {isStart
                  ?
                <div className="question-container">
                    {questionElements}
                    <div className="btn-container">
                        {quizOver && <p >You scored {score}/5 correct answers</p>}
                        {!quizOver && <button className = "btn" onClick={checkAnswers} >Check Answers</button>}
                        {quizOver && <button className = "btn"onClick = {reset}>Play Again</button>}
                    </div>

                </div>
                  :
                    <div className="start-quiz">
                          <h1>Quizzical</h1>
                          <button onClick = {startQuiz}   className ="btn">Start quiz</button>
                     </div>
            }

        </div>
    )
}