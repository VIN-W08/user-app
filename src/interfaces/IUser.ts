export type RelationshipStatus = 'brother' | 'sister' | 'parent' | 'child'

export interface IUser {
    name: string
    eKTPNum: string
    address: string
    job: string
    dateOfBirth: Date | null
    phoneNum: string[]
    familyMemberList: IFamilyMember[]
}

export interface IFamilyMember {
    name: string
    dateOfBirth: Date | null
    relationshipStatus: RelationshipStatus | null
}