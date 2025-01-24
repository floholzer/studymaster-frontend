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
    width: 110px;
    height: 150px;
    perspective: 1000px;
    font-family: sans-serif;
}

.title {
    font-size: 1.2em;
    font-weight: 900;
    text-align: center;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    max-height: 3rem;
    line-height: 1.2rem;
}

.medal {
    font-size: 3em;
    color: goldenrod;
    margin: 0 auto;
}

.desceription {
    font-size: 0.9em;
    font-weight: 500;
    text-align: center;
    margin: 0;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    max-height: 3rem;
    line-height: 1.2rem;
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
    align-items: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid;
    border-radius: 1rem;
    padding: 10px;
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
  background: #8B4513;
}

.bronze {
  background: #CD7F32;
  border-color: #8C6239;
}

.bronze-back {
  background: #8C6239;
}

.silver {
  background: #C0C0C0;
  border-color: #A8A8A8;
}

.silver-back {
  background: #A8A8A8;
}

.gold {
  background: #FFD700;
  border-color: goldenrod;
}

.gold-back {
  background: goldenrod;
}
</style>