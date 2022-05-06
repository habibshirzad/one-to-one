import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { CreateSkillsDto } from 'src/dto/createSkills.dto';
import { Skills } from 'src/entities/skills.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User) 
      private readonly userRepository: Repository <User>, 
      @InjectRepository(Skills)  
      private readonly skillRepository: Repository <Skills>
    ){}

  // add user
  createUser(user:CreateUserDto){
    const newUser =  this.userRepository.create(user)
    this.userRepository.save(newUser)
    return newUser   
  }

  // add skills
  async createSkill(skill:CreateSkillsDto){
    
    const user = await this.userRepository.find( { where: {id:2}, relations:["skill"]});
    const newSkill =  await this.skillRepository.create(skill)
    console.log('add skill', skill);
    const isNewSkill = await this.skillRepository.save(skill)
    console.log(isNewSkill)
    return isNewSkill  
}

  getAllSkills() {
    return this.userRepository.find({ relations: ['skill']});
  }

  // getAllUser(){
  //   return this.skillRepository.find()
  // }

}
