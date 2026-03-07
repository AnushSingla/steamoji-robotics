<script lang="ts">
    import '../app.css';
    import { ModeWatcher } from 'mode-watcher';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { browser } from '$app/environment';

    let { children } = $props();

    // 1. This is your secret password/key
    const ACCESS_KEY = "m3K8P9wX2yB7qV5nL1zR6tJ4hD9fN0sA";
    let isAuthorized = $state(false);

    if (browser) {
        // 2. Check if the URL has ?key=... OR if they unlocked it before
        const params = new URLSearchParams(window.location.search);
        const hasKey = params.get('key') === ACCESS_KEY;
        const previouslyUnlocked = localStorage.getItem('unlocked') === 'true';

        if (hasKey || previouslyUnlocked) {
            isAuthorized = true;
            localStorage.setItem('unlocked', 'true');
        }
    }
</script>

<svelte:head>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<ModeWatcher />

{#if isAuthorized}
    <div class="flex min-h-screen flex-col bg-gray-950 text-white">
        <Navbar />
        <main class="flex-1">
            {@render children()}
        </main>
        <Footer />
    </div>
{:else}
    <div class="flex h-screen items-center justify-center bg-black text-white p-10 text-center">
        <div>
            <h1 class="text-6xl font-bold mb-4">404</h1>
            <p class="text-gray-500">The page you requested could not be found.</p>
        </div>
    </div>
{/if}