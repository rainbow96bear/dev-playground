<script lang="ts">
	import { PotentialOptionToEng } from "$lib/constants";
    import "./PotentialOption.css"

    export let potential_type:string;
    export let option_grade: string;
    export let option1:string;
    export let option2:string;
    export let option3:string;
</script>

<div class="divider">
    <div class="potential_option_grade_detail_box">
        <div class="potential_option_detail_icon {PotentialOptionToEng[option_grade]}_detail_icon">
            {PotentialOptionToEng[option_grade].charAt(0).toUpperCase()}
        </div>
        <div class={PotentialOptionToEng[option_grade]}_detail>
            {potential_type}
        </div>
    </div>
    <ul>
        {option1}
    </ul>
    <ul>
        {option2}
    </ul>
    <ul>
        {option3}
    </ul>
</div>