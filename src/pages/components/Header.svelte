<script>
    import { header } from '../../store.js';

    let date = new Date().toISOString().slice(0, 10);
</script>

<div class="header">
    {$header}
    <div class="date">
        {date}
    </div>
</div>

<style type="text/scss">
    .header {
        white-space: pre-wrap;
        height: 2.4rem;
        margin-bottom: 2rem;
        border-bottom: solid 1px black;
        position: relative;
        width: 100%;
        &:after {
            content: " ";
            width: 100%;
            position: absolute;
            bottom: 5px;
            left: 0;
            border-bottom: solid 1px black;
        }
        .date {
            float:right;
        }
    }
    
</style>