'use client'

import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

import { useChat } from 'ai/react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "0",
        role: "assistant",
        content: "Olá! Eu sou uma assistente de IA amigável. \n Pergunte-me qualquer coisa!"
      }
    ]
  })

  return (
    <Card className='w-[440px]'>
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>Fique à vontade para tirar suas dúvidas.</CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>
        <ScrollArea className='h-[600px] w-full pr-4'>
          {messages.map(message => {
            return (
              <div key={message.id} className='flex gap-3 text-slate-600 text-sm mb-4'>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>PC</AvatarFallback>
                    <AvatarImage src='https://github.com/plscabral.png' />
                  </Avatar>
                )}

                {message.role === 'assistant' && (
                  <Avatar>
                    <AvatarFallback>BOT</AvatarFallback>
                    <AvatarImage src='https://img.freepik.com/vetores-premium/robo-bonito-icon-ilustracao-conceito-de-icone-de-robo-de-tecnologia-isolado-estilo-cartoon-plana_138676-1220.jpg' />
                  </Avatar>
                )}

                <p className='leading-relaxed'>
                  <span className='block font-bold text-slate-700'>
                    {message.role === 'user' ? 'Usuário' : 'BOT'}
                  </span>
                  {message.content}
                </p>
              </div>
            )
          })}
        </ScrollArea>
      </CardContent>

      <CardFooter>
        <form className='w-full flex gap-2' onSubmit={handleSubmit}>
          <Input
            placeholder='Como posso ajudá-lo?'
            value={input}
            onChange={handleInputChange}
          />

          <Button
            className='bg-black text-white'
            type='submit'
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}