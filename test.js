var loop = require('./')
var test = require('tape').test

test("loops expected number of times", function(t) {
    var count = 0
    t.plan(3)

    var engine = loop(function(dt) {
        t.equal(typeof dt, 'number', 'iteration')
        count++
        if (count>=3)
            engine.stop()
    }).start()
})

test("can attach tick events", function(t) {
    var count = 0,
        tested = false
    t.plan(6)

    var engine = loop().start()
    engine.on('tick', tick)
    
    function tick(dt) {
        t.equal(typeof dt, 'number', 'iteration')
        count++
        if (count>=3) {
            engine.stop()
            engine.emit('test')
        }
    }

    engine.on('test', function() {
        if (tested) return
        tested = true
        count = 0
        engine.start()
    })
})