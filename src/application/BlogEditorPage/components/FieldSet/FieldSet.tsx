import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import dynamic from 'next/dynamic'
import NakedInput from '@/components/NakedInput'
import Tags from './components/Tags'

const EditorBlock = dynamic(() => import('./components/Editor'), {
  ssr: false,
})

interface Props {
  tags: string[]
  onTagsChange: (tags: string[]) => void
}

const FieldSet: FC<Props> = ({ tags, onTagsChange }) => {
  const { register } = useFormContext()

  return (
    <div className="bg-background py-16 px-20 grow flex flex-col">
      <NakedInput
        className="placeholder:text-placeholder-400 text-[2rem] mb-3"
        placeholder="Give this blog a title"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('title', {
          required: true,
        })}
      />
      <NakedInput
        className="placeholder:text-placeholder-400 mb-5"
        placeholder="A short description to attract others attention"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('description')}
      />
      <Tags tags={tags} onTagsChange={onTagsChange} />
      <hr className="border-t-2 border-outline mb-5" />
      <div className="prose max-w-none">
        <EditorBlock />
      </div>
    </div>
  )
}

export default FieldSet
