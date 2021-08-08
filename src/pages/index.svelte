<script>
    import { metatags } from '@roxi/routify'
    import { setContext } from 'svelte';
    import Console from './components/Console.svelte';
    import PrintDocument from './components/PrintDocument.svelte';


    metatags.title = 'Content Object Page Allocation';
    metatags.description = 'Description coming soon...'

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

<div class="app">

    <Console />
    <PrintDocument />

</div>

<style type="text/scss">
    .app {
        width: calc(100%);
        box-sizing: border-box;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: start;
        height: calc(100vh);
    }
</style>

