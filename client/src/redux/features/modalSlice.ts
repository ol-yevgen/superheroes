import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
    isModal: boolean
}

const initialState: ModalState = {
    isModal: false
}

const modalSlice = createSlice({
    initialState,
    name: 'modalSlice',
    reducers: {
        setModal: (state) => {
            state.isModal = !state.isModal
        },
    }
});

export default modalSlice.reducer;

export const { setModal } = modalSlice.actions;