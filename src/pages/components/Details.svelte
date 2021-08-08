<script>
    import { sizeShipping, finishing, proofing, header } from '../../store.js';
    let localSizeShipping = $sizeShipping;
    let localFinishing = $finishing;
    let localProofing = $proofing;
    let localHeader = $header;

    function changeSizeShipping() {
        sizeShipping.update( sizeShipping => {
            return localSizeShipping;
        });
    }

    function changeFinishing() {
        finishing.update( finishing => {
            return localFinishing;
        })
    }

    function changeProofing() {
        proofing.update( proofing => {
            return localProofing;
        });
    }
    function changeHeader() {
        header.update( header => {
            return localHeader;
        });
    }
</script>

<div class="details">
    <label for="header">Running Header</label>
    <textarea id="header" name="header" rows="2"
        bind:value={localHeader}
        on:input={changeHeader}></textarea>
    <label for="sizeShipping">Size / Shipping</label>
    <textarea id="sizeShipping" name="sizeShipping" rows="8" 
        bind:value={localSizeShipping} 
        on:input={changeSizeShipping}></textarea>

    <label for="finishing">Finishing</label>
    <textarea id="finishing" name="finishing" rows="8" 
        bind:value={localFinishing}
        on:input={changeFinishing}></textarea>

    <label for="proofing">Proofing</label>
    <textarea id="proofing" name="proofing" rows="8" 
        bind:value={localProofing}
        on:input={changeProofing}></textarea>
</div>

<style type="text/scss">
    textarea {
        width: 100%;
    }

    .details {
        padding: 1rem;
        border: black 1px solid;
    }

    label {
        &:not(:first-of-type) {
            margin: 0.8rem 0 0.2rem;
        }
    }
</style>