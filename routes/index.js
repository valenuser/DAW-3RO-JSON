const express = require('express')

const router = express.Router()

const db =  require('../db.json')

const fs = require('fs')

router.get('/',async(req,res)=>{

    res.status(200).json(db)

})

router.get('/:name',async(req,res)=>{
    try{
        const { name } = req.params 

        const user = db.find(el => el.nombre == name)

        if( user != undefined){
            res.status(200).json(user)
        }else{
            res.status(404).json({msg:'usuario no encontrado'})
        }
    
    }catch(e){
        res.status(404).json({msg:'usuario no encontrado'})
    }
})

router.post('/create',async(req,res)=>{

    try{
        const { name, edad } = req.body

        const data = {'nombre':name,'edad':edad}

        db.push(data)

        fs.writeFileSync('db.json',JSON.stringify(db))
    
        res.status(200).json({msg:'Usuario creado con exito'})
    }catch(e){
        res.status(404).json({msg:e})
    }
})


router.put('/update',async(req,res)=>{

    try{
        const { name, edad } = req.body

        const user = db.find(el => el.nombre == name)

        db[db.indexOf(user)] = {
            'nombre':name,
            'edad':edad
        }

        fs.writeFileSync('db.json',JSON.stringify(db))

        res.status(200).json({msg:'Usuario actualizado con exito'})
    }catch(e){
        res.status(404).json({msg:e})
    }
})


router.delete('/delete',async(req,res)=>{
    try{
        const { name } = req.body

        const newDb = db.filter(el => el.nombre != name)

        fs.writeFileSync('db.json',JSON.stringify(newDb))


        res.status(200).json({msg:'Usuario eliminado con exito'})
    }catch(e){
        res.status(404).json({msg:e})
    }
})


router.use((req,res)=>{
    res.status(404).json({'msg':'Esta ruta no esta permitida'})
})

module.exports = router