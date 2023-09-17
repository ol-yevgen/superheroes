export const formateDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', 
        {
            hour12: false ,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
    )
}