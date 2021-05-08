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
	* {
		font-family: "Kanit", sans-serif;
	}

	input:focus {
		outline: none;
	}

	html {
		height: 100%;
	}
	body {
		margin: 0;
		background: linear-gradient(to top right, #00aefc 0%, #00dcef 100%);
		height: 100%;
	}
</style>
