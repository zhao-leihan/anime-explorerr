import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Anime, AnimeDetailResponse } from '../types/anime';

interface DetailState {
  anime: Anime | null;
  loading: boolean;
  error: string | null;
}

const initialState: DetailState = {
  anime: null,
  loading: false,
  error: null,
};

export const fetchAnimeDetail = createAsyncThunk(
  'detail/fetchAnimeDetail',
  async (id: string) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error('Failed to fetch anime details');
    }

    const data: AnimeDetailResponse = await response.json();
    return data.data;
  }
);

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.anime = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.anime = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearDetail } = detailSlice.actions;
export default detailSlice.reducer;