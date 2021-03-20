<script>
    import { metatags } from '@roxi/routify'
    import { setContext } from 'svelte';
    import Page from './components/Page.svelte';
    import Inks from './components/Inks.svelte';
    import Papers from './components/Papers.svelte';
    import Sections from './components/Sections.svelte';
    import AllocationSection from './components/AllocationSection.svelte';

    import { sections, inks } from '../store.js';

    import { runningSum } from '../utils.js';

    metatags.title = 'Content Object Page Allocation';
    metatags.description = 'Description coming soon...'

    $: sectionStarts = runningSum($sections.map( section => section.pages));

    let printStyleSheet = createStyleSheet();
    let paperStyleSheet = createStyleSheet();
    setContext("printStyle",  {
        getStyleSheet: () => printStyleSheet,
        getPaperStyleSheet: () => paperStyleSheet
    });
    
    function createStyleSheet() {
        var styleElement = document.createElement('style');
       
        document.head.appendChild(styleElement);
        var styleSheet = styleElement.sheet;
        styleSheet.media.appendMedium("print");
        return styleElement;
    }

</script>

<div class="console noPrint">
    <Inks />
    <Papers />
    <Sections />
</div>

<div class="allocation">
    {#each $sections as section, index}
        <AllocationSection title={section.title} paper={section.sectionPaper} inks={section.sectionInks} pages={section.pages} start={sectionStarts[index]} />
    {/each}
</div>

<style type="text/scss">
    .allocation {
        width: 900px;
    }
</style>

