import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

import type { analysisDataState } from '@/types/slicesType'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getAnalysisData = createAsyncThunk('getAnalysisData', async () => {
  try {
    const res = await axios.get(`${BASE_URL}/analysis/generate?from=2024-06-01&to=2024-06-30`)

    return res.data.analysisResult
  } catch (err: any) {
    if (err.response) {
      return err
    }

    return { err: true }
  }
})

const initialState: analysisDataState = {
  analysisResult: {
    salesVolumeTarget: 0,
    actualSalesVolume: [],
    adBudget: 0,
    allAdSpend: [],
    adSpendOnAmazon: [],
    impressions: [],
    averageProductPrice: [],
    clicks: [],
    dailyClickThroughRate: [],
    cumulativeClickThroughRate: 0,
    dailyCostPerClick: [],
    adConversionSalesVolume: [],
    adConversionRevenue: [],
    adConversionOrders: [],
    dailyConversionRate: [],
    cumulativeConversionRate: 0,
    organicSearchSalesVolume: [],
    organicSearchRevenue: [],
    totalOrders: [],
    totalRevenue: [],
    dailyReturnOnAdSpend: [],
    cumulativeReturnOnAdSpend: 0,
    dailyAdvertisingCostOfSales: [],
    cumulativeAdvertisingCostOfSales: 0,
    cumulativeAdvertisingCostOfGrossSales: 0,
    adConversionToOrganicSearchRatio: 0
  },
  success: false,
  error: false,
  isLoading: false
}

export const analysisDataSlice = createSlice({
  name: 'analysisData',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAnalysisData.pending, state => {
        state.isLoading = true
      })
      .addCase(getAnalysisData.fulfilled, (state, { payload }) => {
        state.analysisResult = { ...state.analysisResult, ...payload }
        state.isLoading = false
        state.success = true
      })
      .addCase(getAnalysisData.rejected, state => {
        state.isLoading = false
        state.error = true
      })
  }
})

export const { setLoading } = analysisDataSlice.actions
export default analysisDataSlice.reducer
