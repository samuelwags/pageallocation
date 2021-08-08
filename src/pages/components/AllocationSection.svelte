<script>
    export let title, pages, paper, inks, index, start;
    import Page from './Page.svelte';
    import Footer from './Footer.svelte';
    import Header from './Header.svelte';
    import { onMount } from 'svelte';

    $: console.log(title);
    $: pageObjects = createPages(title, start, pages)

    function createPages(title, start, pages) {
        let newPages = []
        for(var i = start; i < start + pages; i++) {
            newPages.push({title: title, index: i});
        }
        return newPages;
    }
</script>

{#each pageObjects as page (page)}
    {#if page.index == 0}
        <Header />
    {/if}
    <Page {page} pagePaper={paper} pageInks={inks}/>
    {#if (page.index + 1) % 48 == 0}
        <Footer />
        <Header />
    {/if}
{/each}

<style type="text/scss">

</style>