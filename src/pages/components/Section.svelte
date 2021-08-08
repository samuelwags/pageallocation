<script>
    import { sections, inks, papers } from "../../store.js";
    import { createEventDispatcher } from 'svelte';
    import { array_move } from '../../utils.js';
    import {flip} from 'svelte/animate';
    export let section, index, active, elTops;
    let sectionEl, clone, cloneX, cloneY, mouseX, mouseY;
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

    function removeSection(e) {
        e.stopPropagation();
        sections.update( sections => {
            sections.splice(index, 1);
            return sections;
        });
        dispatch("remove", index);
    }

    function catchClick(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function startDrag(e) {
        e.stopPropagation();
        e.preventDefault();
        clone = sectionEl.cloneNode(true);
        sectionEl.classList.add("dim");
        clone.style.top = "0";
        clone.style.left = "0";
        clone.style.width = `${sectionEl.offsetWidth}px`;
        clone.style.position = "fixed";
        clone.style.margin = "0";
        clone.style.transition = "transform 0.1s ease-out";
        clone.classList.remove("draggable");
        let rect = sectionEl.getBoundingClientRect(); 
        cloneX = rect.left;
        cloneY = rect.top;
        mouseX = e.clientX;
        mouseY = e.clientY;
        clone.style.transform = `translate(${cloneX}px, ${cloneY}px)`;
        document.body.appendChild(clone);

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", endDrag);
    }

    function handleMove(e) {
        cloneX += e.movementX;
        cloneY += e.movementY;
        clone.style.transform = `translate(${cloneX}px, ${cloneY}px)`;
        checkToReorder()
    }

    function checkToReorder() {
        if ( cloneY > elTops[index + 1] ) {
            updateOrder("down");
        } else if ( cloneY < elTops[index - 1] ) {
            updateOrder("up");
        }
    }

    function updateOrder(direction) {
        if (direction == "up") {
            if (index != 0) {
                sections.update( sections => {
                    return array_move( sections, index, (index - 1));
                });
                dispatch("orderUpdate", [index, index - 1]);
            }
        } else if (direction == "down" ) {
            if (index != $sections.length -1) {
                sections.update( sections => {
                    return array_move( sections, index, (index + 1));
                });
                dispatch("orderUpdate", [index, index + 1]);
            }
        }
    }

    function endDrag(e) {
        e.stopPropagation();
        e.preventDefault();
        sectionEl.classList.remove("dim");
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", endDrag);
        let rect = sectionEl.getBoundingClientRect(); 
        cloneX = rect.left;
        cloneY = rect.top;
        clone.style.transform = `translate(${cloneX}px, ${cloneY}px)`;
        clone.style.transition = `transform 0.5s ease`;
        setTimeout( () => {
            clone.remove();
        }, 500);
    }

    $: console.log($papers.filter(paper => paper.title == sectionPaper));


</script>

<div class="section" bind:this={sectionEl} class:active style="--bgColor: {$papers.filter(paper => paper.title == sectionPaper)}">

    {#if active}
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
        <div class="buttons">
            <div class="remove" on:click={removeSection}>x</div>
            <div class="handle" on:click={catchClick} on:mousedown={startDrag}>o</div>
            <div class="close" on:click={closeActive}>-</div>
        </div>

    {:else}
        <div class="inactiveSection" on:click={makeActive}>
            <p>{title == "" ? "Untitled" : title}, {pages} pp</p>
            <div class="inks">
                {#each sectionInks as sectionInk}
                    <div class="ink" style="background: {$inks.filter( ink => ink.title == sectionInk)[0].color}"></div>
                {/each}
            </div>
            <div class="buttons">
                <div class="remove" on:click={removeSection}>x</div>
                <div class="handle" on:click={catchClick} on:mousedown={startDrag}>o</div>
            </div>
        </div>
    {/if}
</div>

<style type="text/scss">
:global(.dim) {
    opacity: 0.2 !important;
}
    .section {
        background: white;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
        margin: 0 0 1rem;
        border-radius: 1rem;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        border-top: 1px solid rgb(230, 230, 200);

        &.active {
            box-sizing: border-box;
            padding: 1rem;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 1rem;
            width: calc(100% - 2rem);
            label {
                &:not(:first-of-type) {
                    margin-top: 0.8rem;
                }
            }
            .buttons {
                position: absolute;
                right: 0;
                top: 0;
                transform: translatex(115%);
                div {
                    border-radius: 1rem;
                    width: 1.95rem;
                    height: 1.9rem;
                    box-sizing: border-box;
                    border: 1px solid rgb(200, 200, 200);
                    color: rgb(200, 200, 200);
                    text-align: center;
                    line-height: 1.65rem;
                    background: rgb(240, 240, 240);
                    margin-bottom: 3px;
                    &:hover {
                        background: rgb(100, 100, 100);
                        border-color: black;
                        color: white;
                        cursor: pointer;
                    }
                }
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
            overflow: hidden;
            &:hover {
                background: rgb(240, 240, 240);
                cursor: pointer;
            }

            p {
                margin: 0;
                padding: 0;
            }

            .inks {
                right: 5rem;
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
            .buttons {
                right: 0;
                top: 0;
                height: 100%;
                position: absolute;
                display: flex;
                flex-direction: row;
                div {
                    width: 1.95rem;
                    height: 1.9rem;
                    box-sizing: border-box;
                    border-left: 1px solid rgb(200, 200, 200);
                    color: rgb(200, 200, 200);
                    text-align: center;
                    line-height: 1.65rem;
                    background: rgb(240, 240, 240);
                    &:hover {
                        background: rgb(100, 100, 100);
                        border-color: black;
                        color: white;
                    }
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