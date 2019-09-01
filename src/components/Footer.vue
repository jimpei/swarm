<template>
  <div class="footer">
    <div class="card-body p-3 mb-2 bg-light text-darks">
      <blockquote class="blockquote mb-0">
        <p>Footer aaa.</p>
        <footer class="blockquote-footer">2019 Jimpei <cite title="Source Title">Source Title</cite></footer>
      </blockquote>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer",
  props: {
    msg: String
  }
};
</script>
