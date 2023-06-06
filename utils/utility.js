const charClass = {
	1: 'Warrior',
	2: 'Paladin',
	3: 'Hunter',
	4: 'Rogue',
	5: 'Priest',
	6: 'Death Knight',
	7: 'Shaman',
	8: 'Mage',
	9: 'Warlock',
	11: 'Druid',
}

const charRace = {
	1: 'Human',
	2: 'Orc',
	3: 'Dwarf',
	4: 'Night Elf',
	5: 'Undead',
	6: 'Tauren',
	7: 'Gnome',
	8: 'Troll',
	10: 'Blood Elf',
	11: 'Draenei',
	horde: [ 2, 5, 6, 8, 10 ],
	alliance: [1, 3, 4, 7, 11]
}

const uptimeCalculation = ( uptime ) => {
	const totalMinutes = Math.floor( uptime / 60 )
	
	const seconds = uptime % 60
	const hours = Math.floor( totalMinutes / 60 )
	const minutes = totalMinutes % 60
	
	return {h: hours, m: minutes, s: seconds}
}

const dateFromTimestamp = ( unixTime ) => {
	const localDate = new Date( unixTime * 1000 ).toLocaleDateString()
	const localTime = new Date(unixTime *1000).toLocaleTimeString()
	return {localDate, localTime}
}

export {
  charClass,
	charRace,
	uptimeCalculation,
	dateFromTimestamp
}