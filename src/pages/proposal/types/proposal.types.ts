
export type ProposalStep =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6

export type ProposalType = 'self' | 'other'

export interface ProposalFormData {
  // Identitas pengusul
  proposerName: string
  proposerNik: string
  proposerPhone: string
  proposerAddress: string

  // Data calon penerima
  proposalType: ProposalType | ''
  recipientName: string
  recipientNik: string
  recipientPhone: string
  relationship: string
  recipientAddress: string

  // Kondisi ekonomi
  occupation: string
  monthlyIncome: string
  dependents: string
  houseCondition: string
  housingStatus: string
  additionalInformation: string

  // Bukti pendukung
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

  housePhoto: null,
}