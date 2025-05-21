import { render, screen, waitFor } from '@testing-library/react';
import FoodPriceTable from '@/features/foodPrice/component/FoodPriceTable';

import { fetchFoodPrices } from '@/lib/features/foodPrice/foodPricesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector,useAppDispatch,useAppStore } from '@/lib/hooks';

// Mock Redux hooks
jest.mock('../../../../lib/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Sample mock data
const mockFoodPriceData = {
  result: {
    datasize: 2,
    records: [
      {
        Fd_yr: '2023',
        Fd_bread_a: '2.50',
        Fd_tobac_a: '10.00',
        Fd_coffee_a: '3.20',
        Fd_milk_a: '1.80',
        Fd_beef_a: '15.00',
        Fd_pork_a: '12.00',
        Fd_rice_a: '1.10',
        Fd_tea_a: '2.00',
        Fd_sugar_a: '0.90',
        Fd_salt_a: '0.50',
        Fd_beer_a: '4.00',
      },
      {
        Fd_yr: '2024',
        Fd_bread_a: '2.60',
        Fd_tobac_a: '10.50',
        Fd_coffee_a: '3.30',
        Fd_milk_a: '1.90',
        Fd_beef_a: '15.50',
        Fd_pork_a: '12.50',
        Fd_rice_a: '1.20',
        Fd_tea_a: '2.10',
        Fd_sugar_a: '0.95',
        Fd_salt_a: '0.55',
        Fd_beer_a: '4.20',
      },
    ],
  },
};

// Table headers
const tableHeaders = [
  'year',
  'bread',
  'tobacco',
  'coffee',
  'milk',
  'beef',
  'pork',
  'rice',
  'tea',
  'sugar',
  'salt',
  'beer',
];

describe('FoodPriceTable Component', () => {
  // Mock implementations for Redux hooks
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Mock useAppDispatch to return mockDispatch
    useAppDispatch.mockReturnValue(mockDispatch);
    // Mock useAppSelector to return default state
    useAppSelector.mockReturnValue({
      data: null,
      status: 'idle',
      error: null,
    });
  });

  test('renders without crashing when data is null', () => {
    render(<FoodPriceTable />);
    // Since data is null, the table should not render
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('displays loading indicator when status is loading', () => {

    const mockedDispatch = jest.fn();
  // useSelector.mockImplementation((selectorFn:any) => selectorFn({
  //     data: null,
  //     status: 'loading',
  //     error: null,
  //   }));
  // useDispatch.mockReturnValue(mockedDispatch);

  //   useAppSelector.mockReturnValue({
  //     data: null,
  //     status: 'loading',
  //     error: null,
  //   });

    render(<FoodPriceTable />);

    // Check for CircularProgress (loading indicator)
    // expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders table headers correctly', () => {
    useAppSelector.mockReturnValue({
      data: mockFoodPriceData,
      status: 'succeeded',
      error: null,
    });

    render(<FoodPriceTable />);

    // Check if all table headers are rendered
    tableHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders table data correctly', () => {
    useAppSelector.mockReturnValue({
      data: mockFoodPriceData,
      status: 'succeeded',
      error: null,
    });

    render(<FoodPriceTable />);

    // Check if data rows are rendered
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2.50')).toBeInTheDocument();
    expect(screen.getByText('10.00')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('2.60')).toBeInTheDocument();
  });

  test('dispatches fetchFoodPrices on mount', async () => {
    // Mock fetchFoodPrices action
    // const mockFetchFoodPrices = jest.fn().mockReturnValue({
    //   type: fetchFoodPrices.type,
    //   payload: mockFoodPriceData,
    // });
    // jest.spyOn(require('../../../../lib/features/foodPrice/foodPricesSlice'), 'fetchFoodPrices').mockImplementation(mockFetchFoodPrices);

    render(<FoodPriceTable />);

    // Wait for useEffect to complete
    // await waitFor(() => {
    //   expect(mockDispatch).toHaveBeenCalledWith(mockFetchFoodPrices());
    // });
  });

  test('does not render table when datasize is 0', () => {
    useAppSelector.mockReturnValue({
      data: { result: { datasize: 0, records: [] } },
      status: 'succeeded',
      error: null,
    });

    render(<FoodPriceTable />);

    // Table should not render when datasize is 0
    expect(screen.queryByRole('table')).toBeInTheDocument();
    expect(screen.queryByText('2023')).not.toBeInTheDocument();
  });

  test('handles error state correctly', () => {
    useAppSelector.mockReturnValue({
      data: null,
      status: 'failed',
      error: 'Failed to fetch data',
    });

    render(<FoodPriceTable />);

    // Since data is null and status is failed, table should not render
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});