import Avatar from '@/components/Avatar'
import { FC, ReactNode, useState } from 'react'
import User from '@/types/User'
import AddReply from './components/AddReply'
import Interactions from './components/Interactions'
import Article from './components/Article'

interface Props {
  user: Pick<User, 'id' | 'email' | 'name' | 'image'> | undefined
  content: string
  createdAt: string
  header: ReactNode
}

const Remark: FC<Props> = ({ user, content, createdAt, header }) => {
  const [isShowAddReply, setIsShowAddReply] = useState<boolean>(false)

  return (
    <div className="flex gap-3 mb-3 items-start">
      <Avatar src={user?.image} alt={user?.name} width={20} height={20} />
      <div className="grow">
        <Article content={content} header={header} />
        <Interactions
          createdAt={createdAt}
          onReply={() => setIsShowAddReply(!isShowAddReply)}
          user={user}
        />
        {isShowAddReply && <AddReply onClose={() => setIsShowAddReply(false)} to={user?.name} />}
      </div>
    </div>
  )
}

export default Remark