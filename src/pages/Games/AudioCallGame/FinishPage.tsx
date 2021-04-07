interface IFinishPage{
  stats: any
}
export const FinishPage = ({stats}: IFinishPage) => {
  return(
    <div>
      finish page
      guessed: {stats.success},
      fail: {stats.fail}
    </div>
  )
}
