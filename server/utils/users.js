

class Users{
    constructor(){
        this.users = [];
    }
    addUser (id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        //return user that was removed
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
          }
      
          return user;
    }
    getUser(id){
       var len = this.users.length;
       for(var i=0;i<len;i+=1){
        if(this.users[i].id === id){
            return this.users[i];
        }
       }
        // return user which was get
    }
    getUserList(room){
        var users = this.users.filter((user)=>{
            return user.room === room;
        })
        
        var nameArray = users.map((user)=>{
           
           return user.name;
        })
       
        return nameArray;
    }
}

// var use = new Users();
// use.addUser(1,"ALpit","Pra");
// use.addUser(2,"ma","Pra");
// use.addUser(3,"ma","Pra2");
// console.log(use.getUserList("Pra"));
// console.log(use.getUser(3));
// console.log(use.removeUser(1));
// console.log(use.getUserList("Pra"));

module.exports = {Users}


// class Person{
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription (){
//         return `${this.name} is a ${this.age} year old`;
//     }
// }
// var me = new Person("Alpit",  22);
// var des = me.getUserDescription();
// console.log(des);
