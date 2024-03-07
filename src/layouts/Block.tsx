import { PropsWithChildren } from 'react'
import './Block.css'


type Props = PropsWithChildren<{
  fullWidth?: boolean
}>

const Block = ({ children, fullWidth = false }: Props) =>
  <div>
    <div className={`block ${fullWidth ? 'full-width' : ''}`}>
      {children}
    </div>
  </div>

export default Block
