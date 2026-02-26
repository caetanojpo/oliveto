import { render, screen, fireEvent } from '@testing-library/react'
import { WhatsAppButton } from './whatsapp-button'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('WhatsAppButton', () => {
  it('renders the floating button with accessible label', () => {
    render(<WhatsAppButton />)

    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp \(Status: Online\)/i })
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

  it('closes the popup when Escape key is pressed', () => {
    render(<WhatsAppButton />)

    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })
    fireEvent.click(mainButton)

    // Verify it's open
    expect(screen.getByRole('button', { name: /^Fechar chat do WhatsApp$/i })).toBeTruthy()

    // Press Escape
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' })

    // Verify it's closed
    expect(screen.getByRole('button', { name: /Abrir chat do WhatsApp \(Status: Online\)/i })).toBeTruthy()
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

  it('closes the popup when Escape key is pressed', () => {
    render(<WhatsAppButton />)

    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })
    fireEvent.click(mainButton)

    // Verify it is open
    expect(mainButton.getAttribute('aria-expanded')).toBe('true')

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

    // Verify it is closed
    expect(mainButton.getAttribute('aria-expanded')).toBe('false')
  })
})
