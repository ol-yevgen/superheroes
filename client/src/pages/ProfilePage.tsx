import { FC, useCallback, useContext, useEffect, useState } from "react"
import { Spinner } from "../components"
import { Box, Container, Typography } from "@mui/material"

interface UserInfo {
    doneTasks: number | null,
    inProgressTasks: number | null,
    totalTasks: number | null,
    userEmail: string | null,
}

export const ProfilePage: FC = () => {
    return (
        <>
            Profile Page
        </>
    )
}