<template>
  <div class="about">
    <div class="about-content">
      <h1>Cover Band</h1>
      <br />
      <p>
        Cover Band is the Pacific Northwest's premier cover band. Founded in 2024, their eclectic
        mix of songs and styles are impossible to resist. Unironically they play originals as well
        as covers.
      </p>

      <div
        class="band-members"
        style="display: flex; justify-content: space-around; flex-wrap: wrap; margin-top: 20px"
      >
        <div class="band-member">
          <img
            src="@/assets/nat.png"
            alt="Natalie"
            class="member-photo"
            style="
              width: 200px;
              height: 200px;
              object-fit: cover;
              border-radius: 10px;
              border: 2px solid beige;
            "
          />
          <div class="member-info">
            <h3>Natalie</h3>
            <p>Lead Vocals, Ukulele</p>
          </div>
        </div>
        <div class="band-member">
          <img
            src="@/assets/seth.png"
            alt="Seth"
            class="member-photo"
            style="
              width: 200px;
              height: 200px;
              object-fit: cover;
              border-radius: 10px;
              border: 2px solid beige;
            "
          />
          <div class="member-info">
            <h3>Seth</h3>
            <p>Guitar, Backing Vocals</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
