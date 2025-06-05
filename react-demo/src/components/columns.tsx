import { createColumnHelper } from '@tanstack/react-table'
import type { Person } from './data' // Changed to type-only import

const columnHelper = createColumnHelper<Person>()

export const getColumns = (
  editingRowIndex: number | null, 
  onEdit: (index: number, key: keyof Person, value: any) => void
) => [
  {
    id: 'select',
    header: () => <input type="checkbox" disabled />,
    cell: ({ row }: { row: any }) => ( // Added type annotation
      <input 
        type="checkbox" 
        checked={row.getIsSelected()} 
        onChange={row.getToggleSelectedHandler()} 
      />
    ),
  },
  {
    id: 'index',
    header: '#',
    cell: (info: { row: { index: number } }) => info.row.index + 1, // Added type annotation
  },
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info: { row: { index: number }, getValue: () => string }) => ( // Added type annotation
      info.row.index === editingRowIndex ? (
        <input 
          value={info.getValue()} 
          onChange={(e) => onEdit(info.row.index, 'name', e.target.value)} 
          className="border px-1" 
        />
      ) : (
        info.getValue()
      )
    ),
    enableColumnFilter: true,
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info: { row: { index: number }, getValue: () => number }) => ( // Added type annotation
      info.row.index === editingRowIndex ? (
        <input 
          value={info.getValue()} 
          type="number" 
          onChange={(e) => onEdit(info.row.index, 'age', Number(e.target.value))} 
          className="border px-1 w-16" 
        />
      ) : (
        info.getValue()
      )
    ),
    enableColumnFilter: true,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info: { row: { index: number }, getValue: () => string }) => ( // Added type annotation
      info.row.index === editingRowIndex ? (
        <input 
          value={info.getValue()} 
          onChange={(e) => onEdit(info.row.index, 'email', e.target.value)} 
          className="border px-1" 
        />
      ) : (
        info.getValue()
      )
    ),
    enableColumnFilter: true,
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: (info: { row: { index: number }, getValue: () => string }) => ( // Added type annotation
      info.row.index === editingRowIndex ? (
        <input 
          value={info.getValue()} 
          onChange={(e) => onEdit(info.row.index, 'phone', e.target.value)} 
          className="border px-1" 
        />
      ) : (
        info.getValue()
      )
    ),
    enableColumnFilter: true,
  }),
]