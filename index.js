const $ = require('jquery')
let {chance, community} = require('./cards')
const allCards = {
  chanceBk: chance.slice(),
  communityBk: community.slice(),
}

const getCard = (cardType)=> {
  const cards = cardType === 'chance' ? chance : community;
  const max = cards.length -1
  const min = 0
  // get a random index from array
  const rand = Math.floor(Math.random() * (max - min ) + min)
  
  // remove selected card
  if (cardType === 'chance') {
    chance.splice(rand, 1)
    console.log('remaining cards: ', chance.length-1)
  }
  else {
    community.splice(rand,1)
    console.log('remaining cards: ', community.length-1)
  }
  
  // return card
  return cards[rand]
}

const resetCards = (cardType)=> {
  const key = `${cardType}Bk`

  if (cardType === "chance") {
    chance = allCards[key].slice()
    console.log('remaining cards: ', chance.length-1)
  }
  else {
    community = allCards[key].slice()
    console.log('remaining cards: ', community.length-1)
  }
} 

const rollDice = ()=> {
  const max = 6
  const min = 1
  const rand = Math.floor(Math.random() * (max - min ) + min)

  return rand
} 

// roll dice
$('.diceBtn').click(()=>{
  const d1 = `d${rollDice()}`
  const d2 = `d${rollDice()}`

  // remove all classes
  $('#dice1, #dice2').removeClass()
  // add display and ani
  $('#dice1, #dice2').addClass('dice1 dice display ani')

  setTimeout(() => {
    $('#dice1, #dice2').removeClass('ani')
    $('#dice1').addClass(d1)
    $('#dice2').addClass(d2)
  }, 500);
})

// chance card
$('.chance').click(()=>{
  $('.chance .card-text').text(getCard('chance'))
})

// community card
$('.community').click(()=>{
  $('.community .card-text').text(getCard('community'))
})

//reset cards
$('button.reset.chance').click(()=>{
  resetCards('chance')
  $('.chance .card-text').text('Chance')
})
$('button.reset.community').click(()=>{
  resetCards('community')
  $('.community .card-text').text('Community')
})


module.exports = {
  getCard,
  resetCards,
  rollDice
}