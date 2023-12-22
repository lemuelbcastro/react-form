import { test, expect, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import UsersTable from './UsersTable'

vi.mock('./TableActions')
vi.mock('../hooks/useGetUsers', () => ({
  default: vi
    .fn()
    .mockReturnValue({
      data: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@email.com',
          age: 30,
          phone: '123456789',
        },
      ],
    })
    .mockReturnValueOnce({ isRefetching: true })
    .mockReturnValueOnce({ data: [] }),
}))

test('displays the loading indicator', () => {
  render(<UsersTable />)

  expect(screen.getByRole('progressbar')).toBeDefined()
})

test('displays the empty placeholder', () => {
  render(<UsersTable />)

  expect(screen.queryByText('No rows')).toBeDefined()
})

test('displays the table row', () => {
  render(<UsersTable />)

  const [, rowgroupElement] = screen.getAllByRole('rowgroup')
  const [row] = within(rowgroupElement).getAllByRole('row')
  expect(within(row).queryByText('John Doe')).toBeDefined()
  expect(within(row).queryByText('john@email.com')).toBeDefined()
  expect(within(row).queryByText('30')).toBeDefined()
  expect(within(row).queryByText('123456789')).toBeDefined()
})

test('handles select/unselect row', () => {
  render(<UsersTable />)

  let checkboxElement = screen.getByLabelText('Select row')
  fireEvent.click(checkboxElement)

  checkboxElement = screen.getByLabelText('Unselect row')
  fireEvent.click(checkboxElement)
  expect(screen.queryByLabelText('Select row')).toBeDefined()
})

test('handles select/unselect all rows', () => {
  render(<UsersTable />)

  let checkboxElement = screen.getByLabelText('Select all rows')
  fireEvent.click(checkboxElement)
  expect(screen.queryByText('1 row selected')).toBeDefined()

  checkboxElement = screen.getByLabelText('Unselect all rows')
  fireEvent.click(checkboxElement)
  expect(screen.getByLabelText('Select all rows')).toBeDefined()
  expect(screen.queryByText('1 row selected')).toBeNull()
})
