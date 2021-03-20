<script>
    import { onMount, getContext } from 'svelte';
    import { papers } from '../../store.js';
    import Paper from './Paper.svelte';

    function addPaper() {
        papers.update(papers => {
            papers.push({title: "", color: "#f0f0f0"});
            return papers;
        });
    }

    $: changePaperStyles($papers);

    const { getPaperStyleSheet } = getContext("printStyle");
    let styleElement = getPaperStyleSheet();

    function changePaperStyles(papers) {
        let string = papers.map( (paper, index) => {
            return `.paper${index} { background: ${paper.color} !important; -webkit-print-color-adjust: exact;}\n`
        }).join("");
        styleElement.innerText = string;
    }
</script>

<div class="papers">
    {#each $papers as paper, index (paper) }
        <Paper {index} color={paper.color} title={paper.title}/>
    {/each}
    <button on:click={addPaper}>+</button>
</div>

<style type="text/scss">
    .papers {
        vertical-align: top;
        border: 1px solid black;
        margin: 1em;
        padding: 1em;
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