<script setup>
defineProps(['BadgeTitle', 'BadgeDescription', 'colorClass']);
</script>

<template>
    <div class="flip-card mx-1 my-1">
        <div class="flip-card-inner">
            <div class="flip-card-front" :class="colorClass">
                <p class="title">{{ BadgeTitle}}</p>
                <v-icon class="medal">mdi-medal</v-icon>
            </div>
            <div class="flip-card-back" :class="colorClass + '-back'">
                <p class="desceription">{{ BadgeDescription }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* From Uiverse.io by joe-watson-sbf */
.flip-card {
    background-color: transparent;
    width: 80px;
    height: 110px;
    perspective: 1000px;
    font-family: sans-serif;
}

.title {
    font-size: 0.9em;
    font-weight: 900;
    text-align: center;
    margin: 0;
    overflow-wrap: break-word;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 2.4rem;
    line-height: 1.2rem;
}

.medal {
    font-size: 2.5em;
    color: goldenrod;
    margin: 5px auto;
}

.desceription {
    font-size: 0.8em;
    font-weight: 500;
    text-align: center;
    margin: 0;
    overflow-wrap: break-word;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 4.3rem;
    line-height: 1.2rem;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 1.4s;
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
    align-items: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid;
    border-radius: 1rem;
    padding: 6px;
    box-sizing: border-box;
}

.flip-card-front {
  color: black;
}

.flip-card-back {
  color: black;
  transform: rotateY(180deg);
}

.wood {
  background: #D2B48C;
  border-color: #8B4513;
}

.wood-back {
  background: #D2B48C;
}

.bronze {
  background: #CD7F32;
  border-color: #8C6239;
}

.bronze-back {
  background: #CD7F32;
}

.silver {
  background: silver;
  border-color: darkgrey;
}

.silver-back {
  background: silver;
}

.gold {
  background: gold;
  border-color: goldenrod;
}

.gold-back {
  background: gold;
}
</style>