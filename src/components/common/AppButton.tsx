/** @jsxImportSource @emotion/react */
import { Button, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../../design/colors'
import { createStyles } from '../../helper/createStyles'

type Props = {
    label: string,
    onClick: () => void,
    className?: string | undefined
}

export const AppButton = ({
    label,
    onClick,
    className
}: Props) => {
    return (
        <Button
            onClick={onClick}
            css={styles.container}
            className={className}
        >
            <Typography>{label}</Typography>
        </Button>
    )
}

const styles = createStyles({
    container: {
        backgroundColor: colors.HanBlue,
        color: colors.AntiFlashWhite,
        '&:hover': {
            backgroundColor: colors.SilverLakeBlue,
        }
    },
})