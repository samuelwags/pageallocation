<script>
    export let page, pagePaper, pageInks;
    import { papers, inks } from '../../store.js';
    let { index, title } = page;
</script>

<div class="page {index % 2 == 0 ? 'odd' : 'even'}">
    <div class="pageContent" style="background-color: {$papers[pagePaper].color}">
        <p class="title">{title}</p>
        <div class="inks">
            {#each pageInks as pageInk, index}
                <div class="ink ink{index}"></div>
            {/each}
        </div>
    </div>
    
    <p class="pageNum">{index + 1}<p>
</div>

<style type="text/scss">
    .page {
        float: left;
        width: 80px;
        text-align: center;
        &.odd {
            margin-left: -1px;
        }
        &.even {
            margin-left: 15px;
        }
        .pageContent {
            border: 1px solid black;
            -webkit-print-color-adjust: exact;

            p {
                margin: 0;
                padding: 1rem 0;
                height: 65px;
            }
        }
        .inks {
            display: flex;
            height: 20px;
        }
        .pageNum {
            margin: 0.2rem 0 0.5rem;
        }
    }

    :global(.page .pageContent .inks .ink) {
        height: 100%;
        width: 100px;
        flex-shrink: 1;
    }
</style>