<script lang="ts">
	import LocationLinkComponent from '$components/complex/LocationLinkComponent.svelte';
	import RequestComponent from '$components/complex/RequestComponent.svelte';
	import { callApiAuth } from '$lib/api';
	import { userType } from '$lib/store';
	import { UserTypes, type AccommodationRequest, type Location, type Owner } from '$lib/types';
	import { onMount } from 'svelte';

	let requests: AccommodationRequest[];

	onMount(async () => {
		const rawRequests = await callApiAuth('/requests', 'Get');
		if (rawRequests) {
			requests = JSON.parse(rawRequests);
		}
	});
</script>

<main class="min-w-full flex flex-col p-4 items-center">
	{#if $userType == UserTypes.Owner}
		{#if requests}
			<div class="w-full flex flex-col max-w-sm mb-4">
				<h1 class="text-primary text-2xl font-bold">Pending requests: {requests.length}</h1>
			</div>

			{#each requests as request}
				<RequestComponent accRequest={request} />
				<span class="mb-2" />
			{/each}
		{:else}
			<div class="w-full flex flex-col max-w-sm mb-4">
				<h1 class="text-primary text-center text-2xl font-bold">No pending requests</h1>
			</div>
		{/if}
	{:else}
		No access
	{/if}
</main>
