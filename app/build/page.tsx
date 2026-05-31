import BucketHub from '@/components/BucketHub'

export const metadata = {
  title: 'Build',
  description: 'Beds, water systems, and structures. The math and the parts list before you cut anything.',
}

export default function BuildPage() {
  return <BucketHub bucket="build" />
}
