<script>
    import { saveAs } from 'file-saver';
    import { header, inks, sections, papers, sizeShipping, finishing, proofing } from '../../store.js';
    let saveFileName = "";
    let fileInput;

    function print() {
        window.print();
    }

    function save() {
        console.log("save clicked");
        let data = {
            inks: $inks,
            sections: $sections,
            papers: $papers,
            sizeShipping: $sizeShipping,
            finishing: $finishing,
            proofing: $proofing,
            header: $header
        }
        let blob = new Blob([JSON.stringify(data)], {type:"text/plain;charset=utf-8"});
        if (saveFileName != "") {
            saveAs(blob, saveFileName);
        } else {
            window.alert("You must give the file a name.");
        }
    }

    function load() {
        let file = fileInput.files[0];
        let fr = new FileReader();
        fr.onload = loadedText;
        fr.readAsText(file);
    }

    function loadedText(e) {
        let lines = e.target.result;
        let loadedData = JSON.parse(lines);
        populateData(loadedData);
    }

    function populateData(data) {
        inks.update( inks => data.inks);
        sections.update( sections => data.sections);
        papers.update( papers => data.papers );
        sizeShipping.update( sizeShipping => data.sizeShipping );
        finishing.update( finishing => data.finishing);
        proofing.update( proofing => data.proofing);
        header.update( header => data.header);
    }
</script>

<div class="savePrint">
    <div class="save">
        <label for="saveFileName">File Name</label>
        <input type="text" name="saveFileName" bind:value={saveFileName} placeholder="filename">
        <button on:click={save}>Save</button>
    </div>
    <div class="load">
        <label for="loadFile">Drop File</label>
        <input bind:this={fileInput} type="file" id="loadFile" name="loadFile">
        <button on:click={load}>Load</button>
    </div>
    <div class="print">
        <label>Print to PDF</label>
        <button on:click={print}>Print</button>
    </div>
</div>

<style type="text/scss">
    .savePrint {
        border: 1px solid black;
        padding: 1rem;
        div:not(:first-of-type) {
            margin: 0.8rem 0 0.5rem;
        }
    }
</style>