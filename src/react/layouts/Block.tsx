import { PropsWithChildren } from 'react'
import './Block.css'


const Block = ({ children }: PropsWithChildren) =>
  <div className='block'>
    {children}
  </div>

export default Block
