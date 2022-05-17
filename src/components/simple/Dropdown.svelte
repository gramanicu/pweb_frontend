<script lang="ts">
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	interface Option {
		text: string;
		value: any;
	}

	let opened = false;

	export let options: Option[];
	export let selectedOption = { text: '', value: '' };
</script>

<div class="relative inline-block text-left w-fit">
	<div>
		<button
			on:click={() => {
				opened = !opened;
			}}
			class="w-full leading-none dropdown-button p-2 border inline-flex flex-row justify-between items-center border-black rounded-md relative hover:shadow-lg"
			type="button"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true"
		>
			{selectedOption.text}
			<Icon size="24px" src={ChevronDown} theme="solid" class="absolute right-1" />
		</button>
	</div>
	<div
		class="{opened
			? 'block'
			: 'hidden'} origin-top-right absolute right-0 mt-1 rounded-md shadow-lg border border-black bg-white w-full"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-button"
		tabindex="-1"
	>
		<div class="py-1 flex flex-col" role="none">
			{#each options as option, index}
				<button
					on:click={() => {
						selectedOption = option;
						opened = false;
					}}
					class="block px-4 py-2 text-sm {selectedOption == option
						? 'text-secondary pointer-events-none'
						: ' hover:font-medium'}"
					role="menuitem"
					tabindex="-1"
					id="menu-item-{index}"
					type="button">{option.text}</button
				>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.dropdown-button {
		min-width: 160px;
	}
</style>
