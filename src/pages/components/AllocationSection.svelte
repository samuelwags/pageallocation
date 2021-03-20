<script>
    export let title, pages, paper, inks, index, start;
    import Page from './Page.svelte';
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
    <Page {page} pagePaper={paper} pageInks={inks}/>
{/each}

<style type="text/scss">

</style>