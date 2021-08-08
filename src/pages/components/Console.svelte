<script>
import Inks from './Inks.svelte';
import Papers from './Papers.svelte';
import Sections from './Sections.svelte';
import Details from './Details.svelte';
import SavePrint from './SavePrint.svelte';

let activeEl = 0;
</script>

<div class="consoleContainer">
    <div class="consoleMenu noPrint">
        <ul>
            <li 
                on:click={() => activeEl = 0}
                class:active={activeEl == 0}
                >Details</li>
            <li 
                on:click={() => activeEl = 1}
                class:active={activeEl == 1}
                >Materials</li>
            <li 
                on:click={() => activeEl = 2}
                class:active={activeEl == 2}
                >Sections</li>
            <li
                on:click={() => activeEl = 3}
                class:active={activeEl == 3}
                >Save, Load, Print</li>
        </ul>
    </div>


    <div class="console noPrint">
        {#if (activeEl == 0)}
            <Details />
        {:else if (activeEl == 1)}
            <div class="materials">
                <Inks />
                <Papers />
            </div>
        {:else if (activeEl == 2)}
            <Sections />
        {:else if (activeEl == 3)}
            <SavePrint />
        {/if}
    </div>
</div>


<style type="text/scss">
    .materials {
        border: 1px solid black;
    }
    .consoleContainer {
        width: 660px;
        flex-shrink: 1;
        height: 100%;
    }
    .console {
        max-width: 630px;
        box-sizing: border-box;
    }
    .consoleMenu {
        box-sizing: border-box;
        ul {
            padding: 0;
            margin: 0;
            list-style: none;
            overflow: auto;
            li {
                display: inline-block;
                float: left;
                list-style: none;
                height: 1rem;
                padding: 0.2rem 0.4rem 0.3rem;
                border-right: black 1px solid;
                border-top: black 1px solid;
                transition: background-color 0.5s ease;
                margin: 0;
                &:first-of-type {
                    border-left: black 1px solid;
                }
                &.active {
                    background: rgb(220, 220, 220)
                }
                &:hover {
                    cursor: pointer;
                    background: rgb(230, 230, 230)
                }
            }
        }
    }
</style>