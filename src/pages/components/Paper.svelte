<script>
    import { papers } from '../../store.js';
    export let title, color, index;

    let showPicker = false;

    function changeColor() {
        papers.update( papers => {
            let newPapers = papers;
            newPapers[index].color = color;
            return newPapers;
        });
    }

    function changeTitle() {
        console.log("title change")
        papers.update( papers => {
            papers[index].title = title;
            return papers;
        });
    }
</script>

<div class="paper">
    <input type="text" placeholder="paper title" bind:value={title} on:input={changeTitle}>
    <input class="colorSelect" type="color" bind:value={color} on:input={changeColor}>
</div>

<style type="text/scss">
    .colorSelect {
        height: 2rem;
        width: 2rem;
        padding: 0 1px;
        margin: 0;
        vertical-align: top;
    }   
</style>