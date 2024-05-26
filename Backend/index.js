/*dependicies*/
const port =4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mailgun = require('mailgun-js')({
    apiKey: 'YOUR_MAILGUN_API_KEY',
    domain: 'YOUR_MAILGUN_DOMAIN'
});

/*initialized*/
app.use(express.json());
app.use(cors());

/*database connection */
mongoose.connect("mongodb+srv://wafachabbi21:WAFAchabbi21@cluster0.kryslfc.mongodb.net/e-commerce");

/*API creation */

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

/*Image storage engine */
const storage = multer.diskStorage({  
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage}) /* multer utilisé pour téléverser des fichiers */

/*Creating Upload Endpoint for images */
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{ /*traite un seul fichier et Il extrait le fichier téléversé et le sauvegarde selon la configuration storage */
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

/*Shema for creating products */
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_aray = products.slice(-1);
        let last_product = last_product_aray[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

/* Creating API delating products */
app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

/* Creating API for getting all products */
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

/* Shema Creating for user model */
const Users = mongoose.model('Users',{
    name:{ type : String, },
    email:{ type : String, 
            unique:true, },
    password:{ type : String, },
    cartData:{ type : Object,},
    date:{ type : Date,
           default:Date.naw,}

})
/* Creating API for getting all users */

app.get('/allusers',async (req,res)=>{
    let users = await Users.find({});
    console.log("All Users Fetched");
    res.send(users);
})
/* Creating endpoint for regitering user */
app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:"esisting user found with same email address"})
    }
    let cart = {};
    for (let i=0; i < 300; i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})

/* Creating endpoint for user login */
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user : { id:user.id }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else {
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else {
        res.json({success:false,errors:"Wrong Email Id"});
    }
})
app.post('/forgotpassword',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,
            {
                expiresIn: '3h',
            });
            user.resetToken = token;
            await user.save();

            //resetLink
            console.log(`${baseUrl()}/resetpassword/${token}`);
            mailgun().messages().send({
                from: 'Amazona <me@mg.yourdomain.com>',
                to: `${user.name} <${user.email}`,
                subject : `Reset password`,
                html: `
                <p>Please Click the following link to reset your password : </p>
                <a href="${baseUrl()}/resetpassword/${token}"}>Reset Password </a>
                `,
            },
            (error , body) => {
                console.log(error);
                console.log(body);
            }
            );
            res.send({message: 'We sent reset password link to your email.' });
        }
           else {
            res.status(404).send({message : 'User not found'});
           }
}) ;

app.post('/resetpassword', async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.body.token, process.env.JWT_SECRET);
        const user = await Users.findOne({ resetToken: req.body.token });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


const Admins = mongoose.model('Admins',{
    name:{ type : String, },
    email:{ type : String, 
            unique:true, },
    password:{ type : String, },
    cartData:{ type : Object,},
    date:{ type : Date,
           default:Date.naw,}

})
app.get('/alladmins',async (req,res)=>{
    let admins = await Admins.find({});
    console.log("All Admins Fetched");
    res.send(admins);
})
app.post('/signupadmin',async (req,res)=>{
    let check = await Admins.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:"esisting admin found with same email address"})
    }
    let cart = {};
    for (let i=0; i < 300; i++){
        cart[i]=0;
    }
    const admin = new Admins({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await admin.save();
    const data = {
        admin:{
            id:admin.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})
app.post('/loginadmin',async (req,res)=>{
    let admin = await Admins.findOne({email:req.body.email});
    if (admin) {
        const passCompare = req.body.password === admin.password;
        if (passCompare) {
            const data = {
                admin : { id:admin.id }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else {
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else {
        res.json({success:false,errors:"Wrong Email Id"});
    }
})

/* Creating endpoint for newcollection data */
app.get('/newcollection' ,async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

/*Creating endpoint for popular in women section */

app.get('/popularwomen' ,async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

/*Creating middelware to fetch user */
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:"Please authentificate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch (error){
            res.status(401).send({errors:"please authentificate using a valid token"})
        }
    }
} 


/*Creating endpoint for adding products in cartdata */
  app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")

})  

/* Creating endpoint to remove product from cartdata */
app.post('/removeFromcart',fetchUser,async (req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")

})  

/* Creating endpoint to get cartdata */
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})
/*Shema for creating contact */
const Contact = mongoose.model("Contact",{
    id:{
        type:Number,
        required:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
})
app.post('/addcontact',async (req,res)=>{
    let contacts = await Contact.find({});
    let id;
    if(contacts.length>0){
        let last_contact_aray = contacts.slice(-1);
        let last_contact = last_contact_aray[0];
        id = last_contact.id+1;
    }
    else{
        id=1;
    }
    const contact = new Contact({
        id:id,
        fullname:req.body.fullname,
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message,
    })
    console.log(contact);
    await contact.save();
    console.log("Saved");
    res.json({
        success:true,
        fullname:req.body.fullname,
    })
})
app.get('/allcontacts',async (req,res)=>{
    let contacts = await Contact.find({});
    console.log("All Contactss Fetched");
    res.send(contacts);
})
 /*Shema for creating order */
 const Order = mongoose.model("Order",{
    id:{
        type:Number,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    },
})
app.post('/addorder',async (req,res)=>{
    let orders = await Order.find({});
    let id;
    if(orders.length>0){
        let last_order_aray = orders.slice(-1);
        let last_order = last_order_aray[0];
        id = last_order.id+1;
    }
    else{
        id=1;
    }
    const order = new Order({
        id:id,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        country:req.body.country,
        city:req.body.city,
        phone:req.body.phone,
        total:req.body.total,
    })
    console.log(order);
    await order.save();
    console.log("Saved");
    res.json({
        success:true,
        firstname:req.body.firstname,
    })
})
app.get('/allorders',async (req,res)=>{
    let orders = await Order.find({});
    console.log("All Orders Fetched");
    res.send(orders);
})

const Promo = mongoose.model("Promo",{
    id:{
        type:Number,
        required:true,
    },
    promocode:{
        type:String,
        required:true,
    },
})


app.listen(port,(error)=>{
    if (!error) {
        console.log("Server Running on Port" +port)
    }
    else {
        console.log("Error : "+error)
    }
})








