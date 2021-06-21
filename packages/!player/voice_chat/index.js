mp.events.add("add_voice_listener", (player, target) =>
{
	if(target)
	{
		player.enableVoiceTo(target);
	}
});

mp.events.add("remove_voice_listener", (player, target) =>
{
	if(target)
	{
		player.disableVoiceTo(target);
	}
});

mp.events.add("playersMuted", (player, allPlayersMuted) =>
{
	player.setVariable('playersMuted', allPlayersMuted);
});