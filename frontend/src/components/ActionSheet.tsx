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
//import type {PriceNodeMetaData} from "@/nodes/trigger/PriceTrigger.tsx";
//import type {TimeNodeMetaData} from "@/nodes/trigger/timer.tsx";
import type { TradingMetadata } from "@/nodes/actions/Lighter.tsx";
import { ImportAssets } from "./TrrigerSheet.tsx";

const Supportted_Action= [{
    id:"hyperLiquid",
    title:"hyperLiquid",
    description:"place a trade on hyperliquid"
},
{
    id:"backpack",
    title:"backpack",
    description:"place a trade on backpack"
},
{
    id:"Lighter",
    title:"Lighter",
    description:"place a trade on Lighter"
}]

   export const ActionSheet = function ({onSelect}: { onSelect: (metaData: NodeMetaData) => void }) {
 
    const [metadata, setmetadata]= useState<TradingMetadata|{}>(
        {}
    );
    const [selectetAction, setselectetAction] = useState(Supportted_Action[0].id);
    return (
        <Sheet open={true}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Select Action Type </SheetTitle>
                    <SheetDescription>
                        Select the type  Actionyou what to use
                        <Select value={selectetAction} onValueChange={(value)=>setselectetAction(value)}>
                         <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a trigger" />
                        </SelectTrigger>
                        <SelectContent>
                         <SelectGroup>
                          {  Supportted_Action.map(({id , title })=>(
                          <>
                          <SelectLabel ></SelectLabel>
                          <SelectItem  key={id} value={id}  onSelect={()=>setselectetAction(id)}>{title}  </SelectItem>

                         </> ))}
                         </SelectGroup>
                        </SelectContent>
                        </Select>
                        {(
                         selectetAction === "hyperLiquid" ||
                        selectetAction === "backpack" ||
                        selectetAction === "Lighter"
                        ) && (
                         <div>

                         <div className="p-4">type</div>
                         <Select
                          value={metadata?.type}
                          onValueChange={(value) =>
                           setmetadata((m) => ({
                           ...m,
                          type: value,     // <-- YOU WROTE asset BY MISTAKE
                            }))
                             }
                             >
                        <SelectTrigger className="w-full">
                         <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                           <SelectContent>
                        <SelectGroup>
                        <SelectItem value="Long">Long</SelectItem>
                       <SelectItem value="Short">Short</SelectItem>
                      </SelectGroup>
                      </SelectContent>
                      </Select>

                     <div className="p-4">Symbol</div>
                      <Select
                      value={metadata?.symbol}
                       onValueChange={(value) =>
                       setmetadata((m) => ({
                       ...m,
                       symbol: value,
                        }))
                       }
                      >
                <SelectTrigger className="w-full">
                <SelectValue placeholder="Select asset" />
               </SelectTrigger>
                <SelectContent>
               <SelectGroup>
               {ImportAssets.map((asset) => (
             <SelectItem key={asset} value={asset}>
               {asset}
              </SelectItem>
             ))}
          </SelectGroup>
         </SelectContent>
        </Select>

      <div className="p-4">qty</div>
      <Input
        value={metadata.qty}
        onChange={(e) =>
         setmetadata((m) => ({
           ...m,
           qty: Number(e.target.value),
            }))
         }
            />
       </div>
        )}
                    </SheetDescription>
                </SheetHeader>

                <SheetFooter>
                    <Button onClick={()=>{
                        onSelect({
                            type:selectetAction,
                            metadata,
                        })
                    }} type="submit">Create</Button>

                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

