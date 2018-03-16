var string = 'this is a string';

//console.log(new Date().getTime()); //ECMAScript 6 feature using ``



var generateLocationMessage = (from ,latitude ,longitude ) => {
 return{
    from,
    latitude,
    longitude
   };
};


console.log(generateLocationMessage('admin', '123' , '456'));
