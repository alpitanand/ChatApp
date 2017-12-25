var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate the correct message object',()=>{
        var from = 'Alpit';
        var text = 'This is from Alpit'
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    })
})

describe('generateLocationMessage',()=>{
    it('should generate the correct location message object',()=>{
        var from = "Alpit";
        var longitude = 12;
        var latitude = 23;
        var url = 'https://www.google.com/maps?q=12,23'
        var location = generateLocationMessage(from,longitude,latitude);
        expect(location.createdAt).toBeA('number');
        expect(location).toInclude({
            from,
            url
        });
    })
})