<script lang="ts">
	import LocationLinkComponent from '$components/complex/LocationLinkComponent.svelte';
	import ProviderComponent from '$components/complex/ProviderComponent.svelte';
	import RefugeeComponent from '$components/complex/RefugeeComponent.svelte';
	import ImageLabel from '$components/simple/ImageLabel.svelte';
	import { callApiAuth } from '$lib/api';
	import type { Provider, serviceTypeToString } from '$lib/types';
	import { Clipboard, ClipboardList } from '@steeze-ui/heroicons';
	import { onMount } from 'svelte';

	let provider: Provider = {
		id: 0,
		auth0_id: 'auth0_id',
		email: 'email@example.com',
		phone: '0123456789',
		name: 'John Doe'
	};

	onMount(async () => {
		const rawProvider = await callApiAuth('/user', 'Get');

		if (rawProvider) {
			provider = JSON.parse(rawProvider);
		}
	});
</script>

{#if provider}
	<h1 class="text-primary text-2xl font-bold">Welcome {provider.name}!</h1>
	<ImageLabel
		img={ClipboardList}
		imgTheme="outline"
		imgColor="secondary"
		class="text-secondary text-lg"
		text="Providing {provider.services ? provider.services.length : '0'} services"
	/>
	<span class="mb-4" />
	<ProviderComponent {provider} />
{/if}
