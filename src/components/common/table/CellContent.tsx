import { Typography } from '@mui/material'
import React from 'react'
import date from 'date-and-time'
import { AppButton } from '../AppButton'

export type CellType = 'text' | 'date' | 'family-button' | 'list-text'
type Props = {
    data: any,
    keyProp: string,
    prop: string,
    type?: CellType,
    onClick?: (id: number, name: string) => void
}

export const CellContent = ({
    data,
    keyProp,
    prop,
    type = 'text',
    onClick
}: Props) => {
    if (type === 'date') {
        return <Typography>{date.format(data[prop], 'DD-MMM-YYYY')}</Typography>
    }

    if (type === 'list-text') {
        return data[prop].map((el: any) => (
            <Typography>{el}</Typography>
        ))
    }

    if (type === 'family-button') {
        return (
            <AppButton
                label={`Show (${data.familyMemberList.length})`}
                onClick={() => {
                    if (onClick) {
                        onClick(data[keyProp], 'show-family-button')
                    }
                }}
            />
        )
    }

    return (
        <Typography>{data[prop]}</Typography>
    )
}