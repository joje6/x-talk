<template>
  <div class="x-signin">
    <h1 class="x-signin-logo">로그인</h1>

    <form @submit="signin">
      <div class="x-signin-form">
        <div class="x-signin-form-control">
          <input v-model="email" type="email" placeholder="이메일" required>
        </div>
      </div>

      <div class="x-signin-buttons">
        <button type="submit" class="x-signin-button">접속하기</button>
      </div>
    </form>
  </div>
</template>

<script>
import connect from 'x-talk-connect';

export default {
  name: 'XSignin',
  components: {},
  props: {
    dataEmail: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      email: this.dataEmail
    };
  },
  watch: {
    email(value) {
      this.$emit('emailchange', value);
    }
  },
  mounted() {
  },
  methods: {
    signin(e) {
      this.$nextTick(async () => {
        try {
          const session = await connect.signin({
            email: this.email
          });
          //console.log('session', session);

          if( !session ) throw new Error('세션을 찾을 수 없습니다.');

          this.$emit('signin', session);
        } catch(error) {
          this.$emit('error', error);
        }
      });

      e && e.preventDefault();
    }
  }
};
</script>

<style lang="less">
  @import "~@/src/less/variables";

  :host {
    border: 1px solid #aaa;
  }

  .x-signin {
    padding: 20px;
    background-color: @brand-primary;

    .x-signin-logo {
      text-indent: -9999px;
      background: url('./signin-logo.png?embed') no-repeat center;
      background-size: auto 100%;
      height: 200px;
    }

    .x-signin-error {
      margin: 30px 0;
    }

    .x-signin-form {
      margin: 25px 0;
    }

    .x-signin-form-control {
      font-size: 0.9em;
      padding: 11px 14px;
      background: white;

      &:last-child {
        border-bottom: none;
      }

      input {
        width: 100%;
        border: none;
        padding: 5px 0;
        font-size: 1.2em;
        background: #fff;
        vertical-align: middle;
      }
    }

    .x-signin-button {
      display: block;
      cursor: pointer;
      width: 100%;
      font-weight: bold;
      font-size: 1.1em;
      text-align: center;
      vertical-align: middle;
      border: 1px solid transparent;
      white-space: nowrap;
      padding: 15px 16px;
      user-select: none;
      background-color: #FFBD09;
      transition: opacity .35s;

      &:hover {
        opacity: .6;
      }
    }
  }
</style>



