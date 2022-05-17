<script lang="ts">
	import { goto } from '$app/navigation';
	import Badge from '$components/simple/Badge.svelte';

	import ImageLabel from '$components/simple/ImageLabel.svelte';
	import type { Service } from '$lib/types';
	import { ArrowRight, OfficeBuilding } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let service: Service;
</script>

{#if service && service.location}
	<div
		class="w-full max-w-sm py-2 px-4 border border-black rounded-md flex flex-row relative items-center"
	>
		<div class="flex flex-col">
			<div class="flex flex-row w-full items-center">
				<h1 class="font-bold text-xl mr-2">Service type:</h1>
				<Badge text={service.type} class="text-xl" />
			</div>
			<div class="pt-1">
				<a href="/dashboard/locations/{service.location.id}">
					<ImageLabel
						img={OfficeBuilding}
						imgTheme="outline"
						text={service.location.name}
						imgColor="secondary"
						imgSize="20px"
						class="text-slate-500 text-md font-semibold"
					/>
				</a>
			</div>
		</div>
		<a
			href="/dashboard/services/{service.id}"
			class="ml-auto w-6 h-6 rounded-full transition-colors duration-200 hover:text-tertiary"
		>
			<Icon src={ArrowRight} />
		</a>
	</div>
{/if}
