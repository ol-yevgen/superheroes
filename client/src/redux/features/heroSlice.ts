import { IHeroFullInfoTypes } from 'types/HeroTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeroesState {
    hero: IHeroFullInfoTypes | null;
}

const initialState: HeroesState = {
    hero: null,
}

const heroSlice = createSlice({
    initialState,
    name: 'heroSlice',
    reducers: {
        getHero: (state, action: PayloadAction<IHeroFullInfoTypes>) => {
            state.hero = action.payload;
        }
    }
});

export default heroSlice.reducer;

export const { getHero } = heroSlice.actions;