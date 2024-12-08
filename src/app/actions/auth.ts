'use server'

import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import User from '@/interfaces/User'

const USERS_FILE = path.join(process.cwd(), 'users.json')

export async function registerUser(nome: string, sobrenome: string, email: string, password: string) {
    try {
      let users: User[] = []
      
      try {
        const data = await fs.readFile(USERS_FILE, 'utf-8')
        users = JSON.parse(data)
      } catch (error) {
        console.log(error)
      }
  
      if (users.some(user => user.email === email)) {
        return { error: 'Já existe um usuário cadastrado com esse email.' }
      }
  
      const newUser: User = {
        id: uuidv4(),
        nome,
        sobrenome,
        email,
        password,
      }
  
      users.push(newUser)
  
      await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
  
      return { result: { id: newUser.id, email: newUser.email } }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error)
      return { error: 'Falha ao registrar usuário,' }
    }
  }