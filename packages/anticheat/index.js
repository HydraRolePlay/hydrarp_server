mp.events.add('server:CheatDetection', (player,flag) => {
    if(flag=='Unallowed Weapon') {
		player.ban()
    }
    console.log(`Detected ${flag} from ${player.login} SC: ${player.socialClub}`);
	global.discordAPI.cheats(`Detected ${flag} from ${player.login} SC: ${player.socialClub}`);
});

mp.events.add("playerWeaponChange", (player) => {
    player.call('client:weaponSwap')
});