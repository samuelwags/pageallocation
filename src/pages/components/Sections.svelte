<script>
    import { sections, inks } from "../../store.js";
    import uuidv4 from 'uuid/v4';
    import { onMount } from 'svelte';
    import {flip} from 'svelte/animate';
    import { fly } from 'svelte/transition';
    import Section from "./Section.svelte";
    import {dndzone} from "svelte-dnd-action";

    let activeSection = 0;
    let elTops = [];

    onMount( () => {
        elTops = getElTops();
    })

    function getElTops() {
        let tops = [...document.querySelectorAll(".draggable")].map( el => {
            let rect = el.getBoundingClientRect();
            return rect.top;
        });
        console.log(tops);
        return tops;
    }

    function addSection() {
        sections.update( oldSections => {
            oldSections.push({title: "", pages: 0, sectionInks: $inks.map( ink => ink.title), sectionPaper: "0", id: uuidv4()});
            return oldSections;
        });
        activeSection = $sections.length - 1;
        setTimeout( () => {
            elTops = getElTops();
        }, 100);
    }

    function changeActive(event) {
        activeSection = event.detail;
        elTops = getElTops();
    }

    function reactToRemove(event) {
        if (activeSection == event.detail) {
            activeSection = -1;
        } else if (activeSection < event.detail) {

        } else if (activeSection > event.detail) {
            activeSection -= 1;
        }
        elTops = getElTops();
    }

    function handleOrderUpdate(event) {
        let pair = event.detail;
        if (pair.includes(activeSection)) {
           activeSection = pair.filter( item => item != activeSection)[0]; 
        }
        elTops = getElTops();
    }

</script>

<div class="sections">
    {#each $sections.concat([{id: "add button"}]) as section, index (section.id)}
        <div class="draggable" in:fly="{{ y: -200, duration: 400 }}" animate:flip="{{duration: 400}}">
            {#if index != $sections.length}
                <Section 
                    {section} 
                    {index}
                    {elTops}
                    active={index == activeSection}
                    on:activate={changeActive}
                    on:remove={reactToRemove}
                    on:orderUpdate={handleOrderUpdate}
                />
            {:else}
                <button on:click={addSection}>+</button>
            {/if}
        </div>
    {/each}
</div>

<style type="text/scss">
    .sections {
        border: black 1px solid;
        vertical-align: top;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        h1 {
            padding-left: 1rem;
            margin: 1rem 0;
        }

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