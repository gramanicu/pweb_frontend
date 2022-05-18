<script lang="ts">
	import Badge from '$components/simple/Badge.svelte';
	import ImageLabel from '$components/simple/ImageLabel.svelte';
	import { ServiceTypes, serviceTypeToString, type Location, type Service } from '$lib/types';
	import { LocationMarker, User } from '@steeze-ui/heroicons';
	import { onMount } from 'svelte';

	export let locationId: number;

	let location: Location;

	onMount(async () => {
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
				type: ServiceTypes.FOOD
			}
		];

		location = {
			id: locationId,
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

{#if location && location.owner}
	<div class="w-full max-w-sm p-4 border border-black rounded-md">
		<h1 class="font-bold text-2xl">{location.name}</h1>
		<div class="mb-2">
			<ImageLabel
				img={LocationMarker}
				text={location.address}
				imgColor="slate-500"
				imgSize="16px"
				class="text-slate-500 text-base font-semibold"
			/>
		</div>
		<div class="py-2 mb-2">
			<ImageLabel img={User} imgTheme="outline" text={location.owner.name} class="text-lg" />
		</div>
		<div class="w-full flex flex-row">
			{#if location.services}
				{#each location.services as service}
					<Badge class="mr-2" text={serviceTypeToString(service.type)} />
				{/each}
			{/if}
		</div>
	</div>
{/if}
