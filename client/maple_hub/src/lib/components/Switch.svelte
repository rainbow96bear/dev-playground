<style>
.wrapper {
    width: 50px;
    height: 50px;
    text-align: center;
    margin: 50px auto;
}
#switch {
    position: absolute;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.switch_label {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 58px;
    height: 28px;
    background: #fff;
    border: 2px solid var(--mushromm1); /* CSS 변수 사용 */
    border-radius: 20px;
    transition: 0.2s;
}

.switch_label:hover {
    background: #efefef;
}

.onf_btn {
    position: absolute;
    top: 4px;
    left: 3px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: #E7E94F;
    transition: 0.2s;
}

/* checking style */
#switch:checked + .switch_label {
    background: #CD7D31;
    border: 2px solid #CD7D31;
}

#switch:checked + .switch_label:hover {
    background: #CD7D31;
}

/* move */
#switch:checked + .switch_label .onf_btn {
    left: 34px;
    background: #E7E94F;
}
</style>

<div class="wrapper">
<!-- 스타일에 CSS 변수를 사용 -->
<input 
    type="checkbox" 
    id="switch"
>
<label for="switch" class="switch_label">
    <span class="onf_btn"></span>
</label>
</div>
