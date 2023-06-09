/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { IoClose } from 'react-icons/io5'

export enum Overlay {
  Dark = 'Dark',
  Light = 'Light',
}

export enum Position {
  Center = 'Center',
  Top = 'Top',
}

export enum Size {
  Normal = 'Normal',
  Large = 'Large',
}

interface Props {
  children: ReactNode
  onClose: () => void
  overlay?: Overlay
  size?: Size
  enableCloseButton?: boolean
  position?: Position
}

const ResponsiveModal: FC<Props> = ({
  children,
  onClose,
  enableCloseButton = false,
  overlay = Overlay.Dark,
  size = Size.Normal,
  position = Position.Top,
}) =>
  ReactDOM.createPortal(
    <>
      <div
        className={classNames(
          'fixed',
          'top-0',
          'bottom-0',
          'left-0',
          'right-0',
          'justify-center',
          'z-50',
          'hidden',
          'md:flex',
          overlay === Overlay.Dark && ['bg-[#131313]/50'],
          overlay === Overlay.Light && ['md:bg-[#fff]/80']
        )}
        onClick={onClose}
        onKeyDown={onClose}
      >
        <div
          className={classNames(
            'bg-background',
            'rounded',
            'p-7',
            'w-[390px]',
            overlay === Overlay.Light && ['shadow-[0_2px_50px_8px_rgba(234,234,234,1)]'],
            size === Size.Normal && ['md:w-[660px]'],
            size === Size.Large && ['md:w-[900px]'],
            position === Position.Top && ['absolute', 'top-[65px] md:top-[160px]']
          )}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {enableCloseButton && (
            <div className="relative">
              <button type="button" className="absolute right-0" onClick={onClose}>
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
      <div
        className={classNames(
          'fixed',
          'top-0',
          'bottom-0',
          'left-0',
          'right-0',
          'w-full',
          'h-screen',
          'z-50',
          'bg-background',
          'overflow-hidden',
          'md:hidden'
        )}
      >
        <div className="relative">
          <button type="button" className="absolute right-6 top-6 text-2xl" onClick={onClose}>
            <IoClose className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </>,
    document.querySelector('#modal') as Element
  )

export default ResponsiveModal
