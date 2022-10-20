# Squizzle Legion
A series of bots that can be configured to manage multiple channels.

## Animal Crossing 

`!startvillagerhunt` will start the hunt, basically reset the list of villagers found

`!showvillagers` will show all the villagers founds so far using the message "So far we found the following villagers:"

`!addvillager <villagername>` will add a villager to the list of villagers found. For example, you can do `!addvillager Hornsby`

`!removevillager <villagername>` will remove a villager from the list, in case you have a typo or just added the wrong villager.  For example, you can do `!removevillager Sprocket` this will only remove one instance of that Villager

`!addIsland` increments the number of islands visited and displays the latest count

`!viewIslandCount` displays the number of islands visited

`!setIslandCount <numIslands>` allows you to arbitrarily set the island coun. For example, you can do `!setIslandCount 10`

## Donors

`!adddonor <donorname> <amount>` will add a donor to the list of donors with their donation amount. If they donated before, it will increment their total donations. For example, you can do `!adddonor @squizzeflip`

`!donor <donorname>` will list out a single the donor's total donations using the message "<donor name> has donated $<total donations> so far!`);"

`!donors` will list out all the donors with their total donations using the message "Thank you to our donors! <list of donors>"

`!removedonor <donorname>` will remove a donor from the list. Useful for removing dupes or typos. For example, you can do `!remove @squazzeflop`

## Pokebot
A pokemon shows up every 10 minutes to be caught by the community in the next 60 seconds. There is an 5% chance that any one pokeball will catch the pokemon, so the more people that throw them, the more likely it'll get caught. 

### The math
1 pokeball thrown - 5% catch rate
2 pokeballs thrown - 9.8% catch rate
3 pokeballs thrown - 14.3% catch rate
4 pokeballs thrown - 19.6% catch rate
4 pokeballs thrown - 23.4% catch rate

### Mod only commands
`!pokebot_on` turn pokebot. Pokemon will start showing up every 10 minutes

`!pokebot_off` deactivate pokebot. Pokemon will start showing up every 10 minutes

`!encounter` manually start a pokemon encounter. If one is already in progress, the bot will tell you one has already started

### Community Commands
`!pokeball` throws a pokeball when a encounter is progress. If no encounter is progress, it let's the user know. It also let's the user know if they already threw one

`!pokedex` lists all the pokemon we have already caught

