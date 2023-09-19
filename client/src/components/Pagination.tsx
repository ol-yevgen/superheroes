import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

interface IPaginationPropsTypes {
    currentPage: number,
    totalPages: number, 
    setPage: (value: number) => void
}

export const PaginationControlled = ({ currentPage, totalPages, setPage }: IPaginationPropsTypes) => {
    // const totalPages = Math.round(heroesListLength / 5)
    // const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Stack spacing={2} sx={{py: '20px'}}>
            <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
        </Stack>
    );
}