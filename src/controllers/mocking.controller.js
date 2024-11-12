import { petsService, usersService } from "../services/index.js";
import { generatePets, generateUsers } from "../utils/index.js";

const getUserMocking = (req, res)=>{
    const {quantity} = req.query
    console.log(quantity);
    if(!quantity || !Number(quantity)) return res.status(400).send({status:"error", error:"No se envió una cantidad"})
    const users = generateUsers(quantity);

    res.send({message: "done", payload: users})
}

const generateData = async (req, res)=>{
    const {usersQuantity, petsQuantity} = req.body;
    if(!usersQuantity || !Number(usersQuantity) || !petsQuantity || !Number(petsQuantity)) return res.status(400).send({status:"error", error:"No se envió una cantidad"})

    const users = generateUsers(usersQuantity);
    const pets = generatePets(petsQuantity);
    try{
        for(const user of users){
            console.log(user);
            await usersService.create(user);
        }
    }catch(e){
        return res.status(400).send({status:"error", error:"Error al crear usuario"})
    }
    
    try{
        for(const pet of pets){
            console.log(pet);
            await petsService.create(pet);
        }
    }catch(e){
        console.error(e);
        return res.status(400).send({status:"error", error:"Error al crear mascota"})
    }


    res.send({message: "done", payload: {"Usuarios": users, "Mascotas": pets}})
}

export default {
    getUserMocking,
    generateData
}