'use client'

import Input from '@/components/Input'
import Message from '@/types'
import { FormEventHandler, useEffect, useRef, useState } from 'react'

export default function Page(){

    const [chat, setChat] = useState<Message[]>([])
    const [typing, setTyping] = useState(false)
    const bottom = useRef<HTMLDivElement>(null)

    const reply = () => {
        
        setChat((prevChat) => {
            if(prevChat[prevChat.length - 1].content === 'hi'){
                return [...prevChat, {author: 'BusinessOS', content: "hello", time: new Date()}]
            }
            if(prevChat[prevChat.length - 1].content === "what's your name?"){
                return [...prevChat, {author: 'BusinessOS', content: "I'm BusinessOS, a bot designed to help you with your business needs!", time: new Date()}]
            }
            if(prevChat[prevChat.length - 1].content === 'i miss you'){
                return [...prevChat, {author: 'BusinessOS', content: "trust me i miss you too. pero no matter how much i want to run back to your arms, the damage has been done. di naman ako galit, i know you didn't mean it, and i still think that you're a good person naman, however i don't think i can ever have the strength to forgive you. 'yun lang i wish you the best, ingat lagi :))", time: new Date()}]
            }
            return [...prevChat, {author: 'BusinessOS', content:"As of now, I don't have AI integration yet, this is all frontend so i dont really know what you're saying or what to reply. sorry :((", time: new Date()}]})

        
        
    }

    const handleSubmit : FormEventHandler = async (e) => {
        e.preventDefault()
        const content = (((e.target as HTMLFormElement)[0] as HTMLInputElement).value);
        (((e.target as HTMLFormElement)[0] as HTMLInputElement).value) = ''

        if(content != ""){
            setChat((prevChat) => {return [...prevChat, {author: 'You', content: content, time: new Date()}]})
            await new Promise(resolve => setTimeout(resolve, 100));
            setTyping(true)
            await new Promise(resolve => setTimeout(resolve, 1000));
            setTyping(false)
            await new Promise(resolve => setTimeout(resolve, 100));
            reply()
            
            
        }
        if(bottom.current){
            bottom.current.scrollIntoView({behavior : 'smooth', block: 'end'})
        }

    }

    useEffect(() => {
        if(bottom.current){
            bottom.current.scrollIntoView({behavior : 'instant', block : 'end'})
        }
    },[chat, typing])

    return (
        <div className=" flex flex-col w-full items-center min-h-screen max-h-fit -mt-16 pt-16 bg-orange-50">

        <div className="w-full p-5">
        {chat.length == 0 ? (<h1 className="font-bold text-center">You are now chatting with BusinessOS...</h1>) : (
            chat.map((msg) => {return (<div key={msg.time.toTimeString()}> <span className={(msg.author == 'You' ? "text-blue-900" : "text-red-900") +  " font-bold"}>{msg.author} : </span> {msg.content}</div>)})
        )}
        {typing && <div className="font-bold">BusinessOS is thinking...</div>}
        </div>

        

        <form className="flex flex-col items-center w-full self-end mt-auto" onSubmit={(e) => handleSubmit(e)}>
                <Input/>
        </form>

        <div ref={bottom} className="h-8"/>
        
    </div>
    )
}