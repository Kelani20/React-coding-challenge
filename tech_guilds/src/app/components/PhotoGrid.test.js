import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import PhotoGrid from './PhotoGrid';
import { fetchPhotos } from '../lib/unsplash';

jest.mock('../lib/unsplash');

test('renders photo grid and loads initial photos', async () => {
    fetchPhotos.mockResolvedValue([{ id: 1, urls: { regular: 'http://example.com/photo.jpg' }, description: 'Sample photo' }]);
    render(<PhotoGrid />);
    expect(await screen.findByAltText('Sample photo')).toBeInTheDocument();
});

test('lightbox opens and can be closed', async () => {
    fetchPhotos.mockResolvedValue([{ id: 1, urls: { regular: 'http://example.com/photo.jpg' }, description: 'Sample photo' }]);
    render(<PhotoGrid />);
    
    fireEvent.click(screen.getByAltText('Sample photo'));
    expect(screen.getByText('Sample photo')).toBeInTheDocument();

    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText('Sample photo')).toBeNull();
});