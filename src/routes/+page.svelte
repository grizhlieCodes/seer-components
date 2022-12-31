<!-- <h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<script lang="ts">
	import { z } from 'zod';
	import Form from '$lib/form/Form.svelte';
	let inputs = [
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
		}
	];

	let schemas: any = {
		name: z.object({
			name: z
				.string({ required_error: 'Name is required' })
				.min(1, { message: 'Name is required' })
				.max(40, { message: 'Name must be less than 40 characters' })
				.regex(/^[A-Za-z]+$/, { message: 'Must be letters only.' })
				.trim()
		})
	};
</script>

<div class="bg-neutral-900 w-full min-h-screen grid place-items-center p-10">
	<div class="w-full max-w-md flex flex-col gap-5 items-center">
		<Form {inputs} {schemas}/>
	</div>
</div>
