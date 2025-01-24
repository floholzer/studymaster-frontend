<template>
  <v-container fluid class="badge-list d-flex align-center">
    <v-row>
      <v-col
          v-for="(badge, index) in badges"
          :key="index"
          cols="auto"
          class="d-flex justify-center"
      >
        <Badge :BadgeTitle="badge.title" :BadgeDescription="badge.description" :colorClass="badge.colorClass"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Badge from "@/components/Tasks/Badge.vue";

export default {
  name: "BadgeList",
  components: {
    Badge,
  },
  data() {
    return {
      badges: [
        { title: "Rookie", description: "First step in your journey!", colorClass: "wood" },
        { title: "Bronze Achiever", description: "Completed 10 tasks!", colorClass: "bronze" },
        { title: "Silver Scholar", description: "Achieved 60 ECTS!", colorClass: "silver" },
        { title: "Golden Legend", description: "Perfect performance!", colorClass: "gold" },
      ], // nur Beispielbadges, werden später aus dem Store geladen
    };
  },
  /* async mounted() {
    try {
      await this.$store.dispatch("fetchBadges"); // Badges aus dem Store abrufen
      this.badges = this.$store.getters.getBadges;
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  }, */
};
</script>

<style scoped>
.badge-list {
  background-color: #f9f9f9;
  position: fixed;
  bottom: 30px;
  width: 100%;
  height: 120px;
  z-index: 10;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow-x: hidden;
  border-top: 1px solid #ccc;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
}

.badge-list::-webkit-scrollbar {
  display: none;
}
</style>
