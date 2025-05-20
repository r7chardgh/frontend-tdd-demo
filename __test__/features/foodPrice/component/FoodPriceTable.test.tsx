import { render, screen } from '@testing-library/react';
import FoodPriceTable from '@/features/foodPrice/component/FoodPriceTable';
import { promises as fs } from 'fs';

// Mock the fs module
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

describe('FoodPriceTable', () => {
  const mockData = {
    header: {
      err_code: '0000',
      success: true,
    },
    result: {
      records: [
        {
          Fd_yr: '2023',
          Fd_bread_a: '2.50',
          Fd_tobac_a: '6.00',
          Fd_coffee_a: '3.75',
          Fd_milk_a: '1.80',
          Fd_beef_a: '8.20',
          Fd_pork_a: '5.50',
          Fd_rice_a: '1.20',
          Fd_tea_a: '2.10',
          Fd_sugar_a: '0.90',
          Fd_salt_a: '0.30',
          Fd_beer_a: '2.80',
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear mocks before each test
    (fs.readFile as jest.Mock).mockReset();
  });

  it('renders table with correct headers', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

    render(await FoodPriceTable());

    const headers = [
      'year', 'bread', 'tobacco', 'coffee', 'milk', 'beef', 
      'pork', 'rice', 'tea', 'sugar', 'salt', 'beer'
    ];

    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('renders table rows with correct data', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

    render(await FoodPriceTable());

    // Check year cell (left-aligned)
    expect(screen.getByText('2023')).toBeInTheDocument();
    
    // Check some data cells (right-aligned)
    expect(screen.getByText('2.50')).toBeInTheDocument();
    expect(screen.getByText('3.75')).toBeInTheDocument();
    expect(screen.getByText('8.20')).toBeInTheDocument();
  });

  it('displays error message when data is invalid', async () => {
    const invalidData = {
      header: {
        err_code: '1000',
        success: false,
      },
      result: { records: [] },
    };

    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(invalidData));

    render(await FoodPriceTable());

    expect(screen.getByText('No data is found')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('applies correct styling to table container', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

    render(await FoodPriceTable());

    const tableContainer = screen.getByRole('table').parentElement;
    expect(tableContainer).toHaveClass('min-w-[660px]');
    expect(tableContainer).toHaveStyle({ maxHeight: '420px' });
  });

  it('handles file reading error gracefully', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('File read error'));

    await expect(FoodPriceTable()).rejects.toThrow('File read error');
  });

  it('renders correct number of table rows', async () => {
    const multiRecordData = {
      ...mockData,
      result: {
        records: [
          { ...mockData.result.records[0], Fd_yr: '2023' },
          { ...mockData.result.records[0], Fd_yr: '2024' },
        ],
      },
    };

    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(multiRecordData));

    render(await FoodPriceTable());

    const rows = screen.getAllByRole('row');
    // Includes header row + 2 data rows
    expect(rows).toHaveLength(3);
  });
});