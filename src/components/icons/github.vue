<template>
    <button aria-label="visit git hub repository">
        <a href="https://github.com/zulfidly/Currency-Converter" target="_blank" aria-label="visit git hub repository">
            <svg :class="[headerStyleIs.github]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="80px" height="80px" viewBox="-20 -20 80 80" enable-background="new -20 -20 80 80" xml:space="preserve">
                <g>
                    <path class="fill-[var(--color-text)]" d="M20-20C-1.528-20-18.968-2.088-18.968,20c0,22.092,17.452,40,38.968,40c21.526,0,38.969-17.906,38.969-40
                    C58.969-2.088,41.526-20,20-20z M31.699,55.926c-1.875,0.375-2.54-0.805-2.54-1.82c0-1.238,0.044-5.32,0.044-10.383
                    c0-3.535-1.19-5.844-2.508-7.021c8.225-0.93,16.859-4.134,16.859-18.672c0-4.132-1.431-7.521-3.799-10.164
                    c0.377-0.958,1.652-4.8-0.366-10.019c0,0-3.094-1.02-10.144,3.887c-2.949-0.843-6.109-1.269-9.245-1.285
                    c-3.141,0.016-6.302,0.434-9.24,1.285C3.708-3.164,0.606-2.152,0.606-2.152C-1.402,3.064-0.136,6.91,0.246,7.866
                    C-2.115,10.51-3.55,13.89-3.55,18.03c0,14.501,8.622,17.751,16.815,18.71c-1.05,0.945-2.008,2.615-2.344,5.057
                    C8.816,42.762,3.468,44.433,0.18,38.65c0,0-1.949-3.633-5.655-3.902c0,0-3.608-0.045-0.25,2.299c0,0,2.421,1.16,4.094,5.536
                    c0,0,2.172,7.366,12.441,5.079c0.019,3.16,0.051,5.541,0.051,6.443c0,1.004-0.668,2.172-2.524,1.818
                    C-6.34,50.914-16.914,36.727-16.914,20C-16.922-0.898-0.39-17.841,20-17.841S56.924-0.898,56.924,20.018
                    C56.924,36.738,46.352,50.914,31.699,55.926z"/>
                </g>
            </svg>
        </a>
    </button>
</template>

<script setup>
    import { headerStyleIs } from '../../GlobalVars.js';
</script>