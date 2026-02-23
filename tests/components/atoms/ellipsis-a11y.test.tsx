import { render, screen } from '@testing-library/react'
import { PaginationEllipsis } from '@/components/atoms/pagination'
import { BreadcrumbEllipsis } from '@/components/atoms/breadcrumb'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('Ellipsis Accessibility', () => {
  it('PaginationEllipsis should be accessible', () => {
    const { container } = render(<PaginationEllipsis />)

    // The text "More pages" should be visible to screen readers.
    expect(screen.getByText('More pages')).toBeInTheDocument()

    // The icon should be hidden from screen readers explicitly
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('BreadcrumbEllipsis should be accessible', () => {
    const { container } = render(<BreadcrumbEllipsis />)

    // The text "More" should be visible to screen readers.
    expect(screen.getByText('More')).toBeInTheDocument()

    // The icon should be hidden from screen readers explicitly
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
