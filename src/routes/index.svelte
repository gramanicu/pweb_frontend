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

	<footer class="mt-auto w-full bg-black text-white font-light text-md p-4 text-center">
		&copy; Copyright 2022
	</footer>
</main>

<style lang="scss">
	.limited-section {
		max-width: 1050px;
		margin: 0 auto;
	}

	.bg-circuit-pattern {
		background-image: url('/images/svg/circuit-board.svg');
	}
</style>
