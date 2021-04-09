import './FinishPage.css'

interface IFinishPage{
  stats: any,
}

export const FinishPage = ({stats}: IFinishPage) => {
  let result = '';

  switch (true) {
    case stats.success === 10:
      result = 'Отличный результат!'
      break;
    case stats.success > 6:
      result = 'Хороший результат!'
      break;
    case stats.success > 3:
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
