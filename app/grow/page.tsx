import BucketHub from '@/components/BucketHub'

export const metadata = {
  title: 'Grow',
  description: 'Soil, compost, pests, and the ongoing work once things are in the ground.',
}

export default function GrowPage() {
  return <BucketHub bucket="grow" />
}
