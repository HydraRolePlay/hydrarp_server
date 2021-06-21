var dimensions = {};
for(let i=1; i<1000; i++){
	dimensions[i] = []
}

mp.events.add({
	"anotherDimension": (player, id) =>
	{
		for(let i=1; i<1000; i++){
			if(dimensions[i].indexOf(id) === -1){
				dimensions[i].push(id);
				player.dimension = i;
				break;
			}
		}
		player.data.anotherDimension = id;
	},
	"gameDimension": (player) => 
	{
		dimensions[player.dimension].splice(dimensions[player.dimension].indexOf(player.data.anotherDimension), 1);
		player.dimension = 0;
	}
});