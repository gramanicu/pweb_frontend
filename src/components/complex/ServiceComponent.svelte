<script lang="ts">
	import Badge from '$components/simple/Badge.svelte';
	import ImageLabel from '$components/simple/ImageLabel.svelte';
	import type { Owner, Service } from '$lib/types';
	import { User, Phone } from '@steeze-ui/heroicons';
	import { onMount } from 'svelte';

	export let serviceId: number;

	let service: Service;

	onMount(async () => {
		service = {
			id: serviceId,
			type: 'Medical',
			description: 'Description',
			id_provider: 0,
			provider: {
				id: 0,
				auth0_id: 'auth0_id',
				email: 'email@example.com',
				phone: '0123456789',
				name: 'John Doe'
			},
			id_loc: 0
		};
	});
</script>

{#if service && service.provider}
	<div class="w-full max-w-sm p-4 border border-black rounded-md">
		<div class="flex flex-row w-full items-center">
			<h1 class="font-bold text-2xl mr-2">Service type:</h1>
			<Badge text={service.type} class="text-2xl" />
		</div>
		<div class="py-2">
			<a href="/dashboard/providers/{service.provider.id}">
				<ImageLabel
					img={User}
					imgTheme="outline"
					text="Provider: {service.provider.name}"
					class="text-lg"
				/>
			</a>
		</div>
		{#if service.description != ''}
			<div class="bg-gray-300 p-2 rounded-md mt-4 text-sm">
				{service.description}
			</div>
		{/if}
	</div>
{/if}
