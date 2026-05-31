import BucketHub from '@/components/BucketHub'

export const metadata = {
  title: 'Plan',
  description: 'Timing, layout, and what goes where. The planning tools and reading that save you a season of do-overs.',
}

export default function PlanPage() {
  return <BucketHub bucket="plan" />
}
