/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { IFamilyMember, IUser, RelationshipStatus } from '../interfaces/IUser'
import { Grid, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { createStyles } from '../helper/createStyles'
import { AppTextField, InputType } from './common/AppTextField'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addUser, userActions } from '../features/userSlice'
import DatePicker from 'react-date-picker'
import { AppButton } from './common/AppButton'
import { useNavigate } from 'react-router-dom'
import { routes } from '../router/routes'
import { colors } from '../design/colors'

type LabelTextInputProps = {
    name: string,
    label: string,
    isMultiline?: boolean
    type?: InputType
}

type LabelDatePickerProps = {
    name: string,
    label: string
}

const LabelTextInput = ({
    name,
    label,
    isMultiline = false,
    type
}: LabelTextInputProps) => {
    const dispatch = useAppDispatch()
    const { userInput } = useAppSelector(state => state.user)
    const onChangeInput = (value: string, name: string) => {
        dispatch(userActions.setUserInput({
            key: name as keyof IUser,
            value: value
        }))
    }

    return (
        <div css={{
            ...styles.labelTextInputContainer,
            alignItems: !isMultiline ? 'center' : 'start'
        }}>
            <Typography css={styles.textInputLabel}>{label}</Typography>
            <AppTextField
                name={name}
                value={userInput[name as keyof IUser] as string}
                isMultiline={isMultiline}
                type={type}
                onChange={onChangeInput}
            />
        </div>
    )
}

const LabelDatePicker = ({
    name,
    label
}: LabelDatePickerProps) => {
    const dispatch = useAppDispatch()
    const { userInput } = useAppSelector(state => state.user)
    const onChangeInput = (value: Date, name: string) => {
        dispatch(userActions.setUserInput({
            key: name as keyof IUser,
            value: value
        }))
    }
    return (
        <>
            <div css={styles.labelDateInputContainer}>
                <Typography>{label}</Typography>
                <DatePicker
                    name={name}
                    value={userInput[name as keyof IUser] as Date}
                    format='d-MMM-yyyy'
                    maxDate={new Date()}

                    onChange={(date: Date) => onChangeInput(date, name)}
                    css={styles.datePicker}
                />
            </div>
        </>
    )
}

const PhoneNumListInput = () => {
    const [phoneNumList, setPhoneNumList] = useState([0, 0].map(() => ''))
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(userActions.setUserInput({
            key: 'phoneNum',
            value: phoneNumList.filter(phoneNum => phoneNum.trim() !== '')
        }))
    }, [phoneNumList])

    const onChangeField = (idx: number, value: string) => {
        const newPhoneNumList = [...phoneNumList]
        newPhoneNumList[idx] = value
        setPhoneNumList(newPhoneNumList)
    }

    const addInputField = () => setPhoneNumList([...phoneNumList, ''])

    return (
        <div css={styles.phoneNumInputContainer}>
            <Typography css={styles.phoneNumInputLabel}>Phone</Typography>
            <div css={styles.phoneNumFieldContainer}>
                {phoneNumList.map((phoneNum: string, idx: number) => {
                    return (
                        <AppTextField
                            key={`phone-num-${idx}`}
                            name='phoneNum'
                            value={phoneNum}
                            type='number'
                            onChange={(value) => onChangeField(idx, value)}
                            css={styles.phoneNumField}
                        />
                    )
                })}
                <AppButton
                    label='Add Phone'
                    onClick={addInputField}
                    css={styles.addPhoneButton}
                />
            </div>
        </div>
    )
}

