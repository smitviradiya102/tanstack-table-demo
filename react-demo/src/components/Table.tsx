import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useState } from 'react'

type Person = {
  name: string
  age: number
  email: string
}

const defaultData: Person[] = [
  { name: 'Aharlie', age: 35, email: 'aharlie@example.com' },
  { name: 'Bharlie', age: 22, email: 'bharlie@example.com' },
  { name: 'Dharlie', age: 25, email: 'dharlie@example.com' },
  { name: 'Rharlie', age: 55, email: 'rharlie@example.com' },
  { name: 'Sharlie', age: 34, email: 'sharlie@example.com' },
  { name: 'Mharlie', age: 39, email: 'mharlie@example.com' },
  { name: 'Nharlie', age: 26, email: 'nharlie@example.com' },
  { name: 'Pharlie', age: 29, email: 'pharlie@example.com' },
  { name: 'Kharlie', age: 31, email: 'kharlie@example.com' },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
]

export default function Table() {
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data: defaultData,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl max-w-5xl mx-auto mt-10">
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: '🔼',
                        desc: '🔽',
                      }[header.column.getIsSorted() as string] ?? ''}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 border-b border-gray-200 text-sm text-gray-800"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-6 text-gray-400">
                  😕 No matching data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
