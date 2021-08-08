<script>
    import { sections, sizeShipping, finishing, proofing, papers } from '../../store.js';
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';

    $: materialSections = getMaterialSections($sections);

    function getMaterialSections(sections) {
        let materialSects = sections.reduce( (a, current, index, sections) => {
            console.log(a);
            if (index == 0) {
                a.push(current);
            } else {
                if (JSON.stringify(current.sectionInks) == JSON.stringify(a[a.length - 1].sectionInks) && current.sectionPaper == a[a.length - 1].sectionPaper) {
                    a[a.length - 1] = combineSections(a[a.length - 1], current, a.length - 1);
                } else {
                    a.push(current);
                }
            }
            return a;
        }, []);
        console.log(materialSects);
        return materialSects;
    }

    function combineSections(section1, section2, index) {
        let combinedSection = {
            title: "",
            pages: section1.pages + section2.pages,
            sectionInks: section1.sectionInks, 
            sectionPaper: section1.sectionPaper, 
            id: section1.id
        }
        return combinedSection;
    }
</script>

<Header />
<div class="allDetails">
    <div class="printDetailsLabels">
        <div>SIZE / SHIPPING</div>
        <div>FINISHING</div>
        <div>PROOFING</div>
    </div>
    <div class="printDetails">
        <div class="printSizeShipping">
            {@html $sizeShipping}
        </div>
        <div class="printFinishing">
            {$finishing}
        </div>
        <div class="printProofing">
            {$proofing}
        </div>
    </div>
    <div class="inkPaperCover">
        <div class="inkPaper">
            <div class="title">INK + PAPER</div>
            <div class="content">
                {#each materialSections as materialSection, index (materialSection.id)}
                    <p>Section {index + 1}, {materialSection.pages}<br>{$papers[materialSection.sectionPaper].title}, {materialSection.sectionInks.length} inks</p>
                {/each}
            </div>
        </div>
        <div class="cover">
            <div class="title">COVER</div>
            <div class="content">asdf</div>
        </div>
    </div>
</div>
<Footer />

<style type="text/scss">
    .allDetails {
        height: 925px;
    }
    .printDetailsLabels {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 0.4rem 1rem;
        div {
            &:not(:first-of-type) {
                padding-left: 1rem;
            }
        }
    }
    .printDetails {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        border: 1px solid black;
        padding: 1rem;
        min-height: 10rem;
        margin-bottom: 3rem;
        div {
            white-space: pre-wrap;
            &:not(:first-of-type) {
                border-left: 1px solid black;
                padding-left: 1rem
            }
        }
    }

    .inkPaperCover {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 3rem;
        margin-bottom: 3rem;
        div {
            .title {
                width: 100%;
                border-bottom: 1px solid black;
                padding: 0.4rem 0;
                margin-bottom: 1rem;
            }
        }
    }
</style>
