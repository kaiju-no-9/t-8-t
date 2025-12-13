
import { Button } from "../components/ui/button"
import {Input} from "@/components/ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel, 
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select.tsx"
  
import {
    Sheet,
    //SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    //SheetTrigger,
} from "@/components/ui/sheet"

import { useState } from "react";
import type {NodeMetaData} from "@/components/CreateWorkFlow.tsx";
import type {PriceNodeMetaData} from "@/nodes/trigger/PriceTrigger.tsx";
import type {TimeNodeMetaData} from "@/nodes/trigger/timer.tsx";

const Supportted_Trigger= [{
    id:"price-trigger",
    title:"Price Trigger",
    description:"use to trigger time dependent quantity"
},
{
    id:"timer",
    title:"Time Trigger",
    description:"use to run the trigger x no of times "
},]

export const ImportAssets =["SOL","ETH", 'BIT']


 export const TrrigerSheet = function ({onSelect}: { onSelect: (metaData: NodeMetaData) => void }) {
    const [metadata, setmetadata]= useState<PriceNodeMetaData | TimeNodeMetaData>({
        time:3600
    });
    const [selectetTriger , setselectetTriger] = useState(Supportted_Trigger[0].id);
    return (
        <Sheet open={true}>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Select Trigger Type </SheetTitle>
                    <SheetDescription>
                        Select the type you what to use
                        <Select value={selectetTriger} onValueChange={(value)=>setselectetTriger(value)}>
                         <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a trigger" />
                        </SelectTrigger>
                        <SelectContent>
                         <SelectGroup>
                          {  Supportted_Trigger.map(({id , title })=>(
                          <>
                          <SelectLabel ></SelectLabel>
                          <SelectItem  key={id} value={id}  onSelect={()=>setselectetTriger(id)}>{title}  </SelectItem>

                         </> ))}
                         </SelectGroup>
                        </SelectContent>
                        </Select>
                        {selectetTriger==="timer" && <div>
                            <Input value={metadata.time} onChange={(e)=>setmetadata(metadata =>({
                                ...metadata,
                                time:Number(e.target.value),
                            }))}></Input>
                            </div>}


                        {selectetTriger==="price-trigger" && <div>
                            Price:
                            <Input type="number" onChange={(e)=>setmetadata(m =>({
                                ...m,
                                price:Number(e.target.value),
                             }))}></Input>

                            Asset
                            <Select value={metadata.asset} onValueChange={(value)=>setmetadata(metadata=>({
                                ...metadata,asset:value
                            }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a asset" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {  ImportAssets.map((id)=>(
                                            <>
                                                <SelectLabel ></SelectLabel>
                                                <SelectItem  key ={id} value={id}  onSelect={()=>setselectetTriger(id)}>{id}  </SelectItem>

                                            </> ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </div>}


                    </SheetDescription>
                </SheetHeader>

                <SheetFooter>
                    <Button onClick={()=>{
                        onSelect({
                            type:selectetTriger,
                            metadata,
                        })
                    }} type="submit">Create</Button>

                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

