<script lang="ts">
	import LocationLinkComponent from '$components/complex/LocationLinkComponent.svelte';
	import RefugeeComponent from '$components/complex/RefugeeComponent.svelte';
	import { callApiAuth } from '$lib/api';

	import type { Location, Refugee } from '$lib/types';

	import { onMount } from 'svelte';

	let location: Location = {
		id: 0,
		name: 'Location name',
		address: 'Full Address',
		id_owner: 0
	};

	let refugee: Refugee = {
		name: 'refugee',
		auth0_id: '',
		id_country: 1,
		id_language: 1,
		email: 'email@example.com',
		id: 0,
		no_adults: 1,
		no_children: 1,
		notes: '',
		phone: '0123456789',
		location: location,
		id_loc: 1
	};

	onMount(async () => {
		const rawRefugee = await callApiAuth('/users/get', 'Get');

		if (rawRefugee) {
			refugee = JSON.parse(rawRefugee);
		}
	});
</script>

{#if refugee}
	<h1 class="text-primary text-2xl font-bold">Welcome {refugee.name}!</h1>
	<RefugeeComponent {refugee} />
	{#if refugee.id_loc && refugee.location}
		<small class="mt-4 font-bold text-gray-600">You are currently staying at</small>
		<LocationLinkComponent location={refugee.location} />
	{/if}
{/if}
