/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material'
import React from 'react'
import { createStyles } from '../helper/createStyles'

export const TopBar = () => {
    return (
        <div css={styles.container}>
            <Typography variant='h6' css={styles.logo}> LOGO</Typography>
            <hr />
        </div>
    )
}

const styles = createStyles({
    container: {
        padding: 15
    },
    logo: {
        marginBottom: 15,
        fontWeight: 'bold'
    }
})