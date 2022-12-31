// import { z } from 'zod';

// const registerSchema = z.object({
// 	name: z
// 		.string({ required_error: 'Name is required' })
// 		.min(1, { message: 'Name is required' })
// 		.max(40, { message: 'Name must be less than 40 characters' })
// 		.trim()
// });

// export const actions = {
// 	default: async ({ request }) => {
// 		const formData = Object.fromEntries(await request.formData());
// 		console.log({formData})
// 		try {
// 			const result = registerSchema.parse(formData);
// 			console.log('SUCCESS');
// 			console.log(result);
// 		} catch (err) {
// 			const { fieldErrors: errors } = err.flatten();
// 			console.log(err.flatten());
// 			console.log(errors);
// 			return {
// 				data: formData,
// 				errors
// 			};
// 		}
// 	}
// };
