 //import JNS
 const jwt=require('jsonwebtoken');

 //import db

 const db = require('./db')
 
 //database
 userDetails={
    1000:{acno:1000,username:"amal",password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:"priya",password:1001,balance:1000,transaction:[]},
    1002:{acno:1002,username:"maya",password:1002,balance:1000,transaction:[]},

  }
  const register=(acno,uname,pswd)=>{
    return db.User.findOne({acno})//data

    .then(user=>{
      if(user){
      return {
        status:"false",
        statusCode:400,
        message:'User already registered'
      }
    }
    else{
      const newuser=new db.User({
        acno:acno,
        uname:uname,
        pswd:pswd,
        balance:0,
        transaction:[]
      })
      newuser.save();
      return {
        status:"true",
        statusCode:200,
        message:'register successfull'
      }
      
    }
  })}


  const login=(acno,pswd)=>{
    return db.User.findOne({acno})//data
.then(user=>{   
  if(user){   
       currentuser=user.uname
       currentAcno=acno
       const token =jwt.sign({currentAcno:acno},'superkey2022')

        return {
          status:"true",
          statusCode:200,
          message:'login successfull',
          token:token,
          currentuser:currentuser,
          currentAcno:acno
        }
      }
      
    
    else{
      return {
        status:"false",
        statusCode:400,
        message:'invalid details'
      }
    }
  })}


  const deposit=(acno,pswd,amt)=>{
    var amount=parseInt(amt)
    return db.User.findOne({acno,pswd})//data
    .then(user=>{
      if(user){
        user.balance += amount;
        user.transaction.push({
          Type:'credit',
          Amount:amount
        })
        user.save();
        return{
          status:"true",
          statusCode:200,
          message:`${amount} is credited and balance is ${user.balance}`
        }
      }
      else{
        return{
        status:"false",
        statusCode:400,
        message:'userdetails invalid'
        }
      }
    })
  }

  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       userDetails[acno]['balance']+=amount;
  //       userDetails[acno]['transaction'].push({
  //         Type:'Credit',
  //         Amount:amount
  //       })
  //       return{
          
  //           status:"true",
  //           statusCode:200,
  //           message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`
          

  //       }
  //       // console.log(userDetails);
        
  //       // return userDetails[acno]['balance']
      
  //     }
  //     else{
  //       // alert('password mismatch')
  //       return {
  //         status:"false",
  //         statusCode:400,
  //         message:'incorrect password'
  //       }
  //     }
  //   }
  
  //   else{
  //     // alert('Invalid data')
  //     return {
  //       status:"false",
  //       statusCode:400,
  //       message:'invalid details'
  //     }

  //   }

  // }

 const withdraw=(acno,pswd,amt)=>{
    var amount=parseInt(amt)

    return db.User.findOne({acno,pswd})//data
    .then(user=>{
      if(user){
        if(user.balance>amount){
        user.balance -= amount;
        user.transaction.push({
          Type:'debit',
          Amount:amount
        })
        user.save();
        return{
          status:"true",
          statusCode:200,
          message:`${amount} is credited and balance is ${user.balance}`
        }
      
      
      }
      else{
        return{
          status:"false",
          statusCode:400,
          message:'minimum balance required'
          }
      }
    }
    else{
      return{
        status:"false",
        statusCode:400,
        message:'invalid userdetails'
        }
    }

    })
  }
  

  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       if(userDetails[acno]['balance']>amount){
  //       userDetails[acno]['balance']-=amount;
  //       userDetails[acno]['transaction'].push({
  //         Type:'debit',
  //         Amount:amount
  //       })
  //       return {
          
  //         status:"true",
  //         statusCode:200,
  //         message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`
        

  //     }

    
        
  //       // return userDetails[acno]['balance']
  //     }
  //     else{
  //       return{
  //         status:"false",
  //         statusCode:400,
  //         message:'transaction failed'
  //       }

  //     }
  //   }
  //     else{
  //       // alert('password mismatch')
  //       return {
  //         status:"false",
  //         statusCode:400,
  //         message:'incorrect password'
  //       }
  //     }
  //   }
  //   else{
  //     // alert('Invalid data')
  //     return {
  //       status:"false",
  //       statusCode:400,
  //       message:'invalid details'
  //     }

  //   }
  

  // }


 const getTransaction=(acno)=>{
  return db.User.findOne({acno})//data
    .then(user=>{
      if(user){

    return{
          
      status:"true",
      statusCode:200,
      Transaction:user.transaction


  }
}
else{
  return{
    status:"false",
    statusCode:400,
    message:'invalid userdetails'
    }
}


  })
}

  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
  }
