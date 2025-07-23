import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import TaskManager from '../components/TaskManager.jsx';

// mock axios
jest.mock('axios');

describe('TaskManager Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form inputs and button', () => {
    render(<TaskManager />);
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  test('displays loading and fetched tasks', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Task One', description: 'Desc One', completed: false },
      ],
    });

    render(<TaskManager />);
    expect(screen.getByText(/Loading tasks.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Task One')).toBeInTheDocument();
    });
  });

  test('handles no tasks case', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<TaskManager />);
    await waitFor(() => {
      expect(screen.getByText(/No tasks found/i)).toBeInTheDocument();
    });
  });

  test('adds a new task on form submit', async () => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({});

    render(<TaskManager />);

    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { name: 'title', value: 'New Task' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { name: 'description', value: 'New Desc' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/tasks',
        { title: 'New Task', description: 'New Desc' }
      );
    });
  });

  test('marks task as done', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ id: 2, title: 'Task Two', description: 'Desc Two' }],
    });
    axios.get.mockResolvedValueOnce({ data: [] }); // after marking as done
    axios.put.mockResolvedValue({});

    render(<TaskManager />);
    await waitFor(() => screen.getByText('Task Two'));

    fireEvent.click(screen.getByText('Done'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:5000/tasks/2/complete'
      );
    });
  });
});
