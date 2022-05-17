<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check } from '@steeze-ui/heroicons';

	export let checked = false;
</script>

<div
	on:click={() => {
		checked = !checked;
	}}
	class="w-6 h-6 select-none cursor-pointer flex flex-col justify-center items-center {checked
		? 'text-white'
		: 'text-secondary'} transition-colors duration-200 bg-secondary rounded-full"
>
	<Icon src={Check} theme="solid" />
</div>
