import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import { Box, CardActionArea, CardMedia } from '@mui/material';
import { IImageListResponseTypes } from 'types/HeroTypes';
import { setModal } from 'redux/features/modalSlice'
import { useAppDispatch } from 'redux/store';

interface ISwiperPropsTypes {
    imagesList: IImageListResponseTypes[] | [] | undefined,
    handleOpenClose: (link: string) => void
}

export const PaginationSwiper = ({ imagesList, handleOpenClose }: ISwiperPropsTypes) => {
    const swiperList = JSON.parse(JSON.stringify(imagesList)).slice(1) as IImageListResponseTypes[]
    const dispatch = useAppDispatch()

    const openModal = (link: string) => {
        handleOpenClose(link)
        dispatch(setModal())
    }

    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
            >
                {swiperList.map((image: IImageListResponseTypes) => {
                    return (
                        <SwiperSlide key={image._id}>
                            <CardActionArea onClick={() => openModal(image.link)}>
                                <Box sx={{ height: '100%' }}>
                                    <CardMedia
                                        component='img'
                                        width='100%'
                                        height='200px'
                                        image={image.link}
                                        alt={image.link}
                                    />
                                </Box>
                            </CardActionArea>

                        </SwiperSlide>
                    )
                })}
            </Swiper>
            
        </>
    )
}