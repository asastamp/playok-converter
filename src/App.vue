<template>
	<Main />
</template>

<script lang="ts">
	import { Options, Vue } from "vue-class-component";
	import Main from "./components/Main.vue";

	@Options({
		components: {
			Main,
		},
	})
	export default class App extends Vue {}
</script>

<style>
	html {
		height: 100%;
	}
	body {
		margin: 0;
		background: linear-gradient(to top right, #00aefc 0%, #00dcef 100%);
		height: 100%;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
