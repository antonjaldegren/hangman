const randomWord =
	words[Math.floor(Math.random() * words.length)].toUpperCase();
const wordToBeFilledIn = Array(randomWord.length).fill("");

let guessesMade = [];

printWordToBeFilledIn();
printKeyboard();

let livesLeft = 0;
const openButton = document.querySelector(".modal-button");
const modal = document.querySelector(".modal");
const banner = document.querySelector("header p");
const keys = document.querySelectorAll(".key");

openButton.addEventListener("click", () => {
	const input = parseInt(document.querySelector("input").value);
	if (input >= 1 && input <= 11) {
		livesLeft = input;
		modal.classList.add("hide");
		for (let i = 10; i > livesLeft - 1; i--) {
			revealPartOfMan(i);
		}
		printLivesLeft();
	}
});

function disableAllKeys() {
	keys.forEach((key) => (key.disabled = "true"));
}

function checkIfPlayerIsAlive() {
	if (livesLeft === 0) {
		banner.classList.add("player-lost");
		banner.prepend("You have lost - ");
		banner.classList.remove("hide");
		revealRemainingCharacters();
		disableAllKeys();
	}
}

function checkIfPlayerHasWon() {
	if (wordToBeFilledIn.join("") === randomWord) {
		banner.classList.add("player-won");
		banner.prepend("You have won - ");
		banner.classList.remove("hide");
		disableAllKeys();
	}
}

function isCorrectGuess(key) {
	return randomWord.toLowerCase().includes(key.id);
}

function revealCorrectCharacters(guess) {
	for (let i = 0; i < wordToBeFilledIn.length; i++) {
		if (randomWord[i].toLowerCase() === guess.id) {
			wordToBeFilledIn[i] = randomWord[i];
		}
	}
	printWordToBeFilledIn();
}

function revealRemainingCharacters() {
	for (let i = 0; i < wordToBeFilledIn.length; i++) {
		if (wordToBeFilledIn[i] === "") {
			wordToBeFilledIn[i] = randomWord[i];
		}
	}
	printWordToBeFilledIn();
}

function stylePressedKey(characterButton) {
	if (isCorrectGuess(characterButton)) {
		characterButton.classList.add("correct");
	} else {
		characterButton.classList.add("incorrect");
	}
	characterButton.disabled = "true";
}

function revealPartOfMan(livesLeft) {
	document
		.querySelector(`#livesLeft${livesLeft}`)
		.classList.add("reveal-man");
}

function decrementLivesLeft() {
	livesLeft--;
	revealPartOfMan(livesLeft);
	printLivesLeft();
}

keys.forEach((key) => {
	key.addEventListener("click", ({ target }) => {
		const pressedKey = target;
		if (isCorrectGuess(pressedKey)) {
			revealCorrectCharacters(pressedKey);
		} else {
			decrementLivesLeft();
		}
		stylePressedKey(pressedKey);
		checkIfPlayerHasWon();
		checkIfPlayerIsAlive();
	});
});
