<script lang="ts">
	//IMPORTS
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	//EXPORTS
	/**  */
	// export let type: string = 'text';
	/**  */
	export let value: string = 'value';
	/**  */
	export let id: string = 'id';
	/**  */
	export let name: string = 'name';
	/**  */
	export let label: string = 'label';
	/**  */
	export let placeholder: string = ' ';
	/**  */
	export let required: boolean = false;
	/**  */
	export let minLength: number = 1000;
	/**  */
	export let maxLength: number = 1000;

	//STATE
	/** Export touched to parent to bind  */
	export let touched = false;

	/** Export touched to parent to bind  */
	export let valid = false;

	//VALIDATION
	const handleInput = (e: Event) => {validate(value)};

	let errorMessage: string = '';

	//Is it empty?
	// $: isEmpty = value.length <= 0 ? true : false
	// $: isTooShort = minLength !== 1000 && value.length < minLength ? true : false
	// $: isTooLong = maxLength !== 1000 && value.length > maxLength ? true : false
	// $: notLettersOnly = !value.match(/^[A-Za-z]+$/) ? true : false

	let validations = {
		isEmpty: {
			validate: (val: string) => {
				return val.length <= 0 ? true : false;
			},
			errorMessage: (val: string) => "Can't be empty"
		},
		isTooShort: {
			validate: (val: string) => {
				return minLength !== 1000 && val.length < minLength ? true : false;
			},
			errorMessage: (val: string) =>  `Text too short ${val.length}/${minLength}`
		},
		isTooLong: {
			validate: (val: string) => {
				return maxLength !== 1000 && val.length > maxLength ? true : false;
			},
			errorMessage: (val: string) => `Text too long ${val.length}/${maxLength}`
		},
		notLettersOnly: {
			validate: (val: string) => {
				return !val.match(/^[A-Za-z]+$/) ? true : false;
			},
			errorMessage: (val: string) => "Letters only, please."
		}
	};

	export const validate = (val: string) => {
		let temporaryValid = true;
		for (const prop in validations) {
			if (!temporaryValid) return;
			const isInvalid = validations[prop].validate(val);
			console.log({name, prop, isInvalid})
			if(isInvalid){
				console.log(`${validations[prop].errorMessage(val)}`)
				valid = false;
				errorMessage = validations[prop].errorMessage(val)
				return
			}
			if(!isInvalid){
				errorMessage = ""
				valid = true
				temporaryValid = true
			}
		}
	};

	//Base Styling
</script>

<div class="">
	<!-- TOP ()-->
	<div class="">
		<input
			type="text"
			maxlength={maxLength}
			data-name={name}
			{name}
			{id}
			required={required}
			{placeholder}
			on:blur={() => {
				touched = true;
				valid = true;
			}}
			bind:value
			on:input={handleInput}
		/>
	</div>

	<!-- bind:value={value} -->

	<!-- BOTTOM () -->
</div>
