const Data = require("./player/char-creator/data.js");
var currentGender = 0,
	fatherItem = [],
	motherItem = [],
	lipstickColorItem = []
	beardColorItem = [],
	eyebrowColorItem = [],
	blushColorItem = [],
	chestHairColorItem = [],
	appearanceOpacityItems = [],
	hairItem = [],
	hairColorItem = [],
	hairHighlightItem = [],
	eyeColorItem = [],
	featureItems = [],
	similarityItem = [],
	skinSimilarityItem = [],
	appearanceItems = [],
	selectedNumber = 0,
	anotherSelectedNumber = 0,
	creatorCamera = '',
	headOutfit = '-',
	bodyOutfit = 0,
	legsOutfit = 0,
	shoesOutfit = 1,
	toros = 0;
	
	
fatherItem.Index = 0;
motherItem.Index = 0;
hairItem.Index = 0;
hairColorItem.Index = 0;
hairHighlightItem.Index = 0;
eyebrowColorItem.Index = 0;
beardColorItem.Index = 0;
eyeColorItem.Index = 0;
blushColorItem.Index = 0;
lipstickColorItem.Index = 0;
chestHairColorItem.Index = 0;

let hairColors = [];
for (let i = 0; i < Data.maxHairColor; i++) hairColors.push(i.toString());

let blushColors = [];
for (let i = 0; i < Data.maxBlushColor; i++) blushColors.push(i.toString());

let lipstickColors = [];
for (let i = 0; i < Data.maxLipstickColor; i++) lipstickColors.push(i.toString());


const creatorCoords = {
    camera: new mp.Vector3(-2041.052490234375 - mp.game.system.sin(69.54029846191406)*2, -1032.380859375 + mp.game.system.cos(69.54029846191406)*2, 11.980711936950684 + 0.5),
    cameraLookAt: new mp.Vector3(-2041.052490234375, -1032.380859375, 11.980711936950684)
};

const localPlayer = mp.players.local;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function colorForOverlayIdx(index) {
    let color;

    switch (index) {
        case 1:
            color = beardColorItem.Index;
        break;

        case 2:
            color = eyebrowColorItem.Index;
        break;

        case 5:
            color = blushColorItem.Index;
        break;

        case 8:
            color = lipstickColorItem.Index;
        break;

        case 10:
            color = chestHairColorItem.Index;
        break;

        default:
            color = 0;
    }

    return color;
}

function updateParents() {
    localPlayer.setHeadBlendData(
        // shape
        Data.mothers[motherItem.Index],
        Data.fathers[fatherItem.Index],
        0,

        // skin
        Data.mothers[motherItem.Index],
        Data.fathers[fatherItem.Index],
        0,

        // mixes
        similarityItem.Index * 0.01,
        skinSimilarityItem.Index * 0.01,
        0.0,

        false
    );
}
function resetParentsMenu() {
    fatherItem.Index = 0;
    motherItem.Index = 0;
    similarityItem.Index = 50;
    skinSimilarityItem.Index = 50;

    updateParents();
}

function resetFeaturesMenu() {
    for (let i = 0; i < Data.featureNames.length; i++) {
		featureItems.push([]);
        featureItems[i].Index = 0;
        updateFaceFeature(i);
    }
}

function resetAppearanceMenu() {
    for (let i = 0; i < Data.appearanceNames.length; i++) {
		appearanceItems.push([]);
		appearanceOpacityItems.push([]);
        appearanceItems[i].Index = 0;
        appearanceOpacityItems[i].Index = 100;
        updateAppearance(i);
    }
}

function resetHairAndColorsMenu() {
    hairItem.Index = 0;
    hairColorItem.Index = 0;
    hairHighlightItem.Index = 0;
    eyebrowColorItem.Index = 0;
    beardColorItem.Index = 0;
    eyeColorItem.Index = 0;
    blushColorItem.Index = 0;
    lipstickColorItem.Index = 0;
    chestHairColorItem.Index = 0;
    updateHairAndColors();
}

function updateFaceFeature(index) {
	localPlayer.setFaceFeature(index, parseFloat(featureItems[index].Index));
}

function updateAppearance(index) {
    let overlayID = (appearanceItems[index].Index == 0) ? 255 : appearanceItems[index].Index - 1;
    localPlayer.setHeadOverlay(index, overlayID, appearanceOpacityItems[index].Index * 0.01, colorForOverlayIdx(index), 0);
}

