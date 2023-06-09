import { ChangeEventHandler, forwardRef } from 'react'

interface Props {
  className: string
  placeholder: string
  onChange: ChangeEventHandler
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, placeholder, onChange, ...props }, ref) => {
    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      const textarea = event.target
      textarea.style.height = '0px'
      textarea.style.height = `${textarea.scrollHeight}px`
      onChange(event)
    }

    return (
      <textarea
        ref={ref}
        className={`resize-none my-3 w-full ${className}`}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleChange}
        rows={1}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
