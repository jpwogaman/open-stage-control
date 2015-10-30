
ipc.on('receiveOsc',function(data){
    // fetch id
    var path = data.path
    var id = __widgetsIds__[path]

    // update
    if (__widgets__[id]!=undefined) {
        for (i in __widgets__[id]){
             __widgets__[id][i].setValue(data.args,false,false)
        }
    }

})

ipc.on('load',function(preset){
    setState(preset)
})

var listSessions = false
ipc.on('listSessions',function(data){
    if (listSessions) return false
    $('#lobby').append('\
        <div class="main">\
            <div class="header">\
                Session selection\
            </div>\
            <div class="list"></div>\
        </div>')

    for (i in data) {
        $('#lobby .list').append('<li><a class="btn load" data-session="'+data[i]+'">'+data[i]+'<span>'+icon('remove')+'</span></a></li>')
    }
    $('#lobby .list').append('<a class="btn browse">...</a>')
    $('#lobby .load').click(function(e){
        e.stopPropagation()
        ipc.send('openSession',$(this).data('session'))
    })
    $('#lobby a span').click(function(e){
        e.stopPropagation()
        ipc.send('removeSessionFromHistory',$(this).parent().data('session'))
        $(this).parents('li').hide()
    })
    $('#lobby .browse').click(function(e){
        e.stopPropagation()
        ipc.send('browseSessions')
    })
    listSessions = true
})

var openSession = false
ipc.on('openSession',function(data){
    if (openSession) return  false
    var error = data.error,
        path = data.path,
        session = JSON.parse(data.session)

    if (!error) {
        openSession = true
        ipc.send('addSessionToHistory',path)
        $('#lobby').hide()
        $('#container').append('<div id="loading"><div class="spinner"></div></div>')
        setTimeout(function(){
            init(session,function(){$('#loading').hide()})
        },1)
    } else {
        createPopup(icon('warning')+'&nbsp;Error: invalid session file',error)
    }
})
