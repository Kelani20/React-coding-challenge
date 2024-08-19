import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PhotoGrid from './PhotoGrid';
import { fetchPhotos } from '../lib/unsplash';

jest.mock('../lib/unsplash');

// Test for initial photo grid rendering and photo loading
test('renders photo grid and loads initial photos', async () => {
    fetchPhotos.mockResolvedValue([{ id: 1, urls: { regular: 'http://example.com/photo.jpg' }, description: 'Sample photo' }]);
    render(<PhotoGrid />);
    expect(await screen.findByAltText('Sample photo')).toBeInTheDocument();
});

// Test for opening and closing the Lightbox
test('lightbox opens and can be closed', async () => {
    fetchPhotos.mockResolvedValue([{ id: 1, urls: { regular: 'http://example.com/photo.jpg' }, description: 'Sample photo' }]);
    render(<PhotoGrid />);
    
    fireEvent.click(screen.getByAltText('Sample photo'));
    expect(screen.getByText('Sample photo')).toBeInTheDocument();

    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText('Sample photo')).toBeNull();
});

// Test for handling photo clicks
test('clicking on a photo opens the Lightbox', async () => {
    fetchPhotos.mockResolvedValue([{ id: 1, urls: { regular: 'http://example.com/photo.jpg' }, description: 'Sample photo' }]);
    render(<PhotoGrid />);
    await waitFor(() => screen.getByAltText('Sample photo'));
    fireEvent.click(screen.getByAltText('Sample photo'));
    expect(screen.getByText('Sample photo')).toBeInTheDocument(); 
});

// Test for error handling when photo fetch fails
test('displays error message on fetch failure', async () => {
    fetchPhotos.mockRejectedValue(new Error('Failed to fetch'));
    render(<PhotoGrid />);
    await waitFor(() => screen.getByText('Error: Failed to load photos.'));
    expect(screen.getByText('Error: Failed to load photos.')).toBeInTheDocument();
});
