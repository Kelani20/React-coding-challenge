import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PhotoGrid from './PhotoGrid';
import { fetchPhotos } from '../lib/unsplash';

jest.mock('../lib/unsplash');

test('renders photo grid and loads initial photos', async () => {
    fetchPhotos.mockResolvedValue([{ id: 1, urls: { regular: 'http://example.com/photo.jpg' }, description: 'Sample photo' }]);
    render(<PhotoGrid />);
    
    await waitFor(() => {
        expect(screen.getByAltText('Sample photo')).toBeInTheDocument();
    });
});
