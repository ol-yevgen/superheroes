import { IHeroShortTypes } from 'types/HeroTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeroesState {
    heroes: IHeroShortTypes[] | null;
}

const initialState: HeroesState = {
    heroes: null ,
}

const heroesSlice = createSlice({
    initialState,
    name: 'heroesSlice',
    reducers: {
        getHeroes: (state, action: PayloadAction<IHeroShortTypes[]>) => {
            state.heroes = action.payload;
        }
    }
});

export default heroesSlice.reducer;

export const { getHeroes } = heroesSlice.actions;