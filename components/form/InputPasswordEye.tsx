import Image from 'next/image'

type InputPasswordEyeProps = {
  name: string
  isVisible: boolean
  toggleVisible: (name: string, value: boolean) => void
}

const InputPasswordEye = ({ name, isVisible, toggleVisible }: InputPasswordEyeProps) => {
  return (
    <button
      name={name}
      className='focus:outline-none opacity-50'
      type='button'
      onClick={() => toggleVisible(name, isVisible)}
      aria-label='toggle password visibility'
    >
      <Image
        src={isVisible ? '/images/icons/eye-open.svg' : '/images/icons/eye-close.svg'}
        alt={isVisible ? 'eye-open' : 'eye-close'}
        width={20}
        height={20}
      />
    </button>
  )
}

export default InputPasswordEye
