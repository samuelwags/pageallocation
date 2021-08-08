<script>
    import AllocationSection from './AllocationSection.svelte';
    import DetailsPrint from './DetailsPrint.svelte';
    import { sections, inks } from '../../store.js';
    import { runningSum } from '../../utils.js';

    $: sectionStarts = runningSum($sections.map( section => section.pages));
</script>

<div class="allocation">
    <DetailsPrint />
    <div class="pages">
        {#each $sections as section, index}
            <AllocationSection title={section.title} paper={section.sectionPaper} inks={section.sectionInks} pages={section.pages} start={sectionStarts[index]} />
        {/each}
    </div>
</div>

<style type="text/scss">
    .allocation {
        position: relative;
        box-sizing: border-box;
        padding: 1rem;
        width: 887px;
        flex-shrink: 0;
        height: 100%;
        overflow-y: scroll;
        background-color: rgb(240, 240, 240);
        .pages {
            box-sizing: border-box;
            width: 100%;
            padding-right: 120px;
        }
    }
</style>