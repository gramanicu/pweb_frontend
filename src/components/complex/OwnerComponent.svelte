<script lang="ts">
	import Badge from '$components/simple/Badge.svelte';
	import ImageLabel from '$components/simple/ImageLabel.svelte';
	import type { Owner } from '$lib/types';
	import { Mail, Phone } from '@steeze-ui/heroicons';
	import { onMount } from 'svelte';

	export let ownerId: number;

	let owner: Owner;

	onMount(async () => {
		owner = {
			id: ownerId,
			auth0_id: 'auth0_id',
			email: 'email@example.com',
			phone: '0123456789',
			name: 'John Doe'
		};
	});
</script>

{#if owner}
	<div class="w-full max-w-sm p-4 border border-black rounded-md">
		<h1 class="font-bold text-2xl">{owner.name}</h1>
		<div class="py-2">
			<ImageLabel
				img={Mail}
				imgSize="16px"
				imgTheme="outline"
				imgColor="slate-500"
				text={owner.email}
				class="text-base text-slate-500 font-semibold"
			/>
		</div>
		<a href="tel:{owner.phone}" class="py-2">
			<ImageLabel
				img={Phone}
				imgColor="slate-500"
				imgSize="16px"
				text={owner.phone}
				class="text-base text-slate-500 font-semibold"
			/>
		</a>
	</div>
{/if}
