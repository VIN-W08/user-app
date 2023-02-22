/** @jsxImportSource @emotion/react */
import React from 'react'
import { OutlinedInput } from '@mui/material'

export type InputType = 'text' | 'number'
const numberRegex = /^[0-9]*$/

type Props = {
    name: string,
    value: string,
    isMultiline?: boolean,
    maxRows?: number,
    type?: InputType,
    onChange: (value: string, name: string) => void
    className?: string | undefined
}

export const AppTextField = ({
    name,
    value,
    isMultiline = false,
    maxRows = 3,
    type = 'text',
    onChange,
    className
}: Props) => {
    return (
        <OutlinedInput
            name={name}
            value={value}
            multiline={isMultiline}
            maxRows={maxRows}
            css={{
                height: !isMultiline ? 40 : 90,
                alignItems: !isMultiline ? 'center' : 'flex-start'
            }}
            className={className}
            sx={overrideStyles.field}
            onChange={(event) => {
                if (type === 'text') {
                    onChange(event.target.value, event.target.name)
                    return
                }
                if (type === 'number' && numberRegex.test(event.target.value)) {
                    onChange(event.target.value, event.target.name)
                    return
                }
            }}
        />
    )
}

const overrideStyles = {
    field: {
        '&.MuiOutlinedInput-root .MuiOutlinedInput-input': {
            fontSize: 14
        }
    }
}