function updateHairAndColors() {
    localPlayer.setComponentVariation(2, Data.hairList[currentGender][hairItem.Index].ID, 0, 2);
    localPlayer.setHairColor(hairColorItem.Index, hairHighlightItem.Index);
    localPlayer.setEyeColor(eyeColorItem.Index);
    localPlayer.setHeadOverlayColor(1, 1, beardColorItem.Index, 0);
    localPlayer.setHeadOverlayColor(2, 1, eyebrowColorItem.Index, 0);
    localPlayer.setHeadOverlayColor(5, 2, blushColorItem.Index, 0);
    localPlayer.setHeadOverlayColor(8, 2, lipstickColorItem.Index, 0);
    localPlayer.setHeadOverlayColor(10, 1, chestHairColorItem.Index, 0);
}

function applyCreatorOutfit() {
    if (currentGender == 0) {
        localPlayer.setDefaultComponentVariation();
        localPlayer.setComponentVariation(3, 15, 0, 2);
        localPlayer.setComponentVariation(4, 21, 0, 2);
        localPlayer.setComponentVariation(6, 34, 0, 2);
        localPlayer.setComponentVariation(8, 15, 0, 2);
		localPlayer.setComponentVariation(11, 15, 0, 2);
    } else {
        localPlayer.setDefaultComponentVariation();
        localPlayer.setComponentVariation(3, 15, 0, 2);
        localPlayer.setComponentVariation(4, 10, 0, 2);
        localPlayer.setComponentVariation(6, 35, 0, 2);
        localPlayer.setComponentVariation(8, 15, 0, 2);
		localPlayer.setComponentVariation(11, 15, 0, 2);
    }
	localPlayer.clearAllProps();
	localPlayer.setComponentVariation(2, Data.hairList[currentGender][hairItem.Index].ID, 0, 2);
}

