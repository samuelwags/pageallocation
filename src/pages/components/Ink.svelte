<script>
    import { onMount, getContext} from 'svelte';
    import { inks } from '../../store.js';
    export let title, color, index;

    function changeColor() {
        inks.update( inks => {
            let newInks = inks;
            newInks[index].color = color;
            return newInks;
        });
    }
    function changeTitle() {
        inks.update( inks => {
            let newInks = inks;
            newInks[index].title = title;
            return newInks;
        });
    }
</script>

<div class="ink">
    <input type="text" placeholder="ink title" bind:value={title} on:input={changeTitle}>
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