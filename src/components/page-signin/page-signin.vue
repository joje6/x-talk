<template>
  <div class="page-signin">
    <div class="page-signin-body">
      <x-signin email="test@test.com" @signin="signin" @error="error" />
    </div>
  </div>
</template>

<script>
import XSignin from '../x-signin/x-signin.vue';
import xrouter from 'x-router';
import swal from 'sweetalert';

export default {
  name: 'PageSignin',
  components: { XSignin },
  methods: {
    signin(session) {
      console.log('signin', session);
      session && xrouter.href('/channel');
    },
    error(err) {
      swal('로그인 실패', `오류내용 : ${err.message}`, 'error');
    }
  }
};
</script>

<style lang="less">
  @import "~@/src/less/variables";

  .page-signin {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    z-index: 1;
    display: block;

    &:before {
      content: "";
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      margin-right: -.25em;
    }

    .page-signin-body {
      display: inline-block;
      width: 450px;
      text-align: initial;
      vertical-align: middle;
      background-color: @brand-primary;
    }

    @media (max-width: @screen-xs) {
      &:before {
        display: none;
      }

      .page-signin-body {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