function selectNewStartOutfit(id, value){
	if(id.split('-').length !== 2) {
		localPlayer.setComponentVariation(3, toros, 0, 2);
		if(headOutfit !== '-') localPlayer.setPropIndex(0, headOutfit, 0, true);
		localPlayer.setComponentVariation(11, bodyOutfit, 0, 2);
		localPlayer.setComponentVariation(4, legsOutfit, 0, 2);
		localPlayer.setComponentVariation(6, shoesOutfit, 0, 2); 
		return;
	}
	mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	if (currentGender == 0) {
		if(parseInt(id.split('-')[0]) == 32) {
			let newVal = Object.keys(Data.manOutfit[0]).find(key => Data.manOutfit[0][key] === headOutfit),
				smth = Object.keys(Data.manOutfit[0]).indexOf(newVal);
			if(parseInt(id.split('-')[1]) == 1){
				if(!smth) smth = Object.keys(Data.manOutfit[0]).length;
				smth -= 1;
				newVal = Object.keys(Data.manOutfit[0])[smth];
				headOutfit = Data.manOutfit[0][newVal];
			} else {
				if((smth + 1) == Object.keys(Data.manOutfit[0]).length) smth = -1;
				smth += 1;
				newVal = Object.keys(Data.manOutfit[0])[smth];
				headOutfit = Data.manOutfit[0][newVal];
			}
			if(headOutfit === '-') {
				localPlayer.clearAllProps();
			} else {
				localPlayer.setPropIndex(0, headOutfit, 0, true);
			}
			global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${newVal}')`);
		} else if(parseInt(id.split('-')[0]) == 33) {
			let newVal = Object.keys(Data.manOutfit[3]).find(key => Data.manOutfit[3][key] === bodyOutfit),
				smth = Object.keys(Data.manOutfit[3]).indexOf(newVal);
			if(parseInt(id.split('-')[1]) == 1){
				if(!smth) smth = Object.keys(Data.manOutfit[3]).length;
				smth -= 1;
				newVal = Object.keys(Data.manOutfit[3])[smth];
				bodyOutfit = Data.manOutfit[3][newVal];
			} else {
				if((smth + 1) == Object.keys(Data.manOutfit[3]).length) smth = -1;
				smth += 1;
				newVal = Object.keys(Data.manOutfit[3])[smth];
				bodyOutfit = Data.manOutfit[3][newVal];
			}
			global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${newVal}')`);
			if(!bodyOutfit || bodyOutfit == 16) {
				localPlayer.setComponentVariation(3, 0, 0, 2);
				toros = 0;
			} else {
				localPlayer.setComponentVariation(3, 5, 0, 2);
				toros = 5;
			}
			localPlayer.setComponentVariation(11, bodyOutfit, 0, 2);
			
		} else if(parseInt(id.split('-')[0]) == 34) {
			let newVal = Object.keys(Data.manOutfit[1]).find(key => Data.manOutfit[1][key] === legsOutfit),
				smth = Object.keys(Data.manOutfit[1]).indexOf(newVal);
			if(parseInt(id.split('-')[1]) == 1){
				if(!smth) smth = Object.keys(Data.manOutfit[1]).length;
				smth -= 1;
				newVal = Object.keys(Data.manOutfit[1])[smth];
				legsOutfit = Data.manOutfit[1][newVal];
			} else {
				if((smth + 1) == Object.keys(Data.manOutfit[1]).length) smth = -1;
				smth += 1;
				newVal = Object.keys(Data.manOutfit[1])[smth];
				legsOutfit = Data.manOutfit[1][newVal];
			}
			global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${newVal}')`);
			localPlayer.setComponentVariation(4, legsOutfit, 0, 2);
			
		} else {
			let newVal = Object.keys(Data.manOutfit[2]).find(key => Data.manOutfit[2][key] === shoesOutfit),
				smth = Object.keys(Data.manOutfit[2]).indexOf(newVal);
			if(parseInt(id.split('-')[1]) == 1){
				if(!smth) smth = Object.keys(Data.manOutfit[2]).length;
				smth -= 1;
				newVal = Object.keys(Data.manOutfit[2])[smth];
				shoesOutfit = Data.manOutfit[2][newVal];
			} else {
				if((smth + 1) == Object.keys(Data.manOutfit[2]).length) smth = -1;
				smth += 1;
				newVal = Object.keys(Data.manOutfit[2])[smth];
				shoesOutfit = Data.manOutfit[2][newVal];
			}
			global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${newVal}')`);
			localPlayer.setComponentVariation(6, shoesOutfit, 0, 2);
		}
    } else {
        if(parseInt(id.split('-')[0]) == 32) {
			let newVal = Object.keys(Data.womanOutfit[0]).find(key => Data.womanOutfit[0][key] === headOutfit),
				smth = Object.keys(Data.womanOutfit[0]).indexOf(newVal);
			if(parseInt(id.split('-')[1]) == 1){
				if(!smth) smth = Object.keys(Data.womanOutfit[0]).length;
				smth -= 1;
				newVal = Object.keys(Data.womanOutfit[0])[smth];
				headOutfit = Data.womanOutfit[0][newVal];
			} else {
				if((smth + 1) == Object.keys(Data.womanOutfit[0]).length) smth = -1;
				smth += 1;
				newVal = Object.keys(Data.womanOutfit[0])[smth];
				headOutfit = Data.womanOutfit[0][newVal];
			}
			if(headOutfit === '-') {
				localPlayer.clearAllProps();
			} else {
				localPlayer.setPropIndex(0, headOutfit, 0, true);
			}
			global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${newVal}')`);
			
		} else if(parseInt(id.split('-')[0]) == 33) {
			let newVal = Object.keys(Data.womanOutfit[3]).find(key => Data.womanOutfit[3][key] === bodyOutfit),
				smth = Object.keys(Data.womanOutfit[3]).indexOf(newVal);
			if(parseInt(id.split('-')[1]) == 1){
				if(!smth) smth = Object.keys(Data.womanOutfit[3]).length;
				smth -= 1;
				newVal = Object.keys(Data.womanOutfit[3])[smth];
				bodyOutfit = Data.womanOutfit[3][newVal];
			} else {
				if((smth + 1) == Object.keys(Data.womanOutfit[3]).length) smth = -1;
				smth += 1;
				newVal = Object.keys(Data.womanOutfit[3])[smth];
				bodyOutfit = Data.womanOutfit[3][newVal];
			}
			if(bodyOutfit == 2){
				toros = 2;
			}else{
				toros = 4;
			}
			localPlayer.setComponentVariation(3, toros, 0, 2);
			global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${newVal}')`);
			localPlayer.setComponentVariation(11, bodyOutfit, 0, 2);
			
		} else if(parseInt(id.split('-')[0]) == 34) {
			let newVal = Object.keys(Data.womanOutfit[1]).find(key => Data.womanOutfit[1][key] === legsOutfit),
				smth = Object.keys(Data.womanOutfit[1]).indexOf(newVal);
			if(parseInt(id.split('-')[1]) == 1){
				if(!smth) smth = Object.keys(Data.womanOutfit[1]).length;
				smth -= 1;
				newVal = Object.keys(Data.womanOutfit[1])[smth];
				legsOutfit = Data.womanOutfit[1][newVal];
			} else {
				if((smth + 1) == Object.keys(Data.womanOutfit[1]).length) smth = -1;
				smth += 1;
				newVal = Object.keys(Data.womanOutfit[1])[smth];
				legsOutfit = Data.womanOutfit[1][newVal];
			}
			global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${newVal}')`);
			localPlayer.setComponentVariation(4, legsOutfit, 0, 2);
			
		} else {
			let newVal = Object.keys(Data.womanOutfit[2]).find(key => Data.womanOutfit[2][key] === shoesOutfit),
				smth = Object.keys(Data.womanOutfit[2]).indexOf(newVal);
			if(parseInt(id.split('-')[1]) == 1){
				if(!smth) smth = Object.keys(Data.womanOutfit[2]).length;
				smth -= 1;
				newVal = Object.keys(Data.womanOutfit[2])[smth];
				shoesOutfit = Data.womanOutfit[2][newVal];
			} else {
				if((smth + 1) == Object.keys(Data.womanOutfit[2]).length) smth = -1;
				smth += 1;
				newVal = Object.keys(Data.womanOutfit[2])[smth];
				shoesOutfit = Data.womanOutfit[2][newVal];
			}
			global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${newVal}')`);
			localPlayer.setComponentVariation(6, shoesOutfit, 0, 2);
		}
    }
}

