<script setup lang="ts"></script>

<template>
  <main>
    <div class="calendar">
      <h2>Upcoming Shows</h2>
      <ul class="event-list">
        <li class="event-item">
          <div class="event-details">
            <span class="event-date">October 6, 2024</span>
            <span class="event-venue">Laurelthirst Brewing, Portland</span>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.calendar {
  margin: 40px auto;
  padding: 30px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.event-list {
  list-style-type: none;
  padding: 0;
}

.event-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
  transition: all 0.3s ease;
}

.event-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.event-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-date {
  font-weight: bold;
  color: #4a4a4a;
}

.event-venue {
  color: #666;
}
</style>