const familyMemberTableLabelList = ['Name', 'Date Of Birth', 'Relationship Status']
const FamilyMemberListInput = () => {
    const [memberList, setMemberList] = useState<IFamilyMember[]>(
        [0, 0].map(() => ({
            name: '',
            dateOfBirth: null,
            relationshipStatus: null
        })))
    const dispatch = useAppDispatch()
    const { userInput, relationshipStatusList } = useAppSelector(state => state.user)

    const validateMemberInput = (member: IFamilyMember): boolean => {
        return (member.name.trim() !== '' &&
            member.dateOfBirth !== null &&
            member.relationshipStatus !== null &&
            member.relationshipStatus.trim() !== '')
    }

    useEffect(() => {
        dispatch(userActions.setUserInput({
            key: 'familyMemberList',
            value: memberList.filter((member, idx) => validateMemberInput(member))
        }))
    }, [memberList])

    const onChangeField = (idx: number, value: IFamilyMember) => {
        const newMemberList = [...memberList]
        newMemberList[idx] = value
        setMemberList(newMemberList)
    }

    const addInputField = () =>
        setMemberList([...memberList, {
            name: '',
            dateOfBirth: null,
            relationshipStatus: null
        }])

    return (
        <div css={styles.familyMemberListInputContainer}>
            <Typography css={styles.familyMemberListTitle}>
                {`Family Member (${userInput.familyMemberList.length})`}
            </Typography>
            <TableContainer css={styles.familyMemberTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {familyMemberTableLabelList.map((label, idx) => (
                                <TableCell key={`label-${idx}`}>{label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {memberList.map((member, idx) => (
                            <TableRow key={`member-${idx}`}>
                                <TableCell>
                                    <AppTextField
                                        name='memberName'
                                        value={member.name}
                                        onChange={(value) => onChangeField(idx, { ...member, name: value })}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        value={member.dateOfBirth}
                                        format='d-MMM-yyyy'
                                        maxDate={new Date()}
                                        onChange={(date: Date) => onChangeField(idx, { ...member, dateOfBirth: date })}
                                        css={styles.datePicker}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={member.relationshipStatus ?? ''}
                                        onChange={(event) => onChangeField(idx, { ...member, relationshipStatus: event.target.value as RelationshipStatus })}
                                        css={styles.statusSelector}
                                    >
                                        <MenuItem value=''>None</MenuItem>
                                        {relationshipStatusList.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {`${status.charAt(0).toUpperCase() + status.slice(1)}`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AppButton
                label='Add Family Member'
                onClick={addInputField}
                css={styles.addFamilyMemberButton}
            />
        </div>
    )
}

const CreateUserPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            dispatch(userActions.initUser())
        }
    }, [])

    const onSubmit = async () => {
        const response = await dispatch(addUser())
        if (response.meta.requestStatus === 'fulfilled') {
            navigate(routes.userList)
        }
    }

    return (
        <div css={styles.container}>
            <div css={styles.formContainer}>
                <h4 css={styles.formTitle}>Create New User</h4>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <LabelTextInput
                            name='name'
                            label='Name'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <PhoneNumListInput />
                    </Grid>
                    <Grid item xs={6}>
                        <LabelTextInput
                            name='address'
                            label='Address'
                            isMultiline
                        />
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={6}>
                        <LabelTextInput
                            name='eKTPNum'
                            label='eKTP'
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={6}>
                        <LabelTextInput
                            name='job'
                            label='Job'
                        />
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={6}>
                        <LabelDatePicker
                            name='dateOfBirth'
                            label='Date of Birth'
                        />
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={8}>
                        <FamilyMemberListInput />
                    </Grid>
                    <div css={styles.bottomBarContainer}>
                        <AppButton
                            label='Submit'
                            onClick={onSubmit}
                            css={styles.submitButton}
                        />
                    </div>
                </Grid>
            </div>
        </div>
    )
}

const styles = createStyles({
    container: {
        margin: 15
    },
    formContainer: {
        width: 900
    },
    formTitle: {
        marginBottom: 15
    },
    labelTextInputContainer: {
        display: 'grid',
        columns: 8,
        gridTemplateColumns: '2fr 6fr',
    },
    labelDateInputContainer: {
        display: 'grid',
        columns: 8,
        gridTemplateColumns: '2fr 6fr',
        alignItems: 'center'
    },
    textInputLabel: {
        marginRight: 15
    },
    phoneNumInputContainer: {
        display: 'flex',
        justifyContent: 'row',
    },
    phoneNumInputLabel: {
        marginRight: 15
    },
    phoneNumFieldContainer: {
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column'
    },
    phoneNumField: {
        marginBottom: 10
    },
    familyMemberListInputContainer: {
        margin: '30px 0'
    },
    familyMemberListTitle: {
        fontWeight: 'bold',
        marginBottom: 15
    },
    familyMemberTable: {
        marginBottom: 15,
        border: '1px solid',
        borderColor: colors.ChineseWhite
    },
    statusSelector: {
        width: '100%',
        height: 40
    },
    bottomBarContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'end'
    },
    addPhoneButton: {
        width: 150
    },
    addFamilyMemberButton: {
        width: 200
    },
    submitButton: {
        width: 150
    },
    datePicker: {
        fontSize: 14,
        height: 40
    }
})

export default CreateUserPage