var PlayerAppearents = {
	'1': 0,
	'2': 1,
	'3': 2,
	'4': 3,
	'5': 4,
	'6': 5,
	'7': 6,
	'8': 7,
	'9': 8,
	'10': 9,
	'11': 10,
	'12': 11,
	'13': 12,
	'14': 13,
	'15': 14,
	'16': 15,
	'17': 17,
	'18': 16,
	'19': 18,
	'20': 19,
	'21': 0,
	'22': 0,
	'23': 1,
	'24': 2,
	'25': 3,
	'26': 4,
	'27': 5,
	'28': 6,
	'29': 9,
	'30': 8,
	'31': 10
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

mp.events.add('checkName', (name) => {
	mp.events.callRemote('checkName', name);
});

mp.events.add('badName', () => {
	global.createNewPerson.browser.execute(`$('.anotherText').html('Имя или фамилия уже используется');`);
});

mp.events.add('goodName', () => {
	global.createNewPerson.browser.execute(`$('.modal').addClass('active');`);
});


mp.events.add('randomPers', () => {
	let newGender = getRandomInt(2)
	mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	if(currentGender !== newGender){
		mp.events.call('sexOption', newGender);
		if(newGender) global.createNewPerson.browser.execute(`$('#male_radio').attr('checked', false); $('#female_radio').attr('checked', true);`);
		if(!newGender) global.createNewPerson.browser.execute(`$('#female_radio').attr('checked', false); $('#male_radio').attr('checked', true);`);
	}
	fatherItem.Index = getRandomInt(Data.fatherNames.length);
	global.createNewPerson.browser.execute(`$('.prev-button#36-1 ~ p, .next-button#36-2 ~ p').text('${Data.fatherNames[fatherItem.Index]}')`);
	motherItem.Index = getRandomInt(Data.motherNames.length);
	global.createNewPerson.browser.execute(`$('.prev-button#37-1 ~ p, .next-button#37-2 ~ p').text('${Data.motherNames[motherItem.Index]}')`);
	similarityItem.Index = getRandomInt(101);
	skinSimilarityItem.Index = getRandomInt(101);
	global.createNewPerson.browser.execute(`$('input[list="pedigree-datalist"]').val(${similarityItem.Index}); $('input[list="skintone-datalist"]').val(${skinSimilarityItem.Index});`);
	updateParents()
	for(let i = 1; i <= 20; i++){
		let variable = getRandomInt(4);
		let nameOfAppearence = Object.keys(Data.characteristics)[i - 1];
		global.createNewPerson.browser.execute(`$('.prev-button#${i}-1 ~ p, .next-button#${i}-2 ~ p').text('${Object.keys(Data.characteristics[nameOfAppearence])[variable]}')`);
		featureItems[i - 1].Index = Data.characteristics[nameOfAppearence][Object.keys(Data.characteristics[nameOfAppearence])[variable]];
        updateFaceFeature(i - 1);
	}
	for(let i = 22; i <= 31; i++){
		let newId = PlayerAppearents[i];
		let variable = getRandomInt(Data.appearanceItemNames[newId].length);
		let needToSet = Data.appearanceItemNames[newId][variable];
		global.createNewPerson.browser.execute(`$('.prev-button#${i}-1 ~ p, .next-button#${i}-2 ~ p').text('${needToSet}')`);
		appearanceItems[newId].Index = variable
		appearanceOpacityItems[newId].Index = getRandomInt(101);
		updateAppearance(newId);
	}

	let testIndex = getRandomInt(Data.hairList[currentGender].length);
	let needToSet = Data.hairList[currentGender][testIndex].Name;
	global.createNewPerson.browser.execute(`$('.prev-button#21-1 ~ p, .next-button#21-2 ~ p').text('${needToSet}')`);
	let values = [1, 2, 3, 4, 57, 5, 7, 8, 9, 17, 16, 11, 12, 13, 10, 4, 6, 19, 18, 24, 22, 27, 29];
	hairItem.Index = testIndex;
	hairColorItem.Index = values[getRandomInt(values.length)];
    hairHighlightItem.Index = values[getRandomInt(values.length)];
	beardColorItem.Index = values[getRandomInt(values.length)];
	eyebrowColorItem.Index = values[getRandomInt(values.length)];
	blushColorItem.Index = values[getRandomInt(values.length)];
	lipstickColorItem.Index = values[getRandomInt(values.length)];
	chestHairColorItem.Index = values[getRandomInt(values.length)];
	updateHairAndColors();
	
	
	let testValue = [Data.manOutfit, Data.womanOutfit][currentGender];
	let newVal;
	newVal = Object.keys(testValue[0])[getRandomInt(Object.keys(testValue[0]).length)]
	headOutfit = testValue[0][newVal];
	global.createNewPerson.browser.execute(`$('.prev-button#32-1 ~ p, .next-button#32-2 ~ p').text('${newVal}')`);
	newVal = Object.keys(testValue[3])[getRandomInt(Object.keys(testValue[3]).length)]
	bodyOutfit = testValue[3][newVal];
	global.createNewPerson.browser.execute(`$('.prev-button#33-1 ~ p, .next-button#33-2 ~ p').text('${newVal}')`);
	newVal = Object.keys(testValue[1])[getRandomInt(Object.keys(testValue[1]).length)]
	legsOutfit = testValue[1][newVal];
	global.createNewPerson.browser.execute(`$('.prev-button#34-1 ~ p, .next-button#34-2 ~ p').text('${newVal}')`);
	newVal = Object.keys(testValue[2])[getRandomInt(Object.keys(testValue[2]).length)]
	shoesOutfit = testValue[2][newVal];
	global.createNewPerson.browser.execute(`$('.prev-button#35-1 ~ p, .next-button#35-2 ~ p').text('${newVal}')`);
	if(!currentGender){
		if(!bodyOutfit || bodyOutfit == 16) {
			toros = 0;
		} else {
			toros = 5;
		}
	} else {
		if(bodyOutfit == 2){
			toros = 2;
		} else {
			toros = 4;
		}
	}
	applyCreatorOutfit();
});

mp.events.add("sexOption", (SexOption) => {
	mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	currentGender = SexOption;
	headOutfit = '-';
	bodyOutfit = 0;
	legsOutfit = 0;
	shoesOutfit = 1;
	if(currentGender) toros = 4;
	if(!currentGender) toros = 0;
	let testValue = [Data.manOutfit, Data.womanOutfit][currentGender];
	let newVal = Object.keys(testValue[0]).find(key => testValue[0][key] === headOutfit),
		smth = Object.keys(testValue[0]).indexOf(newVal);
	newVal = Object.keys(testValue[0])[smth];
	global.createNewPerson.browser.execute(`$('.prev-button#32-1 ~ p, .next-button#32-2 ~ p').text('${newVal}')`);
	newVal = Object.keys(testValue[3]).find(key => testValue[3][key] === bodyOutfit);
	smth = Object.keys(testValue[3]).indexOf(newVal);
	newVal = Object.keys(testValue[3])[smth];
	global.createNewPerson.browser.execute(`$('.prev-button#33-1 ~ p, .next-button#33-2 ~ p').text('${newVal}')`);
	newVal = Object.keys(testValue[1]).find(key => testValue[1][key] === legsOutfit);
	smth = Object.keys(testValue[1]).indexOf(newVal);
	newVal = Object.keys(testValue[1])[smth];
	global.createNewPerson.browser.execute(`$('.prev-button#34-1 ~ p, .next-button#34-2 ~ p').text('${newVal}')`);
	newVal = Object.keys(testValue[2]).find(key => testValue[2][key] === shoesOutfit);
	smth = Object.keys(testValue[2]).indexOf(newVal);
	newVal = Object.keys(testValue[2])[smth];
	global.createNewPerson.browser.execute(`$('.prev-button#35-1 ~ p, .next-button#35-2 ~ p').text('${newVal}')`);
	mp.events.callRemote("updateSexOption", SexOption);
	setTimeout(function() {
		// features
		for (let i = 0; i < featureItems.length; i++) {
			updateFaceFeature(i);
		}
		updateHairAndColors();

		// appearance
		for (let i = 0; i < appearanceItems.length; i++) {
			updateAppearance(i);
		}
		updateParents();
		applyCreatorOutfit();
	}, 300)
});

mp.events.add("setOptionMenu", (selectedNum) => {
	mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	selectedNumber = parseInt(selectedNum) - 21;
	anotherSelectedNumber = PlayerAppearents[selectedNum];
	selectedNum = PlayerAppearents[selectedNum];
	if([2, 3, 9, 10].indexOf(selectedNumber) == -1) {global.createNewPerson.browser.execute("showColors.show=0"); global.createNewPerson.browser.execute("showHair.show=0");} else {
		global.createNewPerson.browser.execute("showColors.show=1");
		global.createNewPerson.browser.execute("showHair.show=0");
		let abcde = [hairColorItem.Index, 0, beardColorItem.Index, eyebrowColorItem.Index, 0, blushColorItem.Index, 0, 0, 0, lipstickColorItem.Index, chestHairColorItem.Index]
		global.createNewPerson.browser.execute(`$("input[name='color'][class='${abcde[selectedNumber]}']").prop('checked', true)`);
	}
	if(selectedNumber > 0){
		global.createNewPerson.browser.execute("showHair.show=0");
		global.createNewPerson.browser.execute(`$('input[list="color-datalist"]').val(${appearanceOpacityItems[selectedNum].Index})`);
	} 
	if(!selectedNumber) {
		global.createNewPerson.browser.execute("showHair.show=1");
		let abcde = [hairColorItem.Index, 0, beardColorItem.Index, eyebrowColorItem.Index, 0, blushColorItem.Index, 0, 0, 0, lipstickColorItem.Index, chestHairColorItem.Index]
		global.createNewPerson.browser.execute(`$("input[name='color'][class='${abcde[selectedNumber]}']").prop('checked', true)`);
		global.createNewPerson.browser.execute("showColors.show=1");
	}
});

mp.events.add("colorOption", (valColor) => {
	mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	if(selectedNumber == 0) {
		hairColorItem.Index = valColor;
        hairHighlightItem.Index = valColor;
	}
	if(selectedNumber == 2) beardColorItem.Index = valColor;
	if(selectedNumber == 3) eyebrowColorItem.Index = valColor;
	if(selectedNumber == 6) blushColorItem.Index = valColor;
	if(selectedNumber == 9) lipstickColorItem.Index = valColor;
	if(selectedNumber == 10) chestHairColorItem.Index = valColor;
	updateHairAndColors();
});

mp.events.add("rangeOption", (rangeId, rangeValue) => {
	mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	if(rangeId == 'last'){
		appearanceOpacityItems[anotherSelectedNumber].Index = parseInt(rangeValue);
		updateAppearance(anotherSelectedNumber);
	}
	if(rangeId == 'm&f'){
		similarityItem.Index = parseInt(rangeValue);
		updateParents()
	}
	if(rangeId == 'skinColor'){
		skinSimilarityItem.Index = parseInt(rangeValue);
		updateParents()
	}
});

mp.events.add("TurnRightPlayer", () => {
	mp.events.callRemote("TurnRightPlayer");
});

mp.events.add("TurnLeftPlayer", () => {
	mp.events.callRemote("TurnLeftPlayer");
});

mp.events.add("newOption", (id, nameOfAppearence, valueOfAppearence) => {
	mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	if(parseInt(id.split('-')[0]) > 31 && parseInt(id.split('-')[0]) < 36) {
		selectNewStartOutfit(id, valueOfAppearence);
		return;
	}
	let newId = PlayerAppearents[id.split('-')[0]]
	if (typeof Data.characteristics[nameOfAppearence] !== "undefined" && parseInt(id.split('-')[0]) < 21) {
		let selectedValue = valueOfAppearence,
			testIndex = Object.keys(Data.characteristics[nameOfAppearence]).indexOf(valueOfAppearence),
			needToSet = 0;
		if(id.split('-')[1] == 2){
			if(testIndex == 4) testIndex = -1;
			testIndex += 1;
			selectedValue = Object.keys(Data.characteristics[nameOfAppearence])[testIndex];
			needToSet = Data.characteristics[nameOfAppearence][selectedValue];
		} else {
			if(testIndex == 0) testIndex = 5;
			testIndex -= 1;
			selectedValue = Object.keys(Data.characteristics[nameOfAppearence])[testIndex];
			needToSet = Data.characteristics[nameOfAppearence][selectedValue];
		}
		global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${selectedValue}')`);
		featureItems[newId].Index = needToSet;
        updateFaceFeature(newId);
	} else {
		if(parseInt(id.split('-')[0]) == 36 || parseInt(id.split('-')[0]) == 37){
			if(id.split('-')[0] == 36){
				let selectedValue = valueOfAppearence,
					testIndex = Data.fatherNames.indexOf(valueOfAppearence),
					needToSet = 0;
				if(id.split('-')[1] == 2){
					if(testIndex == (Data.fatherNames.length - 1)) testIndex = -1;
					testIndex += 1;
					selectedValue = Data.fatherNames[testIndex];
				} else {
					if(testIndex == 0) testIndex = Data.fatherNames.length;
					testIndex -= 1;
					selectedValue = Data.fatherNames[testIndex];
				}
				global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${selectedValue}')`);
				fatherItem.Index = testIndex;
				updateParents();
			} else {
				let selectedValue = valueOfAppearence,
					testIndex = Data.motherNames.indexOf(valueOfAppearence),
					needToSet = 0;
				if(id.split('-')[1] == 2){
					if(testIndex == (Data.motherNames.length - 1)) testIndex = -1;
					testIndex += 1;
					selectedValue = Data.motherNames[testIndex];
				} else {
					if(testIndex == 0) testIndex = Data.motherNames.length;
					testIndex -= 1;
					selectedValue = Data.motherNames[testIndex];
				}
				global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${selectedValue}')`);
				motherItem.Index = testIndex;
				updateParents();
			}
		} else {
			if(parseInt(id.split('-')[0]) !== 21){
				let testIndex = Data.appearanceItemNames[newId].indexOf(valueOfAppearence),
					needToSet = 0;
				if(id.split('-')[1] == 2){
					if(testIndex == (Data.appearanceItemNames[newId].length - 1)) testIndex = -1;
					testIndex += 1;
					needToSet = Data.appearanceItemNames[newId][testIndex];
				} else {
					if(testIndex == 0) testIndex = Data.appearanceItemNames[newId].length;
					testIndex -= 1;
					needToSet = Data.appearanceItemNames[newId][testIndex]; ///
				}
				global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${needToSet}')`);
				appearanceItems[newId].Index = testIndex
				updateAppearance(newId);
			} else {
				let testIndex = hairItem.Index;
				if(id.split('-')[1] == 2){
					if(testIndex == (Data.hairList[currentGender].length - 1)) testIndex = -1;
					testIndex += 1;
					needToSet = Data.hairList[currentGender][testIndex].Name;
				} else {
					if(testIndex == 0) testIndex = Data.hairList[currentGender].length;
					testIndex -= 1;
					needToSet = Data.hairList[currentGender][testIndex].Name;
				}
				global.createNewPerson.browser.execute(`$('.prev-button#${id.split('-')[0]}-1 ~ p, .next-button#${id.split('-')[0]}-2 ~ p').text('${needToSet}')`);
				hairItem.Index = testIndex;
				updateHairAndColors();
			}
		}
	}
});


mp.events.add("createNewPerson", () => {
	mp.game.audio.playSoundFrontend(-1,  "FocusIn", "HintCamSounds", false);
	creatorCamera = mp.cameras.new("creatorCamera", creatorCoords.camera, new mp.Vector3(0, 0, 0), 45);
	creatorCamera.pointAtCoord(creatorCoords.cameraLookAt.x, creatorCoords.cameraLookAt.y, creatorCoords.cameraLookAt.z + 0.5);	
	localPlayer.setDefaultComponentVariation();
	applyCreatorOutfit()
	resetParentsMenu()
	resetFeaturesMenu()
	resetAppearanceMenu()
	resetHairAndColorsMenu()
	creatorCamera.setActive(true);
	mp.gui.cursor.show(true, true);
	global.createNewPerson = [];
	global.createNewPerson.browser = [];
	global.createNewPerson.browser.execute = function (val) {global.mainBrowser.call('sendInfoToWindow', 'container-create-new-model', val)}; 
	global.mainBrowser.execute('all_windows["container-create-new-model"] = true;updateWindows();');
	global.chat.show = false;
	global.chat.browser.execute(`setState(${global.chat.show ? 'transparent': 'hidden'})`);
	mp.game.ui.displayRadar(false);
	mp.game.ui.displayHud(false);
	localPlayer.clearTasksImmediately();
	localPlayer.freezePosition(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.events.add("setClothesCam", (val) =>{
	if(val){
		selectNewStartOutfit('0', 0);
		creatorCamera.setParams(-2041.052490234375 - mp.game.system.sin(69.54029846191406)*2.7, -1032.380859375 + mp.game.system.cos(69.54029846191406)*2.7, 11.980711936950684, 0, 0, 0, 60, 1000, 1, 1, 2); 
		creatorCamera.pointAtCoord(creatorCoords.cameraLookAt.x, creatorCoords.cameraLookAt.y, creatorCoords.cameraLookAt.z);	
	} else {
		applyCreatorOutfit();
		creatorCamera.setParams(-2041.052490234375 - mp.game.system.sin(69.54029846191406)*2, -1032.380859375 + mp.game.system.cos(69.54029846191406)*2, 11.980711936950684 + 0.5, 0, 0, 0, 45, 1000, 1, 1, 2); 
		creatorCamera.pointAtCoord(creatorCoords.cameraLookAt.x, creatorCoords.cameraLookAt.y, creatorCoords.cameraLookAt.z + 0.5);	
	}
});
	
mp.events.add("createPers", (nickName) => {
	mp.game.audio.playSoundFrontend(-1,  "FocusIn", "HintCamSounds", false);
	global.mainBrowser.execute('all_windows["container-create-new-model"] = false;updateWindows();');
	mp.gui.cursor.show(false, false);
	mp.game.ui.displayRadar(true);
	mp.game.ui.displayHud(true);
	localPlayer.freezePosition(false);
	localPlayer.setDefaultComponentVariation();
	localPlayer.setComponentVariation(2, Data.hairList[currentGender][hairItem.Index].ID, 0, 2);
	mp.game.cam.renderScriptCams(false, false, 0, true, false);
	let parentData = {
		Father: Data.fathers[fatherItem.Index],
		Mother: Data.mothers[motherItem.Index],
		Similarity: similarityItem.Index * 0.01,
		SkinSimilarity: skinSimilarityItem.Index * 0.01
	};

	let featureData = [];
	for (let i = 0; i < featureItems.length; i++) featureData.push(parseFloat(featureItems[i].Index));

	let appearanceData = [];
	for (let i = 0; i < appearanceItems.length; i++) appearanceData.push({Value: ((appearanceItems[i].Index == 0) ? 255 : appearanceItems[i].Index - 1), Opacity: appearanceOpacityItems[i].Index * 0.01});

	let hairAndColors = [
		Data.hairList[currentGender][hairItem.Index].ID,
		hairColorItem.Index,
		hairHighlightItem.Index,
		eyebrowColorItem.Index,
		beardColorItem.Index,
		eyeColorItem.Index,
		blushColorItem.Index,
		lipstickColorItem.Index,
		chestHairColorItem.Index
	];
	let clothes = [
		headOutfit,
		bodyOutfit,
		legsOutfit,
		shoesOutfit]
	mp.events.callRemote("insertIntoDb", nickName);
	mp.events.callRemote("creator_Save", currentGender, JSON.stringify(parentData), JSON.stringify(featureData), JSON.stringify(appearanceData), JSON.stringify(hairAndColors), JSON.stringify(clothes), nickName);
});