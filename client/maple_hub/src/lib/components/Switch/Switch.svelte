<script lang="ts">
    import "./Switch.css";

    export let onToggle: () => void;
</script>

<div class="wrapper">
    <input 
        type="checkbox" 
        id="switch"
        class="switch_input"
        on:change={onToggle}
    >
    <label for="switch" class="switch_label">
        <span class="onf_btn"></span>
    </label>
</div>
