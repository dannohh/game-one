document.addEventListener("DOMContentLoaded", () => {
    const gameText = document.getElementById("game-text");
    const userInput = document.getElementById("user-input");
    const submitButton = document.getElementById("submit-button");

    gameText.innerText = "Welcome to the game! What will you do first?";


    submitButton.addEventListener("click", () => {
        const input = userInput.value;
        // TODO: Handle the user input here
        console.log(input);
    });

    let playerAttributes = {
      health: 10,
      inventory: [],
      exp: 1
    }

    function saveGame() {
      localStorage.setItem('gameState', JSON.stringify({
        currentState,
        playerAttributes
      }))
    }

    function loadGame() {
      const savedData = JSON.parse(localStorage.getItem('gameState'));
      if(savedData) {
        currentState = savedData.currentState;
        playerAttributes = savedData.playerAttributes;
        updateState()
      }
    }

const GAME_STATES = {
  START: {
    text: "Welcome to the game. What will you do first?",
    options: [
      {
        text: "Explore",
        next: "EXPLORE"
      },
      {
        text: "Rest",
        next: "REST"
      }
    ],
  },
  EXPLORE: {
    text: "You decide to explore and find hidden treasure. Now what?",
    options: [
      {
        text: "take it",
        next: "TAKE_TREASURE"
      },
      {
        text: "leave it",
        next: "LEAVE"
      }
    ],
    action: () => {
      playerAttributes.health--;
      console.log(playerAttributes.health)
    },
  },
  REST: {
    text: "You decide to rest and regain some strength. What's next?",
    options: [
      {
        text: "continue resting",
        next: "REST"
      },
      {
        text: "Explore",
        next: "EXPLORE"
      }
    ],
    action: () => {
      playerAttributes.health++;
      console.log(playerAttributes.health)
    },
  },
  TAKE_TREASURE: {
    text: "You take the treasure and live happily ever after.",
    action: () => {
      playerAttributes.inventory.push("Treasure");
      console.log(playerAttributes)
    },
    options: []
  },
  LEAVE: {
    text: "You leave the treasure and continue on your journey",
    options: [
      {
        text: "Explore",
        next: "EXPLORE",
      },
      {
        text: "Rest",
        next: "REST"
      }
    ],
  },
  ENCOUNTER_MONSTER: {
    text: "You've encountered a monster!",
    options: [
      {
        text: "Fight Monster",
        next: "FIGHT_MONSTER"
      },
      {
        text:"Run Away!",
        next: "EXPLORE"
      }
    ]
  },
  FIGHT_MONSTER: {
    text: "You have slain the beast!",
    action: () => {
      playerAttributes.health--;
      playerAttributes.exp++;
      if(playerAttributes.health < 50){
        currentState = "DEAD"
      }
    },
    options: [
      {
        text:"Rest",
        next: "REST"
      },
      {
        text: "Explore",
        next: "EXPLORE"
      }
    ]
  },
  DEAD: {
    text: "Uh Oh, Time to try again!",
    options: [
      {
        text: "Start Over",
        next: "START"
      }
    ]
  }
}
//Initial state
let currentState = "START";

setInterval(() => {
    currentState = 'ENCOUNTER_MONSTER';
    console.log('exp: ',playerAttributes.exp);
    updateState();
}, 30000); // Trigger after 5 seconds


function updateState() {
  if (Math.random() < 0.2) { // 20% chance of encounter
    currentState = 'ENCOUNTER_MONSTER';

}

  const state = GAME_STATES[currentState];

  if(state.action) {
    state.action();
  }

  gameText.innerText = state.text;

  const backgroundContainer = document.getElementById("background-container");
  backgroundContainer.style.backgroundImage = `url(${currentState.toLowerCase()}.png)`

  const oldButtons = document.querySelectorAll(".option-button");
  oldButtons.forEach(button => {
    button.remove();
  });


  state.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("option-button");
    button.innerText = option.text;
    button.addEventListener("click", () => {
      currentState = option.next;
      updateState();
    });
    document.getElementById("game-container").append(button)
  });

}


updateState()

});
