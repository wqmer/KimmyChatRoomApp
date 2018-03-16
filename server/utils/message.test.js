var expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message') ;
describe('generateMessage', () => {
      it('should generate correct message object', () => {
         var from = 'Kimmy' ;
         var text = 'test123' ;
         var message = generateMessage(from , text) ;

         expect(typeof message.createdAt).toBe('number');
         expect(message).toInclude({from, text});
      });
   });


   describe('generateLocationMessage', () => {
         it('should generate correct location object', () => {
            var from = 'Kimmy' ;
            var latitude = 15 ;
            var longitude = 20 ;
            var url = 'https://www.google.com/maps?q=15,20';
            var message = generateLocationMessage(from , latitude, longitude) ;

            expect(typeof message.createdAt).toBe('number');
            expect(message).toInclude({from, url});
         });
      });
