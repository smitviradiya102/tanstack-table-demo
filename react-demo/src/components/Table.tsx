import { useState } from 'react' // Removed unused React import
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  flexRender,
} from '@tanstack/react-table'
import type { Person } from './data' // Added type-only import
import { defaultData } from './data'
import { getColumns } from './columns'

export default function TableComponent() {
  const [data, setData] = useState(() => [...defaultData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null)

  const onEdit = (index: number, key: keyof Person, value: any) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [key]: value }
    setData(newData)
  }

  const table = useReactTable({
    data,
    columns: getColumns(editingRowIndex, onEdit),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: true,
  })

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl max-w-6xl mx-auto mt-10">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-2 border text-left"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {['asc', 'desc'].includes(header.column.getIsSorted() as string)
                        ? header.column.getIsSorted() === 'asc' ? '🔼' : '🔽'
                        : ''}
                    </div>
                    {header.column.getCanFilter() && (
                      <div>
                        <input
                          type="text"
                          value={(header.column.getFilterValue() ?? '') as string}
                          onChange={e => header.column.setFilterValue(e.target.value)}
                          placeholder="Filter..."
                          className="text-sm border p-1 mt-1"
                        />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-2 border">
                  {editingRowIndex === row.index ? (
                    <button onClick={() => setEditingRowIndex(null)} className="text-blue-600">✅</button>
                  ) : (
                    <button onClick={() => setEditingRowIndex(row.index)} className="text-blue-600">✏️</button>
                  )}
                </td>
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={table.getAllColumns().length + 1} className="text-center p-4 text-gray-400">
                  😕 No matching data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="space-x-2">
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="px-2 py-1 border rounded">⏮️</button>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-2 py-1 border rounded">⬅️</button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-2 py-1 border rounded">➡️</button>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="px-2 py-1 border rounded">⏭️</button>
        </div>
        <span>
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount()}
        </span>
      </div>
    </div>
  )
}