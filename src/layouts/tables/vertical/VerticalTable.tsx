import { NavLink } from 'react-router-dom'


export type VerticalTableRow = {
  label: string
  route?: string
  value: string | number
}

type Props = {
  label?: string
  rows: VerticalTableRow[]
  className?: string
}

const VerticalTable = ({ label, rows, className = '' }: Props) =>
  <table className={className}>
    <tbody>
      {label &&
        <tr>
          <th colSpan={2}>{label}</th>
        </tr>
      }
      {rows.map(({ label, route, value }) =>
        <tr key={label}>
          <td>
            {route
              ? <NavLink to={route}>{label}</NavLink>
              : label
            }
          </td>
          <td>{value}</td>
        </tr>,
      )}
    </tbody>
  </table>

export default VerticalTable
