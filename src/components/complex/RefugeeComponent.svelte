<script lang="ts">
	import Badge from '$components/simple/Badge.svelte';
	import ImageLabel from '$components/simple/ImageLabel.svelte';
	import type { Owner, Refugee } from '$lib/types';
	import { Mail, Phone } from '@steeze-ui/heroicons';
	import { onMount } from 'svelte';

	export let refugeeId: number;

	let refugee: Refugee;

	onMount(async () => {
		refugee = {
			id: refugeeId,
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
	});
</script>

{#if refugee}
	<div class="w-full max-w-sm p-4 border border-black rounded-md">
		<div class="flex flex-row w-full items-center">
			<h1 class="font-bold text-2xl mr-2">{refugee.name}</h1>

			{#if refugee.no_adults + refugee.no_children > 1}
				<Badge text="Group" />
			{:else}
				<Badge text="Individual" />
			{/if}
		</div>
		{#if refugee.no_adults + refugee.no_children > 1}
			<h2 class="font-bold text-base text-slate-400 leading-none">
				Adults: {refugee.no_adults}{#if refugee.no_children > 0}, Kids: {refugee.no_children}{/if}
			</h2>
		{/if}
		<div class="py-2">
			<ImageLabel
				img={Mail}
				imgSize="16px"
				imgTheme="outline"
				imgColor="slate-500"
				text={refugee.email}
				class="text-base text-slate-500 font-semibold"
			/>
		</div>
		<div class="py-2">
			<a href="tel:{refugee.phone}">
				<ImageLabel
					img={Phone}
					imgColor="slate-500"
					imgSize="16px"
					text={refugee.phone}
					class="text-base text-slate-500 font-semibold"
				/>
			</a>
		</div>
		<div class="bg-gray-300 p-2 rounded-md mt-2 text-sm">
			{#if refugee.notes == ''} No notes {:else} {refugee.notes} {/if}
		</div>
	</div>
{/if}
