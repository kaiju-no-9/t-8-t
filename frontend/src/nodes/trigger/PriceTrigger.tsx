

import {Handle, Position} from "@xyflow/react";
//import type { NodeProps } from "@xyflow/react";

//asset =>Sol
//price 124344
//decimal 6
export interface PriceNodeMetaData{
    asset:string,
    price:number,
}
export function PriceTrigger({data ,isConnectable }: {
    data:{
        metadata: PriceNodeMetaData,
    }
    isConnectable : boolean;
}) {


    return (<div className=" p-4 border">
        price-trigger
        {data.metadata.price}
        {data.metadata.asset}
        <Handle  type={"source"} position={Position.Right}></Handle>
    </div>)
}
