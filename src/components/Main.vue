<template>
	<div class="container">
		<div class="header">แปลงบันทึกหมาก PlayOK</div>
		<div class="main-section">
			<div class="input-group">
				<div class="input-elem-section">
					<input
						class="input"
						name="link"
						type="text"
						placeholder="e.g. https://www.playok.com/p/?g=mk63281508"
						v-on:change="requestPlayOK"
						v-model="urlString"
						ref="input"
					/>
					<img
						class="autofill-icon"
						src="../assets/autofill.png"
						v-on:click="autofill"
					/>
				</div>
				<div class="alert hidden" ref="alert-message"></div>
			</div>
			<div class="original" v-html="originalText"></div>
			<div class="final" v-html="finalText"></div>
		</div>
	</div>
</template>


<script src="./Main.ts"></script>
<style src="./Main.css"></style>
