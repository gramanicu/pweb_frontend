<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';
	import { vars } from '$lib/variables';
</script>

<script lang="ts">
	import type { Auth0Client } from '@auth0/auth0-spa-js';
	import auth from '$lib/authService';
	import { auth0Client, isAuthenticated } from '$lib/store';
	import { goto } from '$app/navigation';
	import Logo from '$components/logo.svelte';
	import Button from '$components/simple/Button.svelte';
	import OutlineButton from '$components/simple/OutlineButton.svelte';
	import Badge from '$components/simple/Badge.svelte';
	import Check from '$components/simple/Check.svelte';
	import LargeButton from '$components/simple/LargeButton.svelte';
	import LargeOutlineButton from '$components/simple/LargeOutlineButton.svelte';
	import ImageLabel from '$components/simple/ImageLabel.svelte';
	import CheckLabel from '$components/simple/CheckLabel.svelte';
	import Breadcrumbs from '$components/simple/Breadcrumbs.svelte';
	import Dropdown from '$components/simple/Dropdown.svelte';
	import LocationComponent from '$components/complex/LocationComponent.svelte';
	import LocationLinkComponent from '$components/complex/LocationLinkComponent.svelte';
	import type { AccommodationRequest, Location } from '$lib/types';
	import OwnerComponent from '$components/complex/OwnerComponent.svelte';
	import RefugeeComponent from '$components/complex/RefugeeComponent.svelte';
	import RequestComponent from '$components/complex/RequestComponent.svelte';
	import ProviderComponent from '$components/complex/ProviderComponent.svelte';
	import ServiceComponent from '$components/complex/ServiceComponent.svelte';
	import ServiceLinkComponent from '$components/complex/ServiceLinkComponent.svelte';

	let client: Auth0Client | null;

	async function login() {
		client = $auth0Client;
		if (!client) {
			client = await auth.createClient();
		}

		await auth.loginWithPopup(client, {});

		if ($isAuthenticated) {
			goto('/dashboard');
		}
	}

	let checked: boolean;
	let checked1: boolean;
	let dropdown = {
		text: 'Dropdown',
		value: ''
	};

	let location: Location = {
		id: 0,
		name: 'Location name',
		address: 'Full Address',
		id_owner: 0
	};

	let accRequest: AccommodationRequest = {
		id: 0,
		id_refugee: 0,
		approved: 0,
		id_location: 0,
		location: location,
		refugee: {
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
		}
	};

	let service = {
		id: 0,
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
		id_loc: 0,
		location: location
	};
</script>

<main
	class="scroll-smooth min-h-screen bg-circuit-pattern flex flex-col justify-around items-center snap-y snap-mandatory"
>
	<div
		class="bg-black text-gray-300 font-normal text-sm w-full text-center border-b-2 border-accent p-2"
	>
		<div class="limited-section">Website in development</div>
	</div>
	<nav class="self-start px-4 w-full bg-slate-100 shadow-lg border-b-2 border-gray-300">
		<div class="limited-section flex flex-row items-center justify-between p-2">
			<a href="/" class="text-2xl select-none prose"><Logo secondary={'gray-500'} /></a>
			<div>
				<button
					on:click={() => login()}
					class="py-2 px-4 border bg-white transition-colors duration-500 border-tertiary text-tertiary rounded-lg hover:bg-tertiary hover:text-white focus:ring-2 ring-primary"
					>Sign In</button
				>
			</div>
		</div>
	</nav>

	<div class="flex flex-col gap-2 w-full">
		<Button text="Button" />
		<OutlineButton text="Button" />
		<Badge text={checked ? 'Checked' : 'Badge'} />
		<Check bind:checked />
		<LargeButton text="Button" />
		<LargeOutlineButton text="Button" />
		<ImageLabel text="Label" />
		<ImageLabel
			text="Label"
			textColor="gray-400"
			imgColor="gray-400"
			textSize="base"
			imgSize="16px"
		/>
		<CheckLabel text={checked1 ? 'Checked' : 'Label'} bind:checked={checked1} />
		<Breadcrumbs
			links={[
				{ url: '#', text: 'Breadcrumb' },
				{ url: '#', text: 'Breadcrumb' },
				{ url: '', text: dropdown.text }
			]}
		/>
		<Dropdown
			options={[
				{ value: '#', text: 'Option1' },
				{ value: '#', text: 'Option2' },
				{ value: ['asd', 'aqwe'], text: 'Option3' }
			]}
			bind:selectedOption={dropdown}
		/>

		<LocationComponent locationId={1} />
		<LocationLinkComponent {location} />
		<OwnerComponent ownerId={1} />
		<RefugeeComponent refugeeId={1} />
		<RequestComponent {accRequest} />
		<ProviderComponent providerId={1} />
		<ServiceComponent serviceId={1} />
		<ServiceLinkComponent {service} />
	</div>

	<footer class="mt-auto w-full bg-black text-white font-light text-md p-4 text-center">
		&copy; Copyright 2022
	</footer>
</main>

<style lang="scss">
	.limited-section {
		max-width: 1050px;
		margin: 0 auto;
	}
</style>
