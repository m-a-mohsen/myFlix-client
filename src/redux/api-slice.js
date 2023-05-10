/* eslint-disable indent */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = localStorage.getItem('token');

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://moviesapi2.onrender.com/',
        prepareHeaders(headers) {
            headers.set('Authorization', `Bearer ${token}`);
            return headers || null;
        },
    }),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: () => 'movies/',
        }),
    }),
});
