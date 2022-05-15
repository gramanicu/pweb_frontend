<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { vars } from '$lib/variables';

	let select: 'owner' | 'provider' | 'refugee' | null = null;

	function submit() {
		if (select !== null) {
			const state = $page.url.searchParams.get('state');
			goto(`https://${vars.auth0.domain}/continue?state=${state}&role=${select}`);
		}
	}
</script>

<main class="w-screen flex flex-col items-center justify-end sm:justify-center h-screen">
	<div
		class="w-full sm:max-w-md px-4 py-8 sm:p-4 rounded-none sm:rounded-lg border-t border-slate-400 sm:border-0 sm:ring-2 ring-primary shadow-md flex flex-col bg-slate-200"
	>
		<label for="roles" class="text-xl sm:text-lg font-light">What kind of user are you?</label>

		<select
			class="rounded-lg shadow-md w-full sm:w-fit sm:max-w-xs mt-1 mb-2 text-lg sm:text-base border-gray-400"
			bind:value={select}
			name="roles"
			id="roles"
		>
			<option value={null} disabled selected hidden>Select your role...</option>
			<option value="refugee">Refugee</option>
			<option value="owner">Location owner</option>
			<option value="provider">Service provider</option>
		</select>

		<small class="mb-6 sm:mb-2 text-base sm:text-sm font-medium text-gray-500">
			{#if select === 'owner'}
				A location owner is someone who has the posibility to provide accomodation for refugees.
			{:else if select === 'provider'}
				A service provider is someone who can provider different types of services (medical, food,
				etc.) for refugees.
			{:else if select === 'refugee'}
				A person or group who requires accomodation (and after they are hosted, services can be
				provided)
			{/if}
		</small>

		<button
			on:click={() => submit()}
			class="w-full sm:w-fit sm:self-end px-4 py-2 text-lg sm:text-base font-medium {select === null
				? 'bg-gray-700 pointer-events-none'
				: 'bg-primary'} text-white rounded-lg">Send</button
		>
	</div>
</main>
