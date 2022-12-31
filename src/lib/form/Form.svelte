<script lang="ts">
	import { z } from 'zod';
	import Input from '$lib/form/Input.svelte';
	export let inputs = [
		{
			value: '',
			type: 'text',
			id: 'name',
			name: 'name',
			label: 'Name',
			placeholder: ' ',
			required: true,
			minLength: 5,
			maxLength: 40,
			valid: false,
			touched: false
		},
		{
			value: '',
			type: 'email',
			id: 'email',
			name: 'email',
			label: 'Email',
			placeholder: ' ',
			required: true,
			maxLength: 1000,
			valid: false,
			touched: false
		}
	];

	$: valid = inputs.every((item) => item.valid);

	export let schemas: any = {
		name: z.object({
			name: z
				.string({ required_error: 'Name is required' })
				.min(1, { message: 'Name is required' })
				.max(40, { message: 'Name must be less than 40 characters' })
				.regex(/^[A-Za-z]+$/, { message: 'Must be letters only.' })
				.trim()
		}),
		email: z.object({
			email: z
				.string({ required_error: 'Email is required' })
				.min(1, { message: 'Email is required' })
				.email({ message: 'Email must be a valid email address' })
		})
	};
</script>

<form method="POST" class="w-full flex flex-col gap-4 items-start">
	{#each inputs as input, i}
		<Input
			id={input.id}
			name={input.name}
			label={input.label}
			placeholder={input.placeholder}
			required={input.required}
			maxLength={input.maxLength}
			minLength={input.minLength}
			bind:value={input.value}
			bind:valid={input.valid}
			validationSchema={schemas[input.name]}
		/>
	{/each}
	<button
		type="submit"
		disabled={!valid}
		class="p-4 bg-slate-400
            text-slate-900 disabled:bg-slate-700 disabled:cursor-not-allowed">Submit</button
	>
</form>
