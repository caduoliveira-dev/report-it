

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/ui/input-file";


export default function PerfilEditar() {

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
      <h2 className="text-2xl font-bold mb-6 flex">Configurações de Perfil</h2>
      
      {/* Avatar */}
      <div className="flex items-center mb-4">
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="ml-4">
          <Button variant="outline">Alterar Avatar</Button>
        </div>
      </div>

      {/* Formulário de Edição */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="name">Nome:</label>
            <Input 
            id="name" 
            name="name" 
            value='' 
            // onChange={handleInputChange} 
            className="w-full p-2 border rounded-md" 
            placeholder="Digite seu nome" 
            />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="email">Email:</label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value="" 
        //   onChange={handleInputChange} 
          className="w-full p-2 border rounded-md" 
          placeholder="Digite seu email" 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="password">Senha:</label>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          value="" 
        //   onChange={handleInputChange} 
          className="w-full p-2 border rounded-md" 
          placeholder="Digite sua nova senha" 
        />
      </div>
      <InputFile/>


      <div className="flex justify-end space-x-4">
        <Button variant="destructive">Cancelar</Button>
        <Button variant="outline" >Salvar Alterações</Button>
      </div>
    </div>
  );
};


