import { render, screen } from '@testing-library/react'
import { Pagination, PaginationPrevious, PaginationNext, PaginationLink, PaginationContent, PaginationItem } from './pagination'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('Pagination', () => {
  it('renders previous and next buttons', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByLabelText('Ir para a página anterior')).toBeDefined()
    expect(screen.getByLabelText('Ir para a próxima página')).toBeDefined()
    expect(screen.getByText('1')).toBeDefined()
  })
})
