const keyboardElement = document.querySelector("#keyboard");
const livesLeftElement = document.querySelector("#livesLeft");
const wordToBeFilledInElement = document.querySelector("#wordToBeFilledIn");

function printWordToBeFilledIn() {
	document
		.querySelectorAll(".character-container")
		.forEach((characterContainer) => characterContainer.remove());
	wordToBeFilledIn.forEach((character) => {
		const characterContainer = document.createElement("div");
		characterContainer.classList.add("character-container");
		const characterSpan = document.createElement("span");
		characterSpan.textContent = character;
		characterContainer.append(characterSpan);
		wordToBeFilledInElement.append(characterContainer);
	});
}

function printKeyboard() {
	"abcdefghijklmnopqrstuvwxyz".split("").forEach((character) => {
		const characterButton = document.createElement("button");
		characterButton.classList.add("key");
		characterButton.id = character;
		characterButton.textContent = character.toUpperCase();
		keyboardElement.append(characterButton);
	});
}

function printLivesLeft() {
	livesLeftElement.textContent = `Lives left: ${livesLeft}`;
}
