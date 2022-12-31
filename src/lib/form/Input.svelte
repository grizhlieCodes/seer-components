<script lang="ts">
	//IMPORTS
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly, fade, slide } from 'svelte/transition';
	import { z } from 'zod';

	//EXPORTS
	/**  */
	// export let type: string = 'text';
	/**  */
	export let type: string = 'text';
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
	/**  */
	export let validationSchema: any;

	// $: console.log({value, id, name, label, placeholder, required, minLength, maxLength, validationSchema})

	//STATE
	/** Export touched to parent to bind  */
	let touched = false;

	/** Export touched to parent to bind  */
	export let valid = false;

	const validate = async () => {
		let data: any = {};
		data[name] = value;
		try {
			const result = validationSchema.parse(data);
			valid = true;
			errorMessage = '';
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			valid = false;
			errorMessage = errors[name][0];
		}
	};

	//VALIDATION
	const handleInput = (e: Event) => {
		if (!touched) return;
		validate();
	};

	let errorMessage: string = '';


    //COLORS - CHANGE THIS TO FIT YOUR STYLE? NOT SURE.
    export let inputInactiveBg = 'bg-indigo-900/20'
    export let inputActiveBg = 'focus-within:bg-indigo-900/40'
    export let inputErrorCols = 'text-red-400 caret-red-400 border-red-400'
    export let inputValidCols = 'text-indigo-200 caret-indigo-600 border-indigo-600/20'
    export let activeLabelCols = `[&:not(:placeholder-shown)_~_label]:text-indigo-100/20 [&:focus-within_~_label]:text-indigo-100/20`
    export let inputTextCols = `text-indigo-200`
    export let labelValidTextCol = `text-indigo-200`
    export let labelErrorTextCol = `text-red-400`
    export let inputActiveErrorBorder = `bg-red-400`
    export let inputActiveValidBorder = `bg-indigo-900`

	$: inputStyling = ` h-full w-full transition-colors duration-300 px-8 pt-6 pb-3 
                        ${inputInactiveBg} 
                        ${inputActiveBg}
                        ${touched && !valid ? `${inputErrorCols}` : `${inputValidCols}`}
                         outline-none border-0 border-b-[1px] rounded-tr-md rounded-tl-md peer
    `;

	$: labelInInputStyling = `[&:not(:placeholder-shown)_~_label]:-translate-y-[160%] 
                                [&:not(:placeholder-shown)_~_label]:text-xs 
                              ${activeLabelCols}`;

	let inputTextStyling = `text-lg ${inputTextCols}`;

	$: labelStyling = `absolute top-1/2 -translate-y-1/2 left-8 text-lg peer-focus-within:text-xs 
                       peer-focus-within:translate-y-[-160%] transition-all duration-300 
                       ${touched && !valid ? `${labelErrorTextCol}` : `${labelValidTextCol}`}`;

    $: inputActiveBorder = `absolute h-[2px] bottom-0 left-0 w-full 
                            ${touched && !valid ? `${inputActiveErrorBorder}` : `${inputActiveValidBorder}`}
                            origin-left transition-all scale-x-0 peer-focus-within:scale-x-100 duration-300`
</script>

{#if type === 'text'}
	<div class="w-full">
		<!-- TOP ()-->
		<div id="top" class="w-full h-20 relative">
			<input
				bind:value
				type="text"
				maxlength={maxLength}
				minlength={minLength}
				data-name={name}
				{name}
				{id}
				{required}
				{placeholder}
				on:blur={() => {
					touched = true;
					validate();
				}}
				on:input={handleInput}
				class=" {inputStyling} {inputTextStyling} {labelInInputStyling}"
			/>
			<label for={id} class={labelStyling}>
				{label}
				{#if touched && !valid}
					<span>*</span>
				{/if}
			</label>

			<div
				class="{inputActiveBorder}"
			/>
		</div>

		<div id="bottom" class="flex justify-between gap-8 pt-1 w-full">
			<div id="left">
				{#if errorMessage.length > 0}
					<p transition:slide={{ duration: 200 }} class="text-sm text-red-500">{errorMessage}</p>
				{/if}
			</div>
			{#if maxLength !== 1000}
				<p transition:fly={{ duration: 300, x: 25 }} class="h-full text-sm text-indigo-100/30 ">
					{value.length}/{maxLength}
				</p>
			{/if}
		</div>
	</div>
{:else if type === 'email'}
	<div class="w-full">
		<!-- TOP ()-->
		<div id="top" class="w-full h-20 relative">
			<input
				bind:value
				type="email"
				maxlength={maxLength}
				minlength={minLength}
				data-name={name}
				{name}
				{id}
				{required}
				{placeholder}
				on:blur={() => {
					touched = true;
					validate();
				}}
				on:input={handleInput}
				class=" {inputStyling} {inputTextStyling} {labelInInputStyling}"
			/>
			<label for={id} class={labelStyling}>
				{label}
				{#if touched && !valid}
					<span> * </span>
				{/if}
			</label>

			<div
				class="absolute h-[2px] bottom-0 left-0 w-full {touched && !valid
					? 'bg-red-600 '
					: 'bg-indigo-900 '}
        origin-left transition-all scale-x-0 peer-focus-within:scale-x-100 duration-300"
			/>
		</div>

		<div id="bottom" class="flex justify-between gap-8 pt-1 w-full">
			<div id="left">
				{#if errorMessage.length > 0}
					<p transition:slide={{ duration: 200 }} class="text-sm text-red-500">{errorMessage}</p>
				{/if}
			</div>
			{#if maxLength !== 1000}

				<p transition:fly={{ duration: 300, x: 25 }} class="h-full text-sm text-indigo-100/30 ">
					{value.length}/{maxLength}
				</p>
			{/if}
		</div>
	</div>
{/if}
