<script lang="ts">
	import { page } from '$app/stores';
	import LocationComponent from '$components/complex/LocationComponent.svelte';
	import Breadcrumbs from '$components/simple/Breadcrumbs.svelte';
	import LargeButton from '$components/simple/LargeButton.svelte';

	import { callApiAuth } from '$lib/api';
	import { userType } from '$lib/store';
	import { type Location, type Service, ServiceTypes, UserTypes } from '$lib/types';
	import { onMount } from 'svelte';

	let location: Location;

	onMount(async () => {
		const id = $page.params.id;
		const rawLocation = await callApiAuth(`/locations/${id}`, 'Get');
		if (rawLocation) {
			location = JSON.parse(rawLocation);
		}

		let services: Service[] = [
			{
				id: 1,
				description: 'desc',
				id_provider: 1,
				id_loc: 1,
				type: ServiceTypes.CLOTHES
			},
			{
				id: 2,
				description: 'desc',
				id_provider: 2,
				id_loc: 2,
				type: ServiceTypes.MEDICAL_SERVICE
			}
		];

		location = {
			id: 0,
			name: 'Location name',
			address: 'Full address',
			id_owner: 0,
			services: services,
			owner: {
				id: 0,
				auth0_id: 'auth0_id',
				email: 'email@example.com',
				phone: '0123456789',
				name: 'John Doe'
			}
		};
	});
</script>

<main class="min-w-full flex flex-col p-4 items-center">
	<div class="w-full flex flex-col max-w-sm">
		{#if location}
			<Breadcrumbs
				links={[
					{ url: '/dashboard/locations', text: 'Locations' },
					{ url: '', text: location.name }
				]}
			/>
			<span class="mb-4" />
			<LocationComponent {location} />

			{#if $userType == UserTypes.Refugee}
				<LargeButton text="Request accommodation" />
			{:else if $userType == UserTypes.Provider}
				Create service form
			{/if}
		{/if}
	</div>
</main>
