import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITheme {
	isDark: boolean
}

const initialState: ITheme = {
	isDark: false || true,
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<boolean>) {
			state.isDark = action.payload
		},
	},
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
