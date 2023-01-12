import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const converterApi = createApi({
    reducerPath: 'currencyConverter',
    baseQuery: fetchBaseQuery({ 
        // baseUrl: 'https://jsonplaceholder.typicode.com/',
        baseUrl: 'https://api.apilayer.com/',
        prepareHeaders: (headers, { getState }) => {
            headers.set('apikey', 'f35Rn3gfJP8rvdUZCGbi5ZwPKjbd5bZ0')
            return headers
        }
    }),
    //baseQuery: fetchBaseQuery(''),
    endpoints: (builder) => ({
        getCurrencyConversionRate: builder.query({
                query: (data) => { console.log("iupdataed:", data) 
                return `exchangerates_data/latest?symbols=${data[0]},${data[1]}&base=BDT`
                // return `todos/1`
            }
        })
    })
})

export const { useLazyGetCurrencyConversionRateQuery } = converterApi