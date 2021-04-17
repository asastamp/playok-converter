<template>
	<div class="container">
		<img class="logo" src="../assets/logo.png" />
		<div class="main-section">
			<div class="input-group">
				<input
					class="input"
					name="link"
					type="text"
					placeholder="e.g.https://www.playok.com/p/?g=mk63281508"
					v-on:change="requestPlayOK"
				/>
			</div>
			<div class="original" v-html="originalText"></div>
			<div class="final" v-html="finalText"></div>
		</div>
	</div>
</template>


<script src="./Main.ts"></script>
<style src="./Main.css" scoped></style>
