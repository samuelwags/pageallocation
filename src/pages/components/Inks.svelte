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
    <label>Inks</label>
    {#each $inks as ink, index}
        <Ink title={ink.title} color={ink.color} {index} />
    {/each}
    <button on:click={addInk}>+</button>
</div>



<style type="text/scss">
    .inks {
        vertical-align: top;
        margin: 1em;
        display: inline-block;
    }

    button {
        position: relative;
        display: block;
        margin: 0 auto;
        width: 100px;
        border-radius: 1rem;
        transition: 0.5s ease background-color;
        &:hover {
            cursor: pointer;
            background-color: rgb(200, 200, 200);
        }
    }
</style>