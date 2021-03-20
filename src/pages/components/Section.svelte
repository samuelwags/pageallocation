<script>
    import { sections, inks, papers } from "../../store.js";
    import { createEventDispatcher } from 'svelte';
    export let section, index, active;
    let { pages, title, sectionPaper, sectionInks } = section;
    const dispatch = createEventDispatcher();

    $: changePaper(sectionPaper);
    $: changeSectionInks(sectionInks);

    function changePages() {
        sections.update( sections => {
            let newSections = sections;
            newSections[index].pages = pages;
            return newSections;
        });
    }

    function changeTitle() {
        sections.update( sections => {
            sections[index].title = title;
            return sections;
        });
    }

    function changePaper(sectionPaper) {
        sections.update( sections => {
            sections[index].sectionPaper = sectionPaper;
            return sections;
        });
    }

    function changeSectionInks(inks) {
        sections.update( sections => {
            sections[index].sectionInks = sectionInks;
            return sections;
        });
    }

    function makeActive() {
        dispatch("activate", index);
    }
    function closeActive() {
        dispatch("activate", -1)
    }

    $: console.log($papers.filter(paper => paper.title == sectionPaper));


</script>

<div class="section" class:active style="--bgColor: {$papers.filter(paper => paper.title == sectionPaper)}">
    {#if active}
        <div class="close" on:click={closeActive}>x</div>
        <div>
            <label>Title</label>
            <input type="text" bind:value={title} on:input={changeTitle}>
            <label>Number of pages</label>
            <input type="number" bind:value={pages} on:change={changePages}>
        </div>
        <div class="inks">
            <label>Inks</label>
            {#each $inks as ink}
                <div><input 
                        type="checkbox" 
                        id="{ink.title}" 
                        name="{ink.title}" 
                        bind:group={sectionInks} 
                        value={ink.title}
                    ><p class="inkLabel">{ink.title}</p></div>
            {/each}
        </div>
        <div class="paper">
            <label>Paper</label>
            <select name="papers" bind:value={sectionPaper}>
                {#each $papers as paper, index (paper)}
                    <option value="{index}">{paper.title}</option>
                {/each}
        </div>
    {:else}
        <div class="inactiveSection" on:click={makeActive}>
            <p>{title == "" ? "Untitled" : title}, {pages} pp</p>
            <div class="inks">
                {#each sectionInks as sectionInk}
                    <div class="ink" style="background: {$inks.filter( ink => ink.title == sectionInk)[0].color}"></div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style type="text/scss">
    .section {
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
        margin: 1rem;
        border-radius: 1rem;
        position: relative;
        width: 630px;

        &.active {
            box-sizing: border-box;
            padding: 1rem;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 1rem;
            label {
                font-family: monospace;
                font-weight: bold;
                font-size: 0.9rem;
                margin: 0 0 0.5rem;
            }
            .close {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(20px, -50%)
            }
        }
        
        .inactiveSection {
            box-sizing: border-box;
            border-radius: 1rem;

            position: relative;
            width: 100%;
            height: 100%;
            padding: 0.4rem 1rem;
            transition: 0.5s ease background-color;
            &:hover {
                background: rgb(240, 240, 240);
                cursor: pointer;
            }

            p {
                margin: 0;
                padding: 0;
            }
            .inks {
                right: 1rem;
                top: 0.4rem;
                position: absolute;
                height: 1rem;
                .ink {
                    margin: 1px 2px 0;
                    border-radius: 4px;
                    float: right;
                    width: 1rem;
                    height: 1rem;
                }
            }
        }
    }
    .inks {
        div {
            margin-top: 0.2rem;
        }
        .inkLabel {
            display: inline;
            margin: 1rem 0.5rem;
        }
    }
    .paper {
        select {
            min-width: 100%;
        }
    }
</style>