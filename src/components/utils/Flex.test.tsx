import React from 'react';
import { render } from '@testing-library/react';
import Flex from './Flex';

test('renders children', () => {
    const { getByText } = render(<Flex><p>hello tester</p></Flex>);
    
    const childElement = getByText(/hello tester/i);
    expect(childElement).toBeInTheDocument();
});

test('container renders with display: flex; style.', () => {
    const { container } = render(<Flex>hello tester</Flex>);
   
    const display = container?.querySelector('div')?.style.display ?? "";
    expect(display).toBe("flex");
});