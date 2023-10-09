import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocationPin, NewSpot } from '../Types';

export const spotsApi = createApi({
  reducerPath: 'spotsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BACKEND_BASE_URL}:3000/`}),
  endpoints: builder => {
    return {
      getLondonSpots: builder.query<LocationPin[], void>({
        query: () => 'london',
      }),
      postSpot: builder.mutation<LocationPin, NewSpot>({
        query: newSpot => ({
          url: 'london',
          method: 'POST',
          body: newSpot,
        }),
      }),
      getOneSpot: builder.query<LocationPin, string>({
        query: id => `london/details/${id}`
      }),
    };
  },
});

export const {
  useGetLondonSpotsQuery,
  useGetOneSpotQuery,
  usePostSpotMutation
} = spotsApi;