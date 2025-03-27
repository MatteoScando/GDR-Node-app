import Router from "@koa/router";
import prisma from "../../prisma/client.js";
import { Character } from "@prisma/client";
import { checkCharacterExist } from "../middlewares/character.js";
import { characterSchema } from "../../prisma/validation/validationCharacter.js";
import { ZodError } from "zod";

const router = new Router({
  prefix: "/character",
});

// return all characters
router.get("/", async (ctx) => {
  const characters = await prisma.character.findMany();

  ctx.status = 201;
  ctx.body = characters;
});

// create a new character
router.post("/", async (ctx) => {
  try {
    ctx.request.body = characterSchema.parse(ctx.request.body)
  } catch (err) {
    ctx.status=400;
    if(err instanceof ZodError){
      ctx.body ="Message: "+ err;
    }else{
      ctx.body ="Validation error: "+ err;
    }
    return;
  }
  
  const data = ctx.request.body as Character;

  try{
    
    const character = await prisma.character.create({
      data: {
        name: data.name,
        history: data.history,
        age: data.age,
        health: data.health,
        stamina: data.stamina,
        mana: data.mana,
      },
    });
  
    ctx.status = 201;
    ctx.body = "Character created: " + character.id;

  }catch(err){
    ctx.status=500;
    ctx.body ="Error: "+ err;
  }
});

// get single character from id
router.get("/:id", async(ctx)=>{
  const id = ctx.params.id;
  try {
    const character = await prisma.character.findUnique({
      where:{
        id: id,
      }
    });

    if(!character){
      ctx.status = 404;
      ctx.body = "Character not found";
      return;
    }

    ctx.status = 201;
    ctx.body = character as Character;
    
  } catch (err) {
    ctx.status=500;
    ctx.body ="Error: "+ err;
  }
});

// modify single character from id
router.patch("/:id", checkCharacterExist, async (ctx)=>{
  const id = ctx.params.id;
  const data = ctx.request.body as Character;
  
  try {
    const character = await prisma.character.update({
      where:{
        id: id,
      },
      data:{
        name: data.name,
        history: data.history,
        age: data.age,
        health: data.health,
        stamina: data.stamina,
        mana: data.mana,
      }
    });

    if(!character){
      ctx.status = 404;
      ctx.body = "Character not found";
    }

    ctx.status = 201;
    ctx.body = character as Character;
    
  } catch (err) {
    ctx.status= 500;
    ctx.body ="Error: "+ err;
  }
});

// delete a single character by id
router.delete("/:id", checkCharacterExist, async (ctx)=>{
  const id = ctx.params.id;
  
  try {
    const isDeleted = await prisma.character.delete({
      where:{
        id: id,
      },
    })

    console.log(isDeleted);

    ctx.status = 201;
    ctx.body = "Character "+id+" succesfully deleted";
    
  } catch (err) {
    ctx.status= 500;
    ctx.body ="Error: "+ err;
  }
});

export default router;
