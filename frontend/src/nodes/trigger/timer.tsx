import {Handle, Position} from "@xyflow/react";

export interface TimeNodeMetaData{
    time: number;
}
export function Timer({data , isConnectable}: {
    data:{
        metadata: TimeNodeMetaData,
    }
    isConnectable:boolean;
}) {
    return (<div>
        Every {data.metadata.time /3600} seconds
        <Handle  type={"source"} position={Position.Right}></Handle>
    </div>)
}
