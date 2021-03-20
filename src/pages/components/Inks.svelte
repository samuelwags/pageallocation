<script>
    import { getContext } from 'svelte';
    import { inks } from '../../store.js';
    import Ink from './Ink.svelte';

    function addInk() {
        inks.update(inks => {
            inks.push({title: "", color: ""});
            return inks
        });
    }

    $: changeInkStyles($inks);

    const { getStyleSheet } = getContext("printStyle");
    let styleElement = getStyleSheet();

    function changeInkStyles(inks) {
        let string = inks.map( (ink, index) => {
            return `.ink${index} { background: ${ink.color} !important; -webkit-print-color-adjust: exact;}\n`
        }).join("");
        styleElement.innerText = string;
    }
</script>

<div class="inks">
    {#each $inks as ink, index}
        <Ink title={ink.title} color={ink.color} {index} />
    {/each}
    <button on:click={addInk}>+</button>
</div>



<style type="text/scss">
    .inks {
        vertical-align: top;
        border: 1px solid black;
        margin: 1em;
        padding: 1em;
        display: inline-block;
    }
</style>