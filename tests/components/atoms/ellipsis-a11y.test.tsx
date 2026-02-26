import { render, screen } from '@testing-library/react'
import { Breadcrumb, BreadcrumbEllipsis } from '@/components/atoms/breadcrumb'
import { PaginationEllipsis } from '@/components/atoms/pagination'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('Ellipsis Accessibility', () => {
  it('PaginationEllipsis contains localized sr-only text', () => {
    render(<PaginationEllipsis />)
    expect(screen.getByText('Mais páginas')).toBeInTheDocument()
  })

  it('BreadcrumbEllipsis contains localized sr-only text', () => {
    render(<BreadcrumbEllipsis />)
    // This test ensures we have localized the "More" text to "Mais itens"
    expect(screen.getByText('Mais itens')).toBeInTheDocument()
  })
})

describe('Breadcrumb Accessibility', () => {
  it('Breadcrumb navigation has localized label', () => {
    render(<Breadcrumb />)
    // This test ensures the aria-label is localized
    expect(screen.getByRole('navigation', { name: /Navegação estrutural/i })).toBeInTheDocument()
  })
})
