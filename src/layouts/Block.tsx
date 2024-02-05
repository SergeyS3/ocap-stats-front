import { PropsWithChildren } from 'react'
import './Block.css'


type Props = PropsWithChildren<{
  fullWidth?: boolean
}>

const Block = ({ children, fullWidth = false }: Props) =>
  <div className={`block ${fullWidth ? 'full-width' : ''}`}>
    {children}
  </div>

export default Block
