const express=require('express')
const router=express.Router()
const transcationController=require("../controllers/transactionController")

router.get('/transaction/:address',transcationController.transcation);
router.post('/register_address',transcationController.registerAddress);

router.get("/ethereum",transcationController.ethereum)
router.post("/add",transcationController.registerCurrency)
router.get("/getter",transcationController.getterrr)

router.get("/userDetails/:address",transcationController.getUserDetails)
router.get("/deals/:address1/:address2",transcationController.dealing)
   

module.exports=router;