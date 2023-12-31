import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { memo, useCallback, useMemo, useState } from 'react';

interface IPaginationPropsTypes {
    currentPage: number,
    totalPages: number, 
    setPage: (value: number) => void
}

const PaginationControlled = memo(({ currentPage, totalPages, setPage }: IPaginationPropsTypes) => {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Stack spacing={2} sx={{ pt: '20px', pb: '10px' }}>
            <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
        </Stack>
    );
})

export default PaginationControlled