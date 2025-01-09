import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const carsApi = createApi({
    reducerPath: 'carsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
    endpoints: (builder) => ({
        getCars: builder.query({
            query: () => `cars`,
        }),
        postCar: builder.mutation({
            query: (newCar) => ({
                method: "POST",
                url: "cars",
                body: newCar,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }),
        deleteCar: builder.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `cars/${id}`,
            })
        })
    }),
})

export const { useGetCarsQuery, usePostCarMutation, useDeleteCarMutation } = carsApi
