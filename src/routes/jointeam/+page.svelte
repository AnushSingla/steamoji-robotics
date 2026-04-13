<script lang="ts">
    import { onMount } from 'svelte';
    import GlassPanel from '$lib/components/GlassPanel.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

    let isLoaded = $state(false);

    onMount(() => {
        const script = document.createElement('script');
        script.src = "https://form.jotform.com/jsform/251588200771154";
        script.type = "text/javascript";
        script.async = true;

        const container = document.getElementById('jotform-page-container');
        
        // Handle the "Finished Loading" state to prevent glitches
        script.onload = () => {
            // Small delay to ensure the iframe has finished its internal "painting"
            setTimeout(() => isLoaded = true, 500);
        };

        if (container) {
            container.appendChild(script);
        }
    });
</script>

<svelte:head>
    <title>Join the Team - Steamoji Bel-Red Robotics</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-32 pb-20 px-4">
    <div class="max-w-4xl mx-auto">
        
        <div class="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Season <span class="text-yellow-400">Registration</span>
            </h1>
            <p class="text-slate-300 text-lg max-w-2xl mx-auto">
                Complete the form below to register for the 2026-2027 Competition Season.
            </p>
        </div>

        <GlassPanel class="relative p-0 md:p-4 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border-white/5">
            
            {#if !isLoaded}
                <div class="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/20 backdrop-blur-sm z-10">
                    <LoadingSpinner size="lg" text="Loading Registration Form..." />
                </div>
            {/if}

            <div 
                id="jotform-page-container" 
                class="w-full min-h-[800px] transition-opacity duration-1000 ease-in-out {isLoaded ? 'opacity-100' : 'opacity-0'}"
            >
                </div>
        </GlassPanel>

        <p class="text-center mt-8 text-slate-500 text-xs uppercase tracking-widest font-medium">
            Secure Encryption Active • Powered by JotForm
        </p>
    </div>
</div>

<style>
    /* 1. Prevent internal background glitches */
    #jotform-page-container :global(iframe) {
        width: 100% !important;
        min-width: 100% !important;
        border: none !important;
        background: transparent !important;
        /* 2. Force dark mode scrollbars and browser behavior */
        color-scheme: dark; 
    }

    /* 3. Remove weird extra spacing JotForm sometimes adds */
    #jotform-page-container :global(.form-all) {
        margin: 0 auto !important;
        box-shadow: none !important;
    }

    /* 4. Fix for mobile "jumping" */
    :global(html) {
        scrollbar-gutter: stable;
    }
</style>