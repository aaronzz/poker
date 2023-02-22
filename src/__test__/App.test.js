import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the App component', () => {
    window.HTMLElement.prototype.scrollIntoView = function() {};
    render(<App />);
    expect(screen.getByText(/Texas Hold'em Hand Ranker/i)).toBeInTheDocument();
  });

  it('adds a user to the table when the "Add User" button is clicked', () => {
    render(<App />);
    const nameInput = screen.getByTestId('userNameInput');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.click(screen.getByText('Add User'));
    expect(screen.getByText('John Cards')).toBeInTheDocument();
  });

  it('displays an error message if user tries to add a user with an empty name', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App />);
    fireEvent.click(screen.getByTestId('addUserButtonTest'));
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('can not add user with no name');

  });

  it('displays an error message if user tries to add a user with a duplicate name', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App />);
    const nameInput = screen.getByTestId('userNameInput');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.click(screen.getByText('Add User'));
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.click(screen.getByText('Add User'));
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('User already exists');
  });

  it('should not calculate result if the selected cards are not valid', () => {
    render(<App />);
    const calculateRankButton = screen.getByText(/Calculate Result/i);
    fireEvent.click(calculateRankButton);
    expect(screen.queryByText(/Rank Result/i)).not.toBeInTheDocument();
  });

  it('should calculate result if the selected cards are valid', () => {
    render(<App />);
    const tableCard1 = screen.getAllByAltText('card')[0];
    const tableCard2 = screen.getAllByAltText('card')[1];
    const tableCard3 = screen.getAllByAltText('card')[2];
    const tableCard4 = screen.getAllByAltText('card')[3];
    const tableCard5 = screen.getAllByAltText('card')[4];
    fireEvent.click(tableCard1);
    fireEvent.click(tableCard2);
    fireEvent.click(tableCard3);
    fireEvent.click(tableCard4);
    fireEvent.click(tableCard5);

    const nameInput = screen.getByTestId('userNameInput');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.click(screen.getByText('Add User'));
    fireEvent.change(nameInput, { target: { value: 'Mary' } });
    fireEvent.click(screen.getByText('Add User'));
    const calculateRankButton = screen.getByText(/Calculate Result/i);
    fireEvent.click(calculateRankButton);
  });
});
