//const test = KEYS
const ipc = require('./ipc/')

ipc.on('cubaseKeys', ipc.send('log', 'cubaseKeys'))

const parsed = {
    Categories: [
        {
            Name: 'AddTrack',
            Commands: [
                {
                    Name: 'Arranger',
                    Key: ''
                }
            ]
        },
        {
            Name: 'Audio',
            Commands: [
                {
                    Name: 'Adjust Fades to Range',
                    Key: 'A'
                }
            ]
        },
        {
            Name: 'Macro',
            Commands: [
                {
                    Name: 'Duplicate Selected Tracks without Data',
                    Key: ''
                }
            ]
        }
    ],
    Macros: [
        {
            Name: 'Duplicate Selected Tracks without Data',
            Subcommands: [
                {
                    Category: 'Project',
                    Name: 'Duplicate Tracks'
                },
                {
                    Category: 'Automation',
                    Name: 'Delete Automation of Selected Tracks'
                },
                {
                    Category: 'TrackVersions',
                    Name: 'Delete Inactive Versions of Selected Tracks'
                },
                {
                    Category: 'Edit',
                    Name: 'Select All on Tracks'
                },
                {
                    Category: 'Edit',
                    Name: 'Delete'
                }
            ]
        }
    ]
}

const parsedToArray = (parsed) => {
    const keyCommands = []

    const macroList = []

    parsed.Macros.forEach((macro) => {
        const name = macro.Name
        const subCount = macro.Subcommands.length

        macroList.push({ Name: name, SubCount: subCount })
    })

    parsed.Categories.forEach((category) => {
        const cat = category.Name

        category.Commands.forEach((command) => {
            const name = command.Name
            const key = command.Key

            if (cat === 'Macro') {
                macroList.forEach((macro) => {
                    if (macro.Name === command.Name) {
                        keyCommands.push(`Macro (${macro.SubCount} steps) - ${macro.Name} ${key && '(' + key + ')'}`)
                    }
                })
            } else {
                keyCommands.push(`${cat} - ${name} ${key && '(' + key + ')'}`)
            }
        })
    })

    return keyCommands
}

module.exports = {
    keyCommands: parsedToArray(parsed)
}
