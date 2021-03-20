<script>
    import { sections, inks } from "../../store.js";
    import Section from "./Section.svelte";

    let activeSection = 0;

    function addSection() {
        sections.update( oldSections => {
            oldSections.push({title: "", pages: 0, sectionInks: $inks.map( ink => ink.title), sectionPaper: "0"});
            return oldSections;
        });
    }

    function changeActive(event) {
        activeSection = event.detail;
    }
</script>

<div class="sections">
    <h1> Sections </h1>
    {#each $sections as section, index}
        <Section 
            {section} 
            {index}
            active={index == activeSection}
            on:activate={changeActive}
        />
    {/each}
    <button on:click={addSection}>+</button>
</div>

<style type="text/scss">
    .sections {
        vertical-align: top;
        display: inline-block;
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