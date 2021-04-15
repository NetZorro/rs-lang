
export const ChooseLevel = ({setCategory}: any) => {
  return(
    <div>
      <h2>Choose category</h2>
      <select onChange={(e) => {
        setCategory(e.target.value)
      }}>
        <option value="" >Select Category</option>
        <option value="0">Category 1</option>
        <option value="1">Category 2</option>
        <option value="2">Category 3</option>
        <option value="3">Category 4</option>
        <option value="4">Category 5</option>
        <option value="5">Category 6</option>
      </select>
    </div>
  )
}
