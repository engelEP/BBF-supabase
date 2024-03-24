import { IButton } from './ButtonType'

export default function Button ({ text, typeButton, colorButton, clicked = () => {} }: IButton) {
  
  const getColorButton = () => {
    return {
      RED: 'bg-red-500',
      GREEN: 'bg-teal-500',
      YELLOW: 'bg-yellow-500',
      PRIMARY: 'bg-blue-500'
    }
  }

  return(
    <button
      type={typeButton}
      onClick={clicked}
      className={`max-w-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent ${getColorButton()[colorButton]} text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
    >
      {text}
    </button>
  );
}
