type CheckBoxProps = {
  name: string
  on: boolean
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const CheckBox = ({ name, on, handleToggle }: CheckBoxProps) => {
  return (
    <label className='inline-flex items-center cursor-pointer'>
      <input type='checkbox' name={name} className='sr-only peer' checked={on} onChange={handleToggle} />
      <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
    </label>
  )
}

export default CheckBox
