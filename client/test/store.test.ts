import { useProductStore } from "../store/useProductStore";
import { act } from "@testing-library/react";

// Mock fetch globally
global.fetch = jest.fn();

describe("useProductStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useProductStore.setState({
      product: null,
      basketCount: 0,
    });
    (global.fetch as jest.Mock).mockClear();
  });

  test("should have initial state", () => {
    const state = useProductStore.getState();
    expect(state.product).toBeNull();
    expect(state.basketCount).toBe(0);
  });

  test("should add items to basket", () => {
    act(() => {
      useProductStore.getState().addToBasket(3);
    });
    expect(useProductStore.getState().basketCount).toBe(3);

    act(() => {
      useProductStore.getState().addToBasket(2);
    });
    expect(useProductStore.getState().basketCount).toBe(5);
  });

  test("should fetch product successfully", async () => {
    const mockProduct = {
      id: "1",
      name: "Test Product",
      price: 1000,
      quantity: 1,
      img_url: "test.jpg",
      power: "10W",
      description: "Test description",
      brand: "Test Brand",
      weight: 100,
      height: 10,
      width: 10,
      length: 10,
      model_code: "TEST",
      colour: "White",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        data: {
          Product: mockProduct,
        },
      }),
    });

    await act(async () => {
      await useProductStore.getState().fetchProduct(1);
    });

    expect(useProductStore.getState().product).toEqual(mockProduct);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/graphql",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("query"),
      })
    );
  });

  test("should handle fetch error", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await act(async () => {
      await useProductStore.getState().fetchProduct(1);
    });

    expect(useProductStore.getState().product).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch product",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
