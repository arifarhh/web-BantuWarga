export type ProposalStep =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6

export type ProposalType = 'self' | 'other'

export interface ProposalFormData {
  proposerName: string
  proposerNik: string
  proposerPhone: string
  proposerAddress: string

  proposalType: ProposalType | ''

  recipientName: string
  recipientNik: string
  recipientPhone: string
  relationship: string
  recipientAddress: string

  occupation: string
  monthlyIncome: string
  dependents: string
  houseCondition: string
  housingStatus: string
  additionalInformation: string

  latitude: string
  longitude: string
  housePhoto: File | null
}

export const initialProposalData: ProposalFormData = {
  proposerName: '',
  proposerNik: '',
  proposerPhone: '',
  proposerAddress: '',

  proposalType: '',

  recipientName: '',
  recipientNik: '',
  recipientPhone: '',
  relationship: '',
  recipientAddress: '',

  occupation: '',
  monthlyIncome: '',
  dependents: '',
  houseCondition: '',
  housingStatus: '',
  additionalInformation: '',

  latitude: '',
  longitude: '',
  housePhoto: null,
}