<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="submitForm">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
</template>
  
<script>
    export default {
      data() {
        return {
          email: '',
          password: ''
        }
      },
      methods: {
        submitForm() {
          // Handle form submission here
        }
      }
    }
</script>

<style>
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
    }
    div {
        font-family: 'Montserrat', sans-serif;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 500px;
        height: 500px;
        border-radius: 50px;
        background: #e0e0e0;
        box-shadow: 41px 41px 82px #bebebe, -41px -41px 82px #ffffff;
    }
    h2 {
        margin-bottom: 2rem;
        color: #333;
    }
    input {
        width: 96%;
        padding: 0.5rem;
        margin: 0.5rem 0;
        border: none;
        border-radius: 10px;
        box-shadow: 8px 8px 16px #bbb, -8px -8px 16px #fff;
        outline: none;
    }
    button {
        width: 100%;
        padding: 0.5rem;
        margin-top: 1rem;
        border: none;
        border-radius: 10px;
        background: #e0e0e0;
        box-shadow: 8px 8px 16px #bbb, -8px -8px 16px #fff;
        cursor: pointer;
        outline: none;
    }
    button:active {
        box-shadow: inset 5px 5px 10px #bbb, inset -5px -5px 10px #fff;
    }
</style>