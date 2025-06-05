// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { render, screen, waitFor } from '@testing-library/react';
// import api from '../clients';
// import { useApiQuery } from '../hooks/useApiQuery';

// jest.mock('../clients');
// const mockedApi = api as jest.Mocked<typeof api>;

// const queryClient = new QueryClient();
// const Wrapper = ({ children }: { children: React.ReactNode }) => (
//   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// );

// const TestComponent = ({ url }: { url: string }) => {
//   const { data, error, isLoading } = useApiQuery(['test'], url);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {(error as Error).message}</div>;

//   return <div>Data: {JSON.stringify(data)}</div>;
// };

// describe('useApiQuery with token-aware api', () => {
//   beforeEach(() => {
//     queryClient.clear();
//     jest.clearAllMocks();
//   });

//   it('should render error message on fetch failure', async () => {
//     mockedApi.get.mockRejectedValueOnce(new Error('Network error'));

//     render(
//       <Wrapper>
//         <TestComponent url="/user/repos" />
//       </Wrapper>
//     );

//     // Wait for error message to appear
//     await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());

//     expect(screen.getByText(/Network error/i)).toBeInTheDocument();
//   });
// });

// __tests__/useApiQuery.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApiQuery } from "../hooks/useApiQuery"; // Adjust path as needed
import api from "../clients";

jest.mock("../clients");

const mockedApi = api as jest.Mocked<typeof api>;

const queryClient = new QueryClient();

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // prevent delays from retries
      },
    },
  });

  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
}

function TestComponent({ url }: { url: string }) {
  const { data, isError, isLoading, error } = useApiQuery(
    ["testKey"],
    url,
    { retry: false } // ✅ this disables retry in test
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError && error) return <div>Error: {(error as Error).message}</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
}

describe("useApiQuery", () => {
  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("renders loading state initially", async () => {
    mockedApi.get.mockReturnValueOnce(new Promise(() => {})); // pending promise
    render(
      <Wrapper>
        <TestComponent url="/test" />
      </Wrapper>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("renders data when fetch is successful", async () => {
    const mockData = { message: "success" };
    mockedApi.get.mockResolvedValueOnce({ data: mockData });

    render(
      <Wrapper>
        <TestComponent url="/test" />
      </Wrapper>
    );

    expect(
      await screen.findByText(/Data:.*"message":"success"/)
    ).toBeInTheDocument();
  });

  it("renders error when fetch fails", async () => {
    const error = new Error("Fetch failed");
    mockedApi.get.mockRejectedValueOnce(error);

    renderWithClient(<TestComponent url="/test" />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
      expect(screen.getByText(/Fetch failed/i)).toBeInTheDocument();
    });
  });
});
