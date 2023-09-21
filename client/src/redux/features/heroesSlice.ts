import { IHeroFullInfoTypes, IHeroShortTypes } from 'types/HeroTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HeroesState {
    heroesShortInfo: IHeroShortTypes[];
    hero: IHeroFullInfoTypes | null;
    heroes: IHeroFullInfoTypes[]
}

const initialState: HeroesState = {
    heroesShortInfo: [],
    heroes: [],
    hero: null
}

const heroesSlice = createSlice({
    initialState,
    name: 'heroesSlice',
    reducers: {
        getHeroes: (state, action: PayloadAction<IHeroShortTypes[]>) => {
            state.heroesShortInfo = action.payload;
        },
        getHero: (state, action: PayloadAction<IHeroFullInfoTypes>) => {
            state.hero = action.payload;
        },
        createHero: (state, action: PayloadAction<any>) => {
            state.heroes.push(action.payload)
        },
        // updateHero: (state, action: PayloadAction<Form>) => {
        //     state.heroes.push(action.payload)
        // },
        deleteHero: (state, action: PayloadAction<string>) => {
            state.heroesShortInfo = state.heroesShortInfo.filter(data => data.id !== action.payload)
        }

    }
});

export default heroesSlice.reducer;

export const { getHeroes, getHero, createHero, deleteHero } = heroesSlice.actions;