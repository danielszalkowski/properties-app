import { render, screen } from '@testing-library/react'
import NotesList from '../components/NotesList'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { vi } from 'vitest'

vi.mock('axios')

test('renders notes list component', async () => {
    axios.get.mockResolvedValue({
        data: {
            data: [{ id: 1, title: 'nueva nota' }]
        }
    })


    render(
        <BrowserRouter>
            <NotesList />
        </BrowserRouter>
    )

    const notes = await screen.findAllByText(/nueva nota/i)
    expect(notes[1]).toBeInTheDocument()

})
