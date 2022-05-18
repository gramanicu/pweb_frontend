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

		let refugee = {
			id: 0,
			auth0_id: 'auth0_id',
			email: 'email@example.com',
			phone: '0123456789',
			name: 'John Doe',
			id_country: 0,
			id_language: 0,
			no_adults: 2,
			no_children: 4,
			notes: ''
		};

		let location = {
			id: 0,
			name: 'Location name',
			address: 'Full address',
			id_owner: 0,
			owner: {
				id: 0,
				auth0_id: 'auth0_id',
				email: 'email@example.com',
				phone: '0123456789',
				name: 'John Doe'
			}
		};

		requests = [
			{
				id: 0,
				id_location: 0,
				id_refugee: 0,
				refugee: refugee,
				approved: 0,
				location: location
			},
			{
				id: 0,
				id_location: 0,
				id_refugee: 0,
				refugee: refugee,
				approved: 0,
				location: location
			}
		];
	});
</script>

<main class="min-w-full flex flex-col p-4 items-center">
	{#if requests}
		<div class="w-full flex flex-col max-w-sm mb-4">
			{#if $userType == UserTypes.Owner}
				<h1 class="text-primary text-2xl font-bold">Pending requests {requests.length}</h1>{/if}
		</div>

		{#each requests as request}
			<RequestComponent accRequest={request} />
			<span class="mb-2" />
		{/each}
	{/if}
</main>
