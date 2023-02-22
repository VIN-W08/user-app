/** @jsxImportSource @emotion/react */
import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../../../design/colors'
import { createStyles } from '../../../helper/createStyles'
import { CellContent, CellType } from './CellContent'

export type TableLayout = {
    label: string
    prop: string
    type: CellType
    minWidth?: number
}[]

type Props = {
    layout: TableLayout,
    data: any[],
    keyProp: string,
    onClick?: (id: number, name: string) => void
}

const AppTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: colors.ColumbiaBlue,
    },
    '&:nth-of-type(even)': {
        backgroundColor: colors.BrightGray,
    },
}))

const AppTableHead = styled(TableHead)(() => ({
    backgroundColor: colors.HanBlue
}))

export const AppTable = ({
    layout,
    data,
    keyProp,
    onClick
}: Props) => {
    const AppTableHeader = () => {
        return (
            <AppTableHead>
                <TableRow>
                    {layout.map((col, idx) => (
                        <TableCell
                            key={`head-${idx}`}
                            css={{
                                minWidth: col.minWidth ? col.minWidth : 100
                            }}>
                            <Typography css={styles.labelText}>
                                {col.label}
                            </Typography>
                        </TableCell>
                    ))}
                </TableRow>
            </AppTableHead>
        )
    }

    const AppTableBody = () => {
        return (
            <TableBody>
                {data.map((row, idx) => (
                    <AppTableRow key={`row-${idx}`}>
                        {layout.map((col, idx) => (
                            <TableCell
                                key={`cell-${idx}`}
                                css={{
                                    minWidth: col.minWidth ? col.minWidth : 100
                                }}
                            >
                                <CellContent
                                    data={row}
                                    keyProp={keyProp}
                                    prop={col.prop}
                                    type={col.type}
                                    onClick={onClick}
                                />
                            </TableCell>
                        ))}
                    </AppTableRow>
                ))}
            </TableBody>
        )
    }

    return (
        <TableContainer css={styles.tableContainer}>
            <Table>
                <AppTableHeader />
                <AppTableBody />
            </Table>
        </TableContainer>
    )
}

const styles = createStyles({
    tableContainer: {
        border: '1px solid',
        borderColor: colors.ChineseWhite
    },
    labelText: {
        fontWeight: 'bold',
        color: colors.AntiFlashWhite
    }
})