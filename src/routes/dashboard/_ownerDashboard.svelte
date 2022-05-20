<script lang="ts">
	import OwnerComponent from '$components/complex/OwnerComponent.svelte';
	import ImageLabel from '$components/simple/ImageLabel.svelte';
	import { callApiAuth } from '$lib/api';
	import type { AccommodationRequest, Owner } from '$lib/types';
	import { User } from '@auth0/auth0-spa-js';
	import { Bell, User as UserIcon, OfficeBuilding } from '@steeze-ui/heroicons';
	import { onMount } from 'svelte';

	let owner: Owner;
	let requests: AccommodationRequest[];

	onMount(async () => {
		const rawProvider = await callApiAuth('/users/get', 'Get');

		if (rawProvider) {
			owner = JSON.parse(rawProvider);

			const rawRequests = await callApiAuth('/requests', 'GET');
			if (rawRequests) {
				requests = JSON.parse(rawRequests);
			}
		}
	});
</script>

{#if owner}
	<h1 class="text-primary text-2xl font-bold">Welcome {owner.name}!</h1>

	<span class="mb-4" />
	<a href="/dashboard/requests">
		<ImageLabel
			img={Bell}
			imgTheme="outline"
			imgColor="secondary"
			imgSize="24px"
			class="text-secondary text-lg hover:underline"
			text="{requests ? requests.length : 0} requests waiting for approval"
		/>
	</a>
	<span class="mb-4" />
	<a href="/dashboard/locations">
		<ImageLabel
			img={OfficeBuilding}
			imgTheme="outline"
			imgColor="secondary"
			imgSize="24px"
			class="text-secondary text-lg hover:underline"
			text="{owner.locations ? owner.locations.length : '0'} owned locations"
		/>
	</a>
	<span class="mb-4" />
	<OwnerComponent {owner} />
{/if}
