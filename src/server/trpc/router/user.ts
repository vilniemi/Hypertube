import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { sendEmailVerification } from '../../../utils/sendEmailVerification';
import { signEmailToken } from '../../../utils/promisifyJWT';

export const userRouter = router({
	create: publicProcedure
		.input(
			z.object({
				name: z.string().min(1),
				email: z.string().email(),
				password: z.string().min(1).max(32),
			})
		)
		.mutation(async ({ input, ctx }) => {
			console.log(input);
			// Check if exists
			const checkUser = await ctx.prisma.user.findUnique({
				where: {
					email: input.email,
				},
			});
			if (checkUser)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'User already exists',
					cause: input.email,
				});
			// Hash password
			const hashedPassword = await hash(input.password);
			// Create token
			const token = await signEmailToken(input.email);
			// Create new user if not exists
			const newUser = await ctx.prisma.user.upsert({
				where: {
					email: input.email,
				},
				update: {},
				create: {
					name: input.name,
					email: input.email,
					password: hashedPassword
				} as Prisma.UserCreateInput,
			});
			console.log(newUser);
			// Send verification email
			if (await sendEmailVerification(input.email, token))
				return {
					message: 'User created successfully',
				};
		}),
	update: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string().min(1).max(30).nullish(),
				name: z.string().min(1).max(30),
			})
		)
		.mutation(async ({ input, ctx }) => {
			console.log(input);

			// Hash password if given
			let hashedPassword;
			if (input.password) hashedPassword = await hash(input.password);
			// Update user. Undefined values are ignored
			const updated = await ctx.prisma.user.update({
				data: {
					name: input.name,
					email: input.email,
					password: hashedPassword,
				},
				where: {
					email: input.email,
				},
			});
			if (!updated)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No matching user found',
					cause: input.email,
				});
			return {
				message: 'User information updated successfully',
			};
		}),
});
