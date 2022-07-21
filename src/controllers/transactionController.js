const axios=require('axios');
const transactionModel = require("../models/transactionModel");
const currencyModel=require("../models/curerencyModel")

//
const transcation=async(req,res)=>{
    try {
        let options = {
            method: 'get',
            url: `https://api.etherscan.io/api?module=account&action=balance&address=${req.params.address}&tag=latest&apikey=4IZZ6QQHP2MFS7V8JVY4PC2JW8KCG5W2XU`
        }
        let result = await axios(options);
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

//
const registerAddress=async(req,res)=>{
    try{
        if(!req.body.address || !req.body.transaction)
        return res.status(400).send({msg:'please provide address and transaction'})

        let data=await transactionModel.create(req.body)
        return res.status(201).send({msg:"successfully added",result:data})

    }catch(err){
        res.status(500).send({msg:err.message})
    }
}

//
const ethereum=async(req,res)=>{
    try {
        let options = {
            method: 'get',
            url: `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`
        }
        let result = await axios(options);
        let data = result.data

       let value=data.ethereum.inr;

       let update={};

       update['ethereum.inr']=value;

       await currencyModel.findOneAndUpdate({_id:"62d91e720bba53c65fbe1b8d"},update)

        res.status(200).send({ msg: data, status: true })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

//

const registerCurrency=async(req,res)=>{
    try{
          let data=req.body
          let ans=await currencyModel.create(data)
          return res.status(201).send(ans)
    }catch(err){
        res.status(500).send({msg:err.message})
    }
}

//

const getterrr=async(req,res)=>{
    try {
        let result = await currencyModel.find();
        res.status(200).send({ data:result})
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

//

const getUserDetails=async(req,res)=>{
    try{
    let address=req.params.address
    let found=await transactionModel.findOne({address})
    let balance=found.transaction
    let ethereumPrice=await currencyModel.find()
    let price=ethereumPrice[0].ethereum.inr
    let result={
        userBalance:balance,
        ethreumPrice:price
    }
    return res.status(200).send({msg:"user details fetched",data:result})
    }catch(err){
        res.status(500).send({msg:err.message})
    }
}


//


const dealing=async(req,res)=>{
    try{
        let address1=req.params.address1;
        let address2=req.params.address2;
        let choice=req.query.choice;

      //  if(choice==="from"){
             let findFromprice=await transactionModel.findOne({address2})
             let fromPrice=findFromprice.transaction;  //money froim add2
            
             let toAddress=await transactionModel.findOne({address1})
            
             let update={},update2={}

             update2["transaction"]=+fromPrice + (+toAddress.transaction);

             update["transaction"]=0;

            

             await transactionModel.findOneAndUpdate({address1},update2)
             await transactionModel.findOneAndUpdate({address2},update)


             let dataa=await transactionModel.findOne({address1})

             return res.send({data:dataa})
       // }

    }catch(err){
        return res.status(500).send({msg:err.msg})
    }
}

module.exports={transcation,registerAddress,ethereum,registerCurrency,getterrr,getUserDetails,dealing};

