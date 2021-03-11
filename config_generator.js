"use strict"

const DefaultSettings = {
	windowPos: [0, 0],
	laurel: 'champ',
	scale: 0.75
}

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined) {
		return Object.assign(Object.assign({}, DefaultSettings), settings)
	} else if (from_ver === null) {
		return DefaultSettings
	} else {
		if (from_ver + 1 < to_ver) {
			settings = MigrateSettings(from_ver, from_ver + 1, settings)
			return MigrateSettings(from_ver + 1, to_ver, settings)
		}
		switch (to_ver) {
			default:
				let oldsettings = settings

				settings = Object.assign(DefaultSettings, {})

				for (let option in oldsettings) {
					if (settings[option]) { settings[option] = oldsettings[option] }
				}
				break;
		}

		return settings
	}
}
