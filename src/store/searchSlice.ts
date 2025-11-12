import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Anime, AnimeSearchResponse } from '../types/anime';

interface SearchState {
  query: string;
  results: Anime[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    lastVisiblePage: number;
    total: number;
  };
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    hasNextPage: false,
    lastVisiblePage: 1,
    total: 0,
  },
};

let abortController: AbortController | null = null;

export const searchAnime = createAsyncThunk(
  'search/searchAnime',
  async ({ query, page = 1 }: { query: string; page?: number }) => {
    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();

    if (!query.trim()) {
      return {
        data: [],
        pagination: {
          last_visible_page: 1,
          has_next_page: false,
          current_page: 1,
          items: { count: 0, total: 0, per_page: 25 },
        },
      } as AnimeSearchResponse;
    }

    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}&limit=12`,
        { signal: abortController.signal }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw new Error('Failed to fetch anime');
      }

      const data: AnimeSearchResponse = await response.json();
      return data;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request cancelled');
      }
      throw error;
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.pagination = initialState.pagination;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.pagination = {
          currentPage: action.payload.pagination.current_page,
          hasNextPage: action.payload.pagination.has_next_page,
          lastVisiblePage: action.payload.pagination.last_visible_page,
          total: action.payload.pagination.items.total,
        };
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.results = [];
      });
  },
});

export const { setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;