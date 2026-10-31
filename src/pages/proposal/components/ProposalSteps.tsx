
import {
  UserRound,
  Users,
  Wallet,
  MapPin,
  ClipboardCheck,
  FileText,
} from 'lucide-react'

import type { ProposalStep } from '../types/proposal.types'

interface ProposalStepsProps {
  currentStep: ProposalStep
}

const steps = [
  { number: 1, label: 'Pengantar', icon: FileText },
  { number: 2, label: 'Pengusul', icon: UserRound },
  { number: 3, label: 'Calon Penerima', icon: Users },
  { number: 4, label: 'Kondisi Ekonomi', icon: Wallet },
  { number: 5, label: 'Lokasi & Bukti', icon: MapPin },
  { number: 6, label: 'Konfirmasi', icon: ClipboardCheck },
] as const

export default function ProposalSteps({
  currentStep,
}: ProposalStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-1">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = currentStep > step.number
          const isActive = currentStep === step.number

          return (
            <div
              key={step.number}
              className="relative flex flex-1 flex-col items-center"
            >
              {index !== 0 && (
                <div
                  className={`absolute right-1/2 top-5 h-0.5 w-full ${
                    isCompleted
                      ? 'bg-[var(--green)]'
                      : 'bg-[var(--line)]'
                  }`}
                />
              )}

              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  isCompleted
                    ? 'border-[var(--green)] bg-[var(--green)] text-white'
                    : isActive
                      ? 'border-[var(--teal)] bg-[var(--teal)] text-white ring-4 ring-[var(--mint)]'
                      : 'border-[var(--line)] bg-white text-[var(--muted)]'
                }`}
              >
                <Icon size={17} />
              </div>

              <span
                className={`mt-2 hidden text-center text-xs font-medium sm:block ${
                  isActive || isCompleted
                    ? 'text-[var(--teal)]'
                    : 'text-[var(--muted)]'
                }`}
              >
                {step.label}
              </span>

              <span
                className={`mt-2 text-[10px] font-medium sm:hidden ${
                  isActive
                    ? 'text-[var(--teal)]'
                    : 'text-[var(--muted)]'
                }`}
              >
                {step.number}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
