//const test = KEYS
const ipc = require('./ipc/')

let exportData

//ipc.on('cubaseKeys', (data) => {
//    //data type === { path: data.path, fileContent: result }
//    exportData = data.fileContent
//    ipc.send('log', 'exportData1')
//})

//this is logging to the Launcher/Server console
//ipc.send('log', 'cubaseKeys-CLIENT')
//this is logging to the client console ONLY IF you comment out the uiConsole.clear() in src\client\managers\session\index.js
//console.log('cubaseKeys-CLIENT')
//const example = {
//    Categories: [
//        {
//            Name: 'AddTrack',
//            Commands: [
//                {
//                    Name: 'Arranger',
//                    Key: ''
//                }
//            ]
//        },
//        {
//            Name: 'Audio',
//            Commands: [
//                {
//                    Name: 'Adjust Fades to Range',
//                    Key: 'A'
//                }
//            ]
//        },
//        {
//            Name: 'Macro',
//            Commands: [
//                {
//                    Name: 'Duplicate Selected Tracks without Data',
//                    Key: ''
//                }
//            ]
//        }
//    ],
//    Macros: [
//        {
//            Name: 'Duplicate Selected Tracks without Data',
//            Subcommands: [
//                {
//                    Category: 'Project',
//                    Name: 'Duplicate Tracks'
//                },
//                {
//                    Category: 'Automation',
//                    Name: 'Delete Automation of Selected Tracks'
//                },
//                {
//                    Category: 'TrackVersions',
//                    Name: 'Delete Inactive Versions of Selected Tracks'
//                },
//                {
//                    Category: 'Edit',
//                    Name: 'Select All on Tracks'
//                },
//                {
//                    Category: 'Edit',
//                    Name: 'Delete'
//                }
//            ]
//        }
//    ]
//}

const parsedToArray = (parsed) => {
    if (exportData === undefined) {
        return ['No Data 2']
    }

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
    keyCommands: function (parsed) {
        parsedToArray(parsed)
    }
}
