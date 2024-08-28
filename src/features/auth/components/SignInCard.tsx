import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { FaGithub } from 'react-icons/fa6';
import { SignInFlow } from '../types';
import { useAuthActions } from '@convex-dev/auth/react';

interface SignInCardProps {
	setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
	const { signIn } = useAuthActions();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleProviderSignIn = (value: 'github' | 'google') => {
		signIn(value);
	};

	return (
		<Card className='w-full h-full p-8'>
			<CardHeader className='px-0 pt-0'>
				<CardTitle>Login to Continue</CardTitle>
				<CardDescription>
					Use your Email or another service to continue
				</CardDescription>
			</CardHeader>

			<CardContent className='space-y-5 px-0 pb-0'>
				<form className='space-y-2.5'>
					<Input
						disabled={false}
						value={email}
						placeholder='Email'
						type='email'
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<Input
						disabled={false}
						value={password}
						placeholder='Password'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Button
						type='submit'
						className='w-full'
						size={'lg'}
					>
						Continue
					</Button>
				</form>
				<Separator />
				<div className='flex flex-col gap-y-2.5'>
					<Button
						disabled={false}
						variant={'outline'}
						className='w-full relative'
						onClick={() => handleProviderSignIn('google')}
						size={'lg'}
					>
						<FcGoogle
							size={20}
							className='absolute left-2.5 top-2.5'
						/>
						Continue with Google
					</Button>

					<Button
						disabled={false}
						variant={'outline'}
						className='w-full relative'
						onClick={() => handleProviderSignIn('github')}
						size={'lg'}
					>
						<FaGithub
							size={20}
							className='absolute left-2.5 top-2.5'
						/>
						Continue with Github
					</Button>
				</div>
				<p className='text-xs text-muted-foreground'>
					Don&apos;t have an account?{' '}
					<span
						onClick={() => setState('signUp')}
						className='text-sky-700 hover:underline cursor-pointer'
					>
						Sign up
					</span>
				</p>
			</CardContent>
		</Card>
	);
};

export default SignInCard;
