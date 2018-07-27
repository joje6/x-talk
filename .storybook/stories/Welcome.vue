<template>
  <h1>안녕하세요</h1>
</template>

<script>
export default {
  name: 'welcome',
  props: {
    showApp: {
      type: Function,
      default: () => console.log('Welcome to storybook!')
    }
  }
};
</script>

<style>
.main {
  margin: 15px;
  max-width: 600px;
  line-height: 1.4;
  font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans,
  sans-serif;
}

.logo {
  width: 200px;
}

.link {
  color: #1474f3;
  text-decoration: none;
  border-bottom: 1px solid #1474f3;
  padding-bottom: 2px;
}

.code {
  font-size: 15px;
  font-weight: 600;
  padding: 2px 5px;
  border: 1px solid #eae9e9;
  border-radius: 4px;
  background-color: #f3f2f2;
  color: #3a3a3a;
}

.note {
  opacity: 0.5;
}
</style>
