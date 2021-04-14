import './FinishPage.css'
import {IFinishPage} from "./IAudioCallGame";

const goodMark = 10;
const mediumMark = 6;
const lowMark = 3;


export const FinishPage = ({stats}: IFinishPage) => {
  let result: string;

  switch (true) {
    case stats.success === goodMark:
      result = 'Отличный результат!'
      break;
    case stats.success > mediumMark:
      result = 'Хороший результат!'
      break;
    case stats.success > lowMark:
      result = 'Неплохо!'
      break;

    default:
      result = 'Вам следует повторить слова!'
  }



  return(
    <div className='finishPage-container'>
      <h2>{result}</h2>
      <p>
        Количество правильных ответов: {stats.success} из 10.
      </p>
    </div>
  )
}
