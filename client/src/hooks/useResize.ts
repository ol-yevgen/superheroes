'use client'

import { useState, useEffect } from 'react';
import {
    SCREEN_S, SCREEN_SM, SCREEN_MD, SCREEN_LG, SCREEN_L, SCREEN_XL, SCREEN_XXL, SCREEN_XXXL
} from 'helpers/constBreakpoints';

export const useResize = () => {
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        setWidth(window.innerWidth)

        const handleResize = (event: any) => {
            setWidth(event.target.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])

    return {
        width,
        isScreenS: width >= SCREEN_S,
        isScreenSm: width >= SCREEN_SM,
        isScreenMd: width >= SCREEN_MD,
        isScreenLg: width >= SCREEN_LG,
        isScreenL: width >= SCREEN_L,
        isScreenXl: width >= SCREEN_XL,
        isScreenXxl: width >= SCREEN_XXL,
        isScreenXxxl: width >= SCREEN_XXXL,
    };
};