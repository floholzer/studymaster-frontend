<script setup>
defineProps(['BadgeTitle', 'BadgeDescription']);
</script>

<template>
    <div class="flip-card mx-1 my-1">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <p class="title">{{ BadgeTitle}}</p>
                <v-icon class="medal">mdi-medal</v-icon>
            </div>
            <div class="flip-card-back">
                <p class="desceription">{{ BadgeDescription }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* From Uiverse.io by joe-watson-sbf */
.flip-card {
    background-color: transparent;
    width: 110px;
    height: 150px;
    perspective: 1000px;
    font-family: sans-serif;
}

.title {
    font-size: 1.3em;
    font-weight: 900;
    text-align: center;
    margin: 0;
}

.medal {
    font-size: 3em;
    color: goldenrod;
    margin: 0 auto;
}

.desceription {
    font-size: 1em;
    font-weight: 500;
    text-align: center;
    margin: 0;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid goldenrod;
    border-radius: 1rem;
}

.flip-card-front {
    background: gold;
}

.flip-card-back {
    background: goldenrod;
    color: black;
    transform: rotateY(180deg);
}
</style>