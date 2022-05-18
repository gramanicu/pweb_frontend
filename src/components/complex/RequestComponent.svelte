<script lang="ts">
	import { goto } from '$app/navigation';

	import ImageLabel from '$components/simple/ImageLabel.svelte';
	import type { AccommodationRequest } from '$lib/types';
	import { X, OfficeBuilding, CheckCircle, XCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let accRequest: AccommodationRequest;

	const acceptRequest = async () => {};
	const declineRequest = async () => {};
</script>

{#if accRequest && accRequest.refugee && accRequest.location}
	<div
		class="w-full max-w-sm py-2 px-4 border border-black rounded-md flex flex-row relative items-center"
	>
		<div class="flex flex-col">
			<a href="/dashboard/refugees/{accRequest.refugee.id}">
				<h1 class="font-bold text-xl leading-none">{accRequest.refugee.name}</h1>
			</a>
			<a href="/dashboard/locations/{accRequest.location.id}">
				<div class="pt-1">
					<ImageLabel
						img={OfficeBuilding}
						imgTheme="outline"
						text={accRequest.location.name}
						imgColor="secondary"
						imgSize="16px"
						class="text-slate-500 text-base font-semibold"
					/>
				</div>
			</a>
		</div>
		<div class="flex flex-row ml-auto ">
			<button class="rounded-full transition-colors duration-200 text-secondary hover:text-primary">
				<Icon size="38px" theme="solid" src={CheckCircle} />
			</button>
			<button class="rounded-full transition-colors duration-200 text-secondary hover:text-primary">
				<Icon size="38px" theme="solid" src={XCircle} />
			</button>
		</div>
	</div>
{/if}
