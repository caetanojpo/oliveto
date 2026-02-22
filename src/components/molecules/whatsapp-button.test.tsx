import { render, screen, fireEvent } from '@testing-library/react'
import { WhatsAppButton } from './whatsapp-button'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('WhatsAppButton', () => {
  it('renders the floating button with accessible label', () => {
    render(<WhatsAppButton />)

    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })
    expect(mainButton).toBeTruthy()
    expect(mainButton.getAttribute('aria-expanded')).toBe('false')
  })

  it('renders the close button with accessible label when open', () => {
    render(<WhatsAppButton />)

    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })
    fireEvent.click(mainButton)

    // Main button label should change
    expect(screen.getByRole('button', { name: /^Fechar chat do WhatsApp$/i })).toBeTruthy()
    expect(mainButton.getAttribute('aria-expanded')).toBe('true')

    const closeButton = screen.getByRole('button', { name: /^Fechar chat$/i })
    expect(closeButton).toBeTruthy()
  })

  it('toggles the popup visibility', () => {
    render(<WhatsAppButton />)

    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })

    fireEvent.click(mainButton)

    const closeButton = screen.getByRole('button', { name: /^Fechar chat$/i })
    fireEvent.click(closeButton)

    // Main button label should revert
    expect(screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })).toBeTruthy()
    expect(mainButton.getAttribute('aria-expanded')).toBe('false')
  })

  it('hides the popup content from accessibility tree when closed', () => {
    render(<WhatsAppButton />)

    // Find the popup container by text inside it
    const popupText = screen.getByText('Oliveto')
    const popupContainer = popupText.closest('.absolute')

    expect(popupContainer).toBeTruthy()

    // Verify it has invisible class when closed
    expect(popupContainer?.className).toContain('invisible')
    expect(popupContainer?.getAttribute('aria-hidden')).toBe('true')

    // Open the popup
    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })
    fireEvent.click(mainButton)

    // Verify it is visible
    expect(popupContainer?.className).toContain('visible')
    expect(popupContainer?.className).not.toContain('invisible')
    expect(popupContainer?.getAttribute('aria-hidden')).toBe('false')
  })

  it('renders the popup with correct accessibility roles', () => {
    render(<WhatsAppButton />)

    const popupText = screen.getByText('Oliveto')
    const popupContainer = popupText.closest('.absolute')

    expect(popupContainer).toHaveAttribute('role', 'dialog')
    expect(popupContainer).toHaveAttribute('aria-modal', 'false')
    expect(popupContainer).toHaveAttribute('aria-label', 'Chat do WhatsApp')
  })

  it('renders the link with new tab warning for screen readers', () => {
    render(<WhatsAppButton />)

    // Open the popup first to make the link accessible
    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })
    fireEvent.click(mainButton)

    const link = screen.getByRole('link', { name: /Iniciar conversa no WhatsApp \(abre em nova aba\)/i })
    expect(link).toBeTruthy()
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('respects reduced motion preference for pulse animation', () => {
    render(<WhatsAppButton />)

    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })
    const pulseSpan = mainButton.querySelector('.animate-ping')

    expect(pulseSpan).toBeTruthy()
    expect(pulseSpan?.className).toContain('motion-reduce:hidden')
  })
})
