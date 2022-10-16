import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SocialButtons from './SocialButtons';

describe('<SocialButtons />', () => {
  test('it should mount', () => {
    render(<SocialButtons />);
    
    const socialButtons = screen.getByTestId('SocialButtons');

    expect(socialButtons).toBeInTheDocument();
  });
});