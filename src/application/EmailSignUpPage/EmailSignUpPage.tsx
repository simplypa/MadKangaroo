import { NextPage } from 'next'
import { FaEnvelope } from 'react-icons/fa'
import Input from '@/components/Input'
import AuthButton from '@/components/AuthButton'
import SignUpPageLayout from '@/application/SignUpPageLayout'
import OtherOptionsButton from '../AuthLayout/components/OtherOptionsButton'

const EmailSignUpPage: NextPage = () => (
  <SignUpPageLayout>
    <div className="mb-6">
      <Input placeholder="Email address" />
    </div>
    <AuthButton icon={<FaEnvelope className="text-lg" />}>Continue with Email </AuthButton>
    <OtherOptionsButton href="/sign-up">Other Sign Up Options</OtherOptionsButton>
  </SignUpPageLayout>
)

export default EmailSignUpPage
