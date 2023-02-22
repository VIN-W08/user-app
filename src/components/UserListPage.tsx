/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { createStyles } from '../helper/createStyles'
import { routes } from '../router/routes'
import { AppButton } from './common/AppButton'
import { AppTable, TableLayout } from './common/table/AppTable'

const tableLayout: TableLayout = [
    {
        label: 'Name',
        prop: 'name',
        type: 'text',
        minWidth: 120
    },
    {
        label: 'eKTP',
        prop: 'eKTPNum',
        type: 'text',
        minWidth: 120
    },
    {
        label: 'Address',
        prop: 'address',
        type: 'text'
    },
    {
        label: 'Job',
        prop: 'job',
        type: 'text',
        minWidth: 120
    },
    {
        label: 'Date of Birth',
        prop: 'dateOfBirth',
        type: 'date',
        minWidth: 120
    },
    {
        label: 'Phone Number',
        prop: 'phoneNum',
        type: 'list-text',
        minWidth: 120
    },
    {
        label: 'Family',
        prop: '',
        type: 'family-button'
    }
]

const UserListPage = () => {
    const navigate = useNavigate()
    const { userList } = useAppSelector(state => state.user)

    const navigateToCreateUserPage = () => navigate(routes.createUser)
    return (
        <div css={styles.container}>
            <div css={styles.topBlock}>
                <Typography css={styles.listUsersTitle}>List Users</Typography>
                <AppButton
                    label='Create New Users'
                    onClick={navigateToCreateUserPage}
                />
            </div>
            {userList.length > 0 ?
                <AppTable
                    layout={tableLayout}
                    data={userList.map((user, idx) => ({ ...user, id: idx }))}
                    keyProp='id'
                /> :
                <div css={styles.noUserText}>
                    <Typography>No User</Typography>
                </div>}
        </div>
    )
}

const styles = createStyles({
    container: {
        margin: 15
    },
    topBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    listUsersTitle: {
        fontWeight: 'bold'
    },
    noUserText: {
        textAlign: 'center'
    }
})

export default UserListPage