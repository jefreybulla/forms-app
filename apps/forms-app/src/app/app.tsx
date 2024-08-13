// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { useEffect, useState } from 'react';


// questions interface
interface Question {
  title: string;
  content: string;
  options: string[];
  type: string;
  current_question: number;
  total_questions: number;
}


export function App() {

  const [question, setQuestion] = useState<Question>();
  const [ fetchStatus, setFetchStatus ] = useState('loading');
  const [ userAnswer, setUserAnswers ] = useState<string[]>([]);
  const [ currentQuestion, setCurrentQuestion ] = useState<number>(1);

  const apiRoot = 'http://localhost:3333/api';

  const fetchQuestion = async (questionNumber: number) => {
    const response = await fetch(`${apiRoot}/questions/${questionNumber}`);
    const data = await response.json();
    console.log(data);
    setQuestion(data);
    setFetchStatus('ready');
  }

  useEffect(() => {
    fetchQuestion(currentQuestion);
  }, [currentQuestion]);

  const handleSubmit = async({lastQuestion = false}) => {
    const response = await fetch(`${apiRoot}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question_id: question?.current_question,
        response: userAnswer,
      })
    });
    const data = await response.json();
    console.log(data);

    //console.log('last question', lastQuestion);
    if (lastQuestion) {
      console.log('last question');
      setFetchStatus('end');
    }
    else{
      console.log('next question');
      setCurrentQuestion(currentQuestion + 1);
    }

  }

  const handleChange = (e: any) => {
    setUserAnswers([e.target.value]);
    // WIP for multiple_choice_multiple
    //setUserAnswers([...userAnswer, e.target.value]);
  }

  const renderInputs = () => {
    if (question?.type === 'multiple_choice_unique') {
      return question.options.map((option, index) => {
        return (
          <div key={index}>
            <input type="radio" name="option" value={option} onChange = {(e) => handleChange(e)}/>
            <label>{option}</label>
          </div>
        )
      })
    }
    if (question?.type === 'multiple_choice_multiple') {
      return question.options.map((option, index) => {
        return (
          <div key={index}>
            <input type="checkbox" name="option" value={option} onChange = {(e) => handleChange(e)}/>
            <label>{option}</label>
          </div>
        )
      })
    }
    if (question?.type === 'text') {
      return (
        <input type="text" onChange = {(e) => handleChange(e)} />
      )}
  }

  if (fetchStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (fetchStatus === 'end') {
    return <div>We are on it. Thanks!</div>
  }

  return (
    <div>
      <h1 className={styles.title}>{question?.title}</h1>
      <p>{question?.content}</p>
      { renderInputs() } 
      { currentQuestion == question?.total_questions ?
        <button onClick={() => handleSubmit({lastQuestion: true})}>
          Submit
        </button>
        : 
        <button onClick={() => handleSubmit({lastQuestion: false})}>
        OK
        </button>
      }


    
    </div>
  );
}

export default App